/* eslint-disable-next-line  @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { instance } from "@viz-js/viz";
import { Value } from "../../engine/Value";
import { buildDot } from "./buildDot";

/**
 * Generate a graph SVG for a given value.
 *
 * @link https://viz-js.com/api/
 *
 * @returns {string} An SVG as a string.
 */
export const generateGraphSvg = (value: Value): Promise<string> =>
  new Promise((resolve) => {
    const dot = buildDot(value);

    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    instance().then((viz: any) => {
      const graph: SVGElement = viz.renderSVGElement(dot);
      const tmp = document.createElement("div");
      tmp.appendChild(graph);
      resolve(tmp.innerHTML);
    });
  });
