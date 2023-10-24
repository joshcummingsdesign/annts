import { Value } from "../../engine/Value";
import { trace } from "./trace";

/**
 * Build a DOT object for a given value.
 *
 * @link https://viz-js.com/api/
 */
export const buildDot = (root: Value): object => {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const dot: any = { graphAttributes: { rankdir: "LR" }, nodes: [], edges: [] };
  const [nodes, edges] = trace(root);

  nodes.forEach((node) => {
    const uid = JSON.stringify(node);

    dot.nodes.push({
      name: uid,
      attributes: {
        label: `input: ${node.input} | grad: ${node.grad}`,
        shape: "record",
      },
    });

    if (node.operator) {
      dot.nodes.push({
        name: uid + node.operator,
        attributes: { label: node.operator },
      });
      dot.edges.push({
        tail: uid + node.operator,
        head: uid,
      });
    }
  });

  edges.forEach(({ child, value }) => {
    dot.edges.push({
      tail: JSON.stringify(child),
      head: JSON.stringify(value) + value.operator,
    });
  });

  return dot;
};
