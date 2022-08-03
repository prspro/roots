import React from "react";
import useTree from "./useTree";
import "./tree.css";

const Tree = () => {
  const { nodeDataList, graphDimensions, nodeDimensions, linkList, stepLine } =
    useTree();

  return (
    <div className="tree">
      <svg width={graphDimensions.width} height={graphDimensions.height}>
        {/* links group */}
        <g>
          {linkList.map((link, idx) => {
            return (
              <path
                key={idx}
                d={stepLine(link)}
                fill="transparent"
                stroke="green"
              ></path>
            );
          })}
        </g>
        {/* nodes group */}
        <g>
          {nodeDataList.map((node, idx) => {
            return (
              <g key={idx}>
                <rect
                  height={nodeDimensions.height}
                  width={nodeDimensions.width}
                  rx={nodeDimensions.radius}
                  ry={nodeDimensions.radius}
                  x={node.x - nodeDimensions.width / 2}
                  y={node.y - nodeDimensions.height / 2}
                  className="tree__node"
                ></rect>
                <text
                  x={node.x}
                  y={node.y}
                  dominantBaseline="middle"
                  textAnchor="middle"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Tree;
