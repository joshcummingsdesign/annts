import { test, expect } from "vitest";
import { Value } from "./Value";

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

test("should raise a number to a power", () => {
  const a = new Value(8);
  const b = new Value(2);
  const l = a.pow(b);

  const expected = new Value(64, [a, b], "**");

  expect(JSON.stringify(l)).toEqual(JSON.stringify(expected));

  l.backward();

  expect(l.grad).toEqual(1);
  expect(a.grad).toEqual(16);
});

test("should handle tanh", () => {
  const a = new Value(2.5);
  const l = a.tanh();

  const expected = new Value(0.9866142981514303, [a], "tanh");

  expect(JSON.stringify(l)).toEqual(JSON.stringify(expected));

  l.backward();

  expect(a.grad).toEqual(0.026592226683160525);
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
  expect(a.grad).toEqual(-3.0);
});

test("should handle a neuron", () => {
  // Inputs
  const x1 = new Value(2.0);
  const x2 = new Value(0.0);
  // Weights
  const w1 = new Value(-3.0);
  const w2 = new Value(1.0);
  // Bias
  const b = new Value(6.881373587019543);
  // y hat
  const x1w1 = x1.mul(w1);
  const x2w2 = x2.mul(w2);
  const x1w1x2w2 = x1w1.add(x2w2);
  const n = x1w1x2w2.add(b);
  const yhat = n.tanh();

  const expected = new Value(0.7071067811865476, [n], "tanh");

  expect(JSON.stringify(yhat)).toEqual(JSON.stringify(expected));

  yhat.backward();

  expect(yhat.grad).toEqual(1);
  expect(n.grad).toEqual(0.4999999999999999);
  expect(x1w1x2w2.grad).toEqual(0.4999999999999999);
  expect(b.grad).toEqual(0.4999999999999999);
  expect(x1w1.grad).toEqual(0.4999999999999999);
  expect(x2w2.grad).toEqual(0.4999999999999999);
  expect(x2.grad).toEqual(0.4999999999999999);
  expect(w2.grad).toEqual(0.0);
  expect(x1.grad).toEqual(-1.4999999999999996);
  expect(w1.grad).toEqual(0.9999999999999998);
});
