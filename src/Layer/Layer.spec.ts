import { Value } from "../Value";
import { Layer } from "./Layer";
import { test, expect } from "@jest/globals";

test("sanity check", () => {
  const x = [new Value(2.0), new Value(3.0)];
  const n = new Layer(2, 3);
  const l = n.fire(x);
  expect(l).toHaveLength(3);
});
