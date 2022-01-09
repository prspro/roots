import { mainData } from "../../data/data";

export default function usePrepData() {
  const prepData = mainData.map((entry) => {
    return {
      id: entry.id,
      sex: entry.sex,
      nameLatin: entry.nameLatin,
      parents: entry.parents.native,
      isProcessed: false,
    };
  });

  const getDescendants = (dataArray, personID) => {
    //copy data
    const personDataList = dataArray.map((entry) => {
      return { ...entry };
    });

    //define person index in data
    const personIndex = personDataList.findIndex((person) => {
      return person.id === personID;
    });

    const person = {};

    const getDescendantsRec = (personData, currentPerson) => {
      //process person if not processed
      if (!personData.isProcessed) {
        //mark current person as processed
        personData.isProcessed = true;

        //add some person info
        currentPerson.id = personData.id;
        currentPerson.nameLatin = personData.nameLatin;
        currentPerson.isRootPerson = false;
        currentPerson.sex = personData.sex;

        //get person's children list
        const personChildren = personDataList.filter((child) => {
          return (
            child.parents.maman === currentPerson.id ||
            child.parents.papa === currentPerson.id
          );
        });

        //person spouse
        const spouseID = personChildren
          .reduce((accumulator, current) => {
            accumulator.push(current.parents.papa);
            accumulator.push(current.parents.maman);
            return accumulator;
          }, [])
          .filter((x, i, a) => a.indexOf(x) === i)
          .filter((entry) => {
            return entry !== currentPerson.id;
          })[0];

        const spouseData = personDataList.find((entry) => {
          return entry.id === spouseID;
        });

        if (spouseData !== undefined) {
          currentPerson.spouse = {
            id: spouseData.id,
            nameLatin: spouseData.nameLatin,
          };
        }

        //add person's children to person
        currentPerson.children = [];
        currentPerson.parents = [];

        if (personChildren.length > 0) {
          personChildren.forEach((child, idx) => {
            currentPerson.children[idx] = {
              id: child.id,
              nameLatin: child.nameLatin,
            };
            getDescendantsRec(child, currentPerson.children[idx]);
          });
        }
      }
    };

    getDescendantsRec(personDataList[personIndex], person);

    return person;
  };

  const getAscendants = (dataArray, personID) => {
    //copy data
    const personDataList = dataArray.map((entry) => {
      return { ...entry };
    });

    //define person index in data
    const personIndex = personDataList.findIndex((person) => {
      return person.id === personID;
    });

    const person = {};

    const getAscendantsRec = (personData, currentPerson) => {
      //process person if not processed
      if (!personData.isProcessed) {
        //mark current person as processed
        personData.isProcessed = true;

        //add some person info
        currentPerson.id = personData.id;
        currentPerson.nameLatin = personData.nameLatin;
        currentPerson.isRootPerson = false;
        currentPerson.sex = personData.sex;

        //add person's parents list
        currentPerson.parents = [];

        const personParents = personDataList.filter((person) => {
          return (
            person.id === personData.parents.maman ||
            person.id === personData.parents.papa
          );
        });

        currentPerson.parents = personParents;
        currentPerson.children = [];

        if (personParents.length > 0) {
          personParents.forEach((parent, idx) => {
            currentPerson.parents[idx] = {
              id: parent.id,
              nameLatin: parent.nameLatin,
            };
            getAscendantsRec(parent, currentPerson.parents[idx]);
          });
        }
      }
    };

    getAscendantsRec(personDataList[personIndex], person);

    return person;
  };

  const descendantTree = getDescendants(
    prepData,
    "bab9f1dd-f0a7-4434-bd32-11ad74b3b2db"
  );

  const ascendantTree = getAscendants(
    prepData,
    "bab9f1dd-f0a7-4434-bd32-11ad74b3b2db"
  );

  const fullTree = {
    ...descendantTree,
    parents: ascendantTree.parents,
    isRootPerson: true,
  };

  return {
    descendantTree,
    ascendantTree,
    fullTree,
  };
}
