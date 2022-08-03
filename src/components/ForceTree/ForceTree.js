import React from "react";
import "./forcetree.css";
import useForceTree from "./useForceTree";

const ForceTree = () => {
  const {
    personDataList,
    personLinksList,
    pairsMidpoints,
    nodeDimensions,
    svgDimensions,
    aaa,
    bbb,
    stepLine,
  } = useForceTree();

  return (
    <div className="tree">
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        {/* parent - parent links group */}
        <g>
          {personLinksList
            .filter((entry) => entry.type === "horizontal")
            .map((link, idx) => {
              return (
                <line
                  key={idx}
                  x1={link.source.x}
                  y1={link.source.y}
                  x2={link.target.x}
                  y2={link.target.y}
                  stroke="black"
                ></line>
              );
            })}
        </g>
        {/* parent-child links group */}
        <g>
          {/* <path d="M5,5H100V100H0" fill="transparent" stroke="green"></path> */}
          {bbb
            .filter((entry) => entry.type === "vertical")
            .map((link, idx) => {
              return (
                <path key={idx} d={stepLine(link)} fill="transparent" stroke="green"></path>
              );
            })}
        </g>
        {/* pairs midpoints */}
        <g>
          {bbb.filter(entry => entry.type === "horizontal").map((entry, idx) => {
            return <circle key={idx} cx={entry.midpoint.x} cy={entry.midpoint.y} r={3}></circle>;
          })}
        </g>
        {/* nodes group */}
        <g>
          {aaa.map((entry, idx) => {
            return (
              <g key={idx}>
                <rect
                  height={nodeDimensions.height}
                  width={nodeDimensions.width}
                  rx={nodeDimensions.radius}
                  ry={nodeDimensions.radius}
                  className="tree__node"
                  x={entry.x - nodeDimensions.width / 2}
                  y={entry.y - nodeDimensions.height / 2}
                  // x={entry.x}
                  // y={entry.y}
                ></rect>
                <text
                  x={entry.x}
                  y={entry.y}
                  dominantBaseline="middle"
                  textAnchor="middle"
                >
                  {entry.id}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default ForceTree;
