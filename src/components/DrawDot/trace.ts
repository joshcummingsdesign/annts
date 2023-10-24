import { Value } from "../../engine/Value";

type Edge = { child: Value; value: Value };
type Trace = [nodes: Value[], edges: Edge[]];

/**
 * Trace a value.
 */
export const trace = (root: Value): Trace => {
  const nodes: Value[] = [];
  const edges: Edge[] = [];

  const build = (value: Value) => {
    if (!nodes.includes(value)) {
      nodes.push(value);
      value.children.forEach((child) => {
        edges.push({ child, value });
        build(child);
      });
    }
  };
  build(root);

  return [nodes, edges];
};
