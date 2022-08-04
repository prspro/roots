import React from "react";
import useTree from "./useTree";
import "./tree.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import classNames from "classnames";

const Tree = () => {
  const { nodeDataList, graphDimensions, nodeDimensions, linkList, stepLine } =
    useTree();

  return (
    <div className="tree">
      <TransformWrapper limitToBounds={false} minScale={0.1} doubleClick={{disabled: true}}>
        <TransformComponent>
          <svg width={graphDimensions.width} height={graphDimensions.height}>
            {/* links group */}
            <g>
              {linkList.map((link, idx) => {
                return (
                  <path
                    key={idx}
                    d={stepLine(link)}
                    className="tree__link"
                    // fill="transparent"
                    // stroke="green"
                  ></path>
                );
              })}
            </g>
            {/* parents midpoint group */}
            <g>
              {linkList
                .filter((entry) => entry.source.x !== entry.midpoint.x)
                .map((entry, idx) => (
                  <circle
                    key={idx}
                    cx={entry.midpoint.x}
                    cy={entry.midpoint.y}
                    r={4}
                    className="tree__pair-midpoint"
                  ></circle>
                ))}
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
                      className="tree__node tree__node--back"
                    ></rect>
                    <text
                      x={node.x}
                      y={node.y}
                      dominantBaseline="middle"
                      textAnchor="middle"
                    >
                      {node.label}
                    </text>
                    <rect
                      height={nodeDimensions.height}
                      width={nodeDimensions.width}
                      x={node.x - nodeDimensions.width / 2}
                      y={node.y - nodeDimensions.height / 2}
                      className="tree__node tree__node--top"
                      onClick={() => {
                        console.log(node.id);
                      }}
                    ></rect>
                  </g>
                );
              })}
            </g>
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Tree;
