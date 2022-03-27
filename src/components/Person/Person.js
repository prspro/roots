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
  siblings,
}) {
  const { isMale, isFemale } = usePerson(sex);

  return (
    <div className="person">
      {/* parents block */}
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
      {/* person block */}
      {/* <div className="person__self-wrap">

      </div> */}
      {/* sobling block */}
      {siblings !== undefined ? (
        <ul className="person__siblings">
          <li className="person__sibling person__sibling--self">
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
            {/* children block */}
            {children !== undefined ? (
              <ul className="person__children">
                {children.map((child, idx) => {
                  return <li key={idx}>{child}</li>;
                })}
              </ul>
            ) : (
              " "
            )}

          </li>
          {siblings.map((child, idx) => {
            return <li key={idx} className="person__sibling">{child}</li>
          })}
        </ul>
      ) : (
        " "
      )}
    </div>
  );
}
