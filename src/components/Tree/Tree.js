import React from "react";
import useTree from "./useTree.js";
import "./tree.css";
import Person from "../Person/Person";

export default function Tree() {
  const { descendantTree, ascendantTree, fullTree } = useTree();

  const renderAscendants = (currPerson) => {
    return (
      <Person
        key={currPerson.id}
        firstName={currPerson.nameLatin.first}
        familyName={currPerson.nameLatin.family}
        spouseData={currPerson.spouse}
        parents={currPerson.parents.map((parent) => {
          return renderAscendants(parent);
        })}
      />
    );
  };

  const renderDescendants = (currPerson) => {
    return (
      <Person
        key={currPerson.id}
        firstName={currPerson.nameLatin.first}
        familyName={currPerson.nameLatin.family}
        spouseData={currPerson.spouse}
        children={currPerson.children.map((child) => {
          return renderDescendants(child);
        })}
      />
    );
  };

  const renderTree = (currPerson) => {
    console.log(currPerson.children);
    return (
      <Person
        key={currPerson.id}
        sex={currPerson.sex}
        isRootPerson={currPerson.isRootPerson}
        firstName={currPerson.nameLatin.first}
        familyName={currPerson.nameLatin.family}
        spouseData={currPerson.spouse}
        children={currPerson.children.map((child) => {
          return renderTree(child);
        })}
        parents={currPerson.parents.map((parent) => {
          return renderTree(parent);
        })}
        siblings={currPerson.siblings.map((sibling) => {
          return renderTree(sibling);
        })}
      />
    );
  };

  return (
    <div className="tree">
      {/* {renderDescendants(descendantTree)} */}
      {/* {renderAscendants(ascendantTree)} */}
      {renderTree(fullTree)}
    </div>
  );
}
