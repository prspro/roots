import React from "react";
import usePerson from "./usePerson";
import "./person.css";
import classNames from "classnames";

export default function Person({
  sex,
  isRootPerson,
  firstName,
  familyName,
  spouseData,
  children,
  parents,
}) {
  const { isMale, isFemale } = usePerson(sex);

  return (
    <div className="person">
      {parents !== undefined ? (
        <ul className="person__parents">
          {parents.map((parent, idx) => {
            return (
              <li className="person__parent" key={idx}>
                {parent}
              </li>
            );
          })}
        </ul>
      ) : (
        " "
      )}
      <div
        className={classNames(
          "person__self",
          {
            "person__self--root": isRootPerson,
          },
          { female: isFemale },
          { male: isMale }
        )}
      >
        {firstName} {familyName}
      </div>
      {spouseData !== undefined ? (
        <div
          className={classNames(
            "person__spouse",
            { female: !isFemale },
            { male: !isMale }
          )}
        >
          {spouseData.nameLatin.first} {spouseData.nameLatin.family}
        </div>
      ) : (
        " "
      )}
      {children !== undefined ? (
        <ul className="person__children">
          {children.map((child, idx) => {
            return <li key={idx}>{child}</li>;
          })}
        </ul>
      ) : (
        " "
      )}
    </div>
  );
}
