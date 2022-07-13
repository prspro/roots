import React from "react";
import useGenerations from "./useGenerations";
import "./generation.css";

const Generations = () => {
  const { generationsKeyList, generationsPersonList } = useGenerations();

  return (
    <ul className="generations">
      {generationsPersonList.map((generation, idx) => {
        return (
          <li className="generations__item" key={idx}>
            <span className="generations__number">{generationsKeyList[idx]}</span>
            <ul className="generation">
              {generation.map((person, idx) => {
                return (
                  <li className="generation__person" key={idx}>
                    {person.nameLatin.first} {person.nameLatin.family}
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
