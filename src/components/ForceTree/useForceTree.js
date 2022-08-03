import { useState, useRef, useEffect } from "react";
import { forceRoot, forceRootParent } from "../../data/rootData";
import {
  select,
  scalePoint,
  forceLink,
  forceY,
  forceCenter,
  forceManyBody,
  forceSimulation,
  forceCollide,
  zoom,
} from "d3";

const useForceTree = () => {
  // const [personList, setPersonList] = useState(forceRootParent);

  const nodeDimensions = {
    width: 40,
    height: 20,
    radius: 5,
  };

  const svgDimensions = {
    width: 2500,
    height: 500,
  };

  const midpoint = ([x1, y1], [x2, y2]) => {
    return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
  };

  const setPersonLinkList = (personListCopy) => {
    //copy person list;
    // const personListCopy = personList.map((entry) => {
    //   return { ...entry };
    // });

    const linksList = [];

    personListCopy.forEach((person) => {
      //if person has parents
      if (person.parents) {
        person.parents.forEach((parentID) => {
          //if person has parent, add parent-child links
          linksList.push({
            source: personListCopy.find((entry) => entry.id === parentID),
            target: person,
            type: "vertical",
          });
          //person's sibling list (need to remove dublications)
          const siblingList = personListCopy.filter((entry) => {
            return entry.parents.includes(parentID) && entry.id !== person.id;
          });
          // siblingList.forEach((entry) => {
          //   linksList.push({
          //     source: person,
          //     target: entry,
          //     type: "siblings",
          //   });
          // });
        });
        //if person has more than one parent, add parent-parent link
        if (person.parents.length > 1) {
          const firstParent = personListCopy.find(
            (entry) => entry.id === person.parents[0]
          );
          const secondParent = personListCopy.find(
            (entry) => entry.id === person.parents[1]
          );
          linksList.push({
            source: firstParent,
            target: secondParent,
            midpoint: midpoint(
              [firstParent.x, firstParent.y],
              [secondParent.x, secondParent.y]
            ),
            type: "horizontal",
          });
        }
      }
    });

    return linksList;
  };

  const setPersonListGenerations = (dataArray) => {
    //copy data
    let personDataList = dataArray.map((entry) => {
      return { ...entry, generation: 0 };
    });

    const setGenerationRec = (personData, generation) => {
      //process person if not processed
      if (!personData.isProcessed) {
        //mark current person as processed
        personDataList = personDataList.map((person) => {
          if (person.id === personData.id) {
            return { ...person, isProcessed: true };
          } else {
            return person;
          }
        });

        //get person's children list
        const personChildrenList = personDataList.filter((child) => {
          return child.parents.find((personID) => personID === personData.id);
        });

        //if children list is not empty
        if (personChildrenList.length > 0) {
          //increment generation flag for each child
          personChildrenList.forEach((child) => {
            personDataList = personDataList.map((person) => {
              if (person.id === child.id) {
                return { ...person, generation: generation + 1 };
              } else {
                return person;
              }
            });
            //go to recursion
            setGenerationRec(child, generation + 1);
          });
        }

        //get person's parents list
        const personParents = personDataList.filter((person) => {
          return (
            person.id === personData.parents[0] ||
            person.id === personData.parents[1]
          );
        });

        //if parents list is not empty
        if (personParents.length > 0) {
          personParents.forEach((parent) => {
            //decrement generation flag for each parent
            personDataList = personDataList.map((person) => {
              if (person.id === parent.id) {
                return { ...person, generation: generation - 1 };
              } else {
                return person;
              }
            });
            //go to recursion
            setGenerationRec(parent, generation - 1);
          });
        }
      }
    };

    //start recursion
    setGenerationRec(personDataList[0], 0);

    // oldest representated generetion
    const oldestGeneration = Math.min(
      ...personDataList.map((person) => person.generation)
    );

    // set generation count from zero
    return personDataList.map((person) => {
      return {
        ...person,
        generation: person.generation + Math.abs(oldestGeneration),
      };
    });
  };

  const setGenerationsList = (personList) => {
    const youngestGeneration = Math.max(
      ...personList.map((person) => person.generation)
    );
    const generationList = [];
    for (let i = 0; i < youngestGeneration + 1; i++) {
      generationList.push(i);
    }
    return generationList;
  };

  const setPairsMidpointsList = (linkList) => {
    //copy links list;
    const linkListCopy = linkList.map((entry) => {
      return { ...entry };
    });

    // filter parent-parent links only
    const linkListHorizontal = linkListCopy.filter(
      (link) => link.type === "horizontal"
    );

    return linkListHorizontal.map((link) =>
      midpoint([link.source.x, link.source.y], [link.target.x, link.target.y])
    );
  };

  const svgRef = useRef(null);

  //zoom and pan
  const svg = select(svgRef.current).call(
    zoom().on("zoom", (e) => {
      svg.selectAll("svg > g").attr("transform", e.transform);
    })
  );

  //person list with generetions
  const personDataList = setPersonListGenerations(forceRootParent);
  //links between persons
  const personLinksList = setPersonLinkList(personDataList);
  //array contains generations indexes from oldest (always zero) to youngest
  const generationsRange = setGenerationsList(personDataList);

  //for proper layering purposes
  const rowScale = scalePoint()
    .domain(generationsRange)
    .range([0, svgDimensions.height])
    .padding(0.5);

  //simulation happens here
  const simulation = forceSimulation(personDataList)
    .force(
      "link",
      forceLink()
      .links(personLinksList)
      // .distance(100).strength(1)
    )
    .force(
      "y",
      forceY(function (d) {
        return rowScale(d.generation);
      })
    )
    // .force("x", (d) => 0)
    .force(
      "charge",
      forceManyBody()
        // .strength(-600)
        // .distanceMin(nodeDimensions.width * 2)
        // .distanceMax(nodeDimensions.width * 100)
        // .distanceMin(120)
        // .distanceMax(240)
    )
    .force(
      "collide",
      forceCollide()
        // .radius(Math.max(nodeDimensions.width, nodeDimensions.height) * 2)
        .radius(nodeDimensions.width * 3)
        // .radius(150)
        .strength(1)
    )
    .force(
      "center",
      forceCenter(svgDimensions.width / 2, svgDimensions.height / 2)
    )
    .stop();

  //simulation
  simulation.tick(3e2);

  const aaa = personDataList.map((entry) => {
    return { ...entry, y: rowScale(entry.generation) };
  });

  const bbb = personLinksList.map((entry) => {
    if (entry.type === "vertical") {
      const personPairID = entry.target.parents.find(personID => personID !== entry.source.id);
      const personPair = personDataList.find(person => person.id === personPairID);
      return {
        ...entry,
        source: {
          ...entry.source,
          y: (entry.source.y = rowScale(entry.source.generation)),
        },
        target: {
          ...entry.target,
          y: (entry.target.y = rowScale(entry.target.generation)),
        },
        midpoint: midpoint(
          [entry.source.x, entry.source.y],
          [personPair.x, personPair.y]
        ),
      };
    } else {
      return {
        ...entry,
        source: {
          ...entry.source,
          y: (entry.source.y = rowScale(entry.source.generation)),
        },
        target: {
          ...entry.target,
          y: (entry.target.y = rowScale(entry.target.generation)),
        },
        midpoint: midpoint(
          [entry.source.x, entry.source.y],
          [entry.target.x, entry.target.y]
        ),
      };
    }
  });

  const pairsMidpoints = setPairsMidpointsList(personLinksList);

  const stepLine = (link) => {
    const stepMultiplier = 1.5;

    console.log((link.target.y - link.source.y) / 2);

    return `M${link.source.x},${link.source.y}H${link.midpoint.x}V${link.source.y + (link.target.y - link.source.y) / 2 }H${link.target.x}V${link.target.y}`;
    // return `M${link.source.x},${link.source.y}`;
  };

  console.log(bbb);

  // useEffect(() => {
  //   simulation.tick(3e2);
  //   return () => {
  //     simulation.stop();
  //   };
  // }, [personList]);

  return {
    personDataList,
    personLinksList,
    pairsMidpoints,
    nodeDimensions,
    svgDimensions,
    aaa,
    bbb,
    stepLine,
  };
};

export default useForceTree;
