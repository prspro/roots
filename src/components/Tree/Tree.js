import useTree from "./useTree";
import "./tree.css";

const Tree = () => {
  const { svgRef, canvaSize } = useTree();

  return (
    <div className="tree">
      <svg ref={svgRef} width={canvaSize.width} height={canvaSize.height} />
    </div>
  );
};

export default Tree;
