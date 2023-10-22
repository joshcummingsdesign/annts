import { Value } from "./Value";
import { test, expect } from "@jest/globals";

test("should add", () => {
  const a = new Value(1);
  const b = new Value(2);
  const l = a.add(b);

  const expected = new Value(3, [a, b], "+");

  expect(JSON.stringify(l)).toEqual(JSON.stringify(expected));

  l.backward();

  expect(l.grad).toEqual(1);
  expect(b.grad).toEqual(1);
  expect(a.grad).toEqual(1);
});

test("should multiply", () => {
  const a = new Value(2);
  const b = new Value(3);
  const l = a.mul(b);

  const expected = new Value(6, [a, b], "*");

  expect(JSON.stringify(l)).toEqual(JSON.stringify(expected));

  l.backward();

  expect(l.grad).toEqual(1);
  expect(b.grad).toEqual(2);
  expect(a.grad).toEqual(3);
});

test("should add then multiply", () => {
  const a = new Value(8);
  const b = new Value(7);
  const c = new Value(5);
  const d = a.add(b);
  const l = d.mul(c);

  const expected = new Value(75, [d, c], "*");

  expect(JSON.stringify(l)).toEqual(JSON.stringify(expected));

  l.backward();

  expect(l.grad).toEqual(1);
  expect(d.grad).toEqual(5);
  expect(c.grad).toEqual(15);
  expect(b.grad).toEqual(5);
  expect(a.grad).toEqual(5);
});

test("should add itself", () => {
  const a = new Value(2);
  const l = a.add(a);

  const expected = new Value(4, [a, a], "+");

  expect(JSON.stringify(l)).toEqual(JSON.stringify(expected));

  l.backward();

  expect(l.grad).toEqual(1);
  expect(a.grad).toEqual(2);
});

test("should add and multiply using repeated values", () => {
  const a = new Value(-2.0);
  const b = new Value(3.0);
  const c = a.mul(b);
  const d = a.add(b);
  const l = c.mul(d);

  const expected = new Value(-6.0, [c, d], "*");

  expect(JSON.stringify(l)).toEqual(JSON.stringify(expected));

  l.backward();

  expect(l.grad).toEqual(1);
  expect(d.grad).toEqual(-6.0);
  expect(c.grad).toEqual(1);
  expect(b.grad).toEqual(-8.0);
  expect(a.grad).toEqual(3.0);
});

test("should handle a neuron", () => {
  // Inputs
  const x1 = new Value(2.0);
  const x2 = new Value(0.0);
  // Weights
  const w1 = new Value(-3.0);
  const w2 = new Value(1.0);
  // Bias
  const b = new Value(6.7);
  // y hat
  const x1w1 = x1.mul(w1);
  const x2w2 = x2.mul(w2);
  const x1w1x2w2 = x1w1.mul(x2w2);
  const yhat = x1w1x2w2.add(b);
  console.log(yhat);
});
