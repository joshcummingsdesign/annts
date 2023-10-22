import { Value } from "../Value";
import { Neuron } from "./Neuron";
import { test, expect } from "@jest/globals";

test("sanity check", () => {
  const x = [new Value(2.0), new Value(3.0)];
  const n = new Neuron(2);
  const l = n.fire(x);
  expect(l).toBeInstanceOf(Value);
});
