import { useEffect, useState } from "react";
import { Value } from "../../engine/Value";
import { generateGraphSvg } from "./generateGraphSvg";

interface Props {
  value: Value;
}

/**
 * Visualize the graph for a given value.
 */
export const DrawDot = ({ value }: Props) => {
  const [graph, setGraph] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const svg = await generateGraphSvg(value);
      setGraph(svg);
    })();
  }, [value]);

  return <div dangerouslySetInnerHTML={{ __html: graph || "" }} />;
};
