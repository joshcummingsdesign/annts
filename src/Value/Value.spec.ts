import { Value } from "./Value";
import { test, expect } from "@jest/globals";

test("should add two numbers", () => {
  expect(Value(1, 2)).toBe(3);
});
