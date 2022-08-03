import React from "react";
import useGenerations from "./useGenerations";
import "./generation.css";
import classNames from "classnames";

const Generations = () => {
  const { generationsKeyList, generationsPersonList } = useGenerations();

  return (
    <ul className="generations">
      {generationsPersonList.map((generation, genIdx) => {
        return (
          <li className="generations__item" key={genIdx}>
            <ul className="generation">
              {generation.map((person, personIdx) => {
                return (
                  <li className={classNames("generation__person", {root: person.isRootPerson})}  key={personIdx}>
                    <span className="generation__person-index">
                      {generationsKeyList[genIdx] + "; " + personIdx}
                    </span>
                    <p>
                      {person.nameLatin.first} {person.nameLatin.family}
                    </p>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Generations;
