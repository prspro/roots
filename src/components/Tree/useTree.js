import { useState, useRef, useEffect } from "react";
import { root } from "../../data/rootData";
import dagre from "dagre";

const useTree = () => {
  const [nodeList, setNodeList] = useState(root);

  const nodeDimensions = {
    width: 120,
    height: 40,
    radius: 5,
    scale: {
      x: 1.1,
      y: 1.3,
    },
  };

  const midpoint = ([x1, y1], [x2, y2]) => {
    return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
  };

  const getEdgesData = (personList) => {
    // copy person list;
    const personListCopy = personList.map((entry) => {
      return { ...entry };
    });

    const linksList = [];

    personListCopy.forEach((person) => {
      //if person has parents, add parent-child edge
      if (person.parents) {
        person.parents.forEach((parentID) => {
          linksList.push({
            source: parentID,
            target: person.id,
            // type: "vertical",
          });
        });
      }
    });

    return linksList;
  };

  const getLinksData = (personDataList) => {
    // copy person list;
    const personDataListCopy = personDataList.map((entry) => {
      return { ...entry };
    });

    const linkList = [];

    personDataListCopy.forEach((person) => {
      if (person.parents.length > 0) {
        if (person.parents.length > 1) {
          //two parents case
          person.parents.forEach((parentID) => {
            const parent = personDataListCopy.find(
              (entry) => entry.id === parentID
            );
            const parentPartner = personDataListCopy.find((entry) => {
              return (
                entry.id ===
                person.parents.find((partnerID) => partnerID !== parentID)
              );
            });
            linkList.push({
              source: { id: parent.id, x: parent.x, y: parent.y },
              midpoint: midpoint(
                [parent.x, parent.y],
                [parentPartner.x, parentPartner.y]
              ),
              target: { id: person.id, x: person.x, y: person.y },
            });
          });
        } else {
          //one parent case
          const parent = personDataListCopy.find(
            (entry) => entry.id === person.parents[0]
          );
          linkList.push({
            source: { id: parent.id, x: parent.x, y: parent.y },
            midpoint: { id: parent.id, x: parent.x, y: parent.y },
            target: { id: person.id, x: person.x, y: person.y },
          });
        }
      }
    });

    return linkList;
  };

  const getGraphData = (personList) => {
    const edgeList = getEdgesData(personList);

    // Create a new directed graph
    const graph = new dagre.graphlib.Graph();

    // Set an object for the graph label
    graph.setGraph({});

    // Default to assigning a new object as a label for each new edge.
    graph.setDefaultEdgeLabel(function () {
      return {};
    });

    //add nodes to the graph
    personList.forEach((entry) => {
      graph.setNode(entry.id, {
        label: entry.name,
        parents: entry.parents,
        width: nodeDimensions.width * nodeDimensions.scale.x,
        height: nodeDimensions.height * nodeDimensions.scale.y,
      });
    });

    //add edges to the graph
    edgeList.forEach((entry) => {
      graph.setEdge(entry.source, entry.target);
    });

    //layout calculation
    dagre.layout(graph);

    return {
      nodeDataList: graph.nodes().map((nodeID) => {
        return {
          id: nodeID,
          ...graph.node(nodeID),
        };
      }),
      graphDimensions: {
        width: graph.graph().width,
        height: graph.graph().height,
      },
    };
  };

  const stepLine = (link) => {
    return `M${link.source.x},${link.source.y}H${link.midpoint.x}V${
      link.source.y + (link.target.y - link.source.y) / 2
    }H${link.target.x}V${link.target.y}`;
  };

  const { nodeDataList, graphDimensions } = getGraphData(nodeList);

  const linkList = getLinksData(nodeDataList);

  return { nodeDataList, graphDimensions, nodeDimensions, linkList, stepLine };
};

export default useTree;
