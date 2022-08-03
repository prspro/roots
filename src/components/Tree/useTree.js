import { useRef, useEffect, useState } from "react";
import {
  select,
  tree,
  hierarchy,
  line,
  curveStepAfter,
  curveLinear,
  zoom,
  selectAll,
  stratify,
} from "d3";

import {
  root,
  siblings,
  testData,
  rootM,
  siblingsM,
} from "../../data/rootData";

const useTree = () => {
  const svgRef = useRef(null);

  const [rootData, setRootData] = useState(root);

  //flat data to node hierarchy
  let strtifiedTestData = stratify()
    .id((d) => d.personID)
    .parentId((d) => d.parentID)(testData);
  const treeLayoutTest = tree()
    .separation((a, b) => (a.parent === b.parent ? 1 : 3))
    .nodeSize([220, 220]);
  // console.log(strtifiedTestData);
  // console.log(treeLayoutTest(strtifiedTestData));
  strtifiedTestData = treeLayoutTest(strtifiedTestData);

  const canvaSize = {
    width: 1200,
    height: 600,
  };

  const rectSize = {
    width: 150,
    height: 60,
    radius: 15,
  };
  const nodeSize = {
    width: 220,
    height: 220,
  };

  const TreeShift = {
    horizontal: canvaSize.width / 2,
    vertical: canvaSize.height / 2 - nodeSize.height,
  };

  const kx = (d) => d.x - rectSize.width / 2;

  const ky = (d) => d.y - rectSize.height / 2;

  //thie place the text x axis adjust this to center align the text
  const tx = (d) => d.x - 3;

  //thie place the text y axis adjust this to center align the text
  const ty = (d) => d.y + 3;

  useEffect(() => {
    //ref to markup svg
    const svgElem = select(svgRef.current);

    //define layout as tree
    const treeLayout = tree()
      .separation((a, b) => (a.parent === b.parent ? 1 : 1))
      .nodeSize([nodeSize.width, nodeSize.height]);
    //hierarchy node data + node coodrinates
    const rootPrepared = treeLayout(hierarchy(rootData));
    //flat node data + node coodrinates, used for drawing nodes
    const rootPreparedFlat = rootPrepared.descendants().map((entry) => {
      return {
        ...entry,
        x: entry.x + TreeShift.horizontal,
        y: entry.y + TreeShift.vertical,
      };
    });
    // parent-children links, used for drawing vertical links
    const rootLinks = rootPrepared.links().map((entry) => {
      return {
        source: {
          ...entry.source,
          x: entry.source.x + TreeShift.horizontal,
          y: entry.source.y + TreeShift.vertical,
        },
        target: {
          ...entry.target,
          x: entry.target.x + TreeShift.horizontal,
          y: entry.target.y + TreeShift.vertical,
        },
      };
    });
    // flat data + node coodrinates, used for drawing horizontal links
    const nodesPreparedFlat = rootPreparedFlat.flatMap((entry) => {
      return { x: entry.x, y: entry.y, ...entry.data };
    });

    // console.log(rootPreparedFlat);
    // console.log(nodesPreparedFlat);

    //zoom and pan
    const svg = svgElem.call(
      zoom().on("zoom", (e) => {
        svg.selectAll("svg > g").attr("transform", e.transform);
      })
    );

    console.log(svg);

    // draw parent-child links
    svg
      .append("g")
      .selectAll(".link")
      .data(rootLinks)
      .enter()
      .append("path")
      .attr("class", "tree__link tree__link--vertical")
      .attr("d", elbow);

    // draw sibling links
    svg
      .append("g")
      .selectAll(".sibling")
      .data(siblings)
      .enter()
      .append("path")
      .attr("class", "tree__link tree__link--horizontal")
      .attr("d", siblingLine);

    //create nodes
    const svgRects = svg
      .append("g")
      .selectAll(".node")
      .data(strtifiedTestData)
      .enter()
      .append("g");

    //draw node reactangles
    svgRects
      .append("rect")
      .attr("class", "tree__node")
      .attr("height", rectSize.height)
      .attr("width", rectSize.width)
      .attr("id", function (d) {
        return d.id;
      })
      .attr("display", function (d) {
        if (d.data.hidden) {
          return "none";
        } else {
          return "";
        }
      })
      .attr("x", kx)
      .attr("y", ky)
      .attr("rx", 15)
      .attr("ry", 15);
    // .style("stroke", "red")
    // .style("fill", "white");

    //draw node reactangles
    svgRects
      .append("text")
      .text(function (d) {
        return d.data.name;
      })
      .attr("display", function (d) {
        if (d.data.hidden) {
          return "none";
        } else {
          return "";
        }
      })
      .attr("x", tx)
      .attr("y", ty)
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle");

    function siblingLine(d, i) {
      // start point
      const start = nodesPreparedFlat.filter(function (v) {
        if (d.source.id === v.id) {
          return true;
        } else {
          return false;
        }
      });
      //end point
      const end = nodesPreparedFlat.filter(function (v) {
        if (d.target.id === v.id) {
          return true;
        } else {
          return false;
        }
      });
      //define teh start coordinate and end co-ordinate
      const linedata = [
        {
          x: start[0].x,
          y: start[0].y,
        },
        {
          x: end[0].x,
          y: end[0].y,
        },
      ];

      const fun = line()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(curveLinear);

      return fun(linedata);
    }

    function elbow(d, i) {
      //
      if (d.target.data.no_parent) {
        return "M0,0L0,0";
      }
      const diff = d.source.y - d.target.y;
      //0.40 defines the point from where you need the line to break out change is as per your choice.
      const ny = d.target.y + diff * 0.4;

      const linedata = [
        {
          x: d.target.x,
          y: d.target.y,
        },
        {
          x: d.target.x,
          y: ny,
        },
        {
          x: d.source.x,
          y: d.source.y,
        },
      ];

      const linkFunction = line()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(curveStepAfter);

      return linkFunction(linedata);
    }
  }, [rootData]);

  return { svgRef, canvaSize };
};

export default useTree;
