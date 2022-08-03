import { mainData } from "../../data/data";
import arrayUnique from "array-unique";

export default function useGenerations() {
  const prepData = mainData.map((entry) => {
    return {
      id: entry.id,
      sex: entry.sex,
      nameLatin: entry.nameLatin,
      parents: entry.parents.native,
      isProcessed: false,
      generation: 0,
    };
  });

  const sortByGenerations = (dataArray, personID) => {
    //copy data
    let personDataList = dataArray.map((entry) => {
      return { ...entry };
    });

    //define root person
    personDataList = personDataList.map((entry) => {
      if (entry.id === personID) {
        return { ...entry, isRootPerson: true };
      } else {
        return entry;
      }
    });

    //define person index in data
    let personIndex = personDataList.findIndex((person) => {
      return person.id === personID;
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
          return (
            child.parents.maman === personData.id ||
            child.parents.papa === personData.id
          );
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
            person.id === personData.parents.maman ||
            person.id === personData.parents.papa
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
    setGenerationRec(personDataList[personIndex], 0);

    //generations container
    const generations = {};

    //generations list sorting
    personDataList.forEach((person) => {
      if (generations[person.generation] === undefined) {
        generations[person.generation] = [];
      }
      generations[person.generation].push(person);
    });

    const generationsKeyList = Object.keys(generations).sort((a, b) => a - b);
    const generationsPersonList = generationsKeyList.map(
      (entry) => generations[entry]
    );

    return { generationsKeyList, generationsPersonList };
  };

  const { generationsKeyList, generationsPersonList } = sortByGenerations(
    prepData,
    "bab9f1dd-f0a7-4434-bd32-11ad74b3b2db"
  );

  const makeLinksArray = (dataArray) => {
    //copy data
    const generationsArray = dataArray.map((generation) => {
      return [...generation.map((person) => {
        return {...person};
      })];
    });

    //! no multiple spouse
    const findPersonSpouse = (person, personList, personGeneration) => {
      const childrenList = findPersonChildren(person, personList, personGeneration);
      const spouce = childrenList.reduce((previousValue, currentValue) => {
        return previousValue.push(currentValue);
      }, Array(0));
      console.log(spouce);
      return arrayUnique(spouce);
    };

    const findPersonChildren = (person, personList, personGeneration) => {
      return personList[personGeneration+1].filter((child) => {
        return child.parents.maman === person.id || child.parents.papa === person.id;
      });
    };

    generationsArray.forEach((generation, generationIdx) => {
      generation.forEach((person, personIdx) => {
        if (generationIdx < generation.length) {
          console.log(findPersonSpouse(person, generationsArray, generationIdx));
        }
      });
    });

    // console.log(generationsArray);
  };

  // makeLinksArray(generationsPersonList);

  

  return {
    generationsKeyList,
    generationsPersonList,
  };
}
