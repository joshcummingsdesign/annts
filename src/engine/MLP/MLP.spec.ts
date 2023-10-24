import { test, expect } from "vitest";
import { Value } from "../Value";
import { MLP } from "../MLP";
import { runTrainingLoop } from "../lib/runTrainingLoop";

test("should be capable of being trained to do binary classification", () => {
  const network = new MLP(3, [4, 4, 1]);

  const testData = [
    [new Value(2.0), new Value(3.0), new Value(-1.0)],
    [new Value(3.0), new Value(-1.0), new Value(0.5)],
    [new Value(0.5), new Value(1.0), new Value(1.0)],
    [new Value(1.0), new Value(1.0), new Value(-1.0)],
  ];

  const targets = [1.0, -1.0, -1.0, 1.0];

  // Learning rate
  const steps = 20;
  const stepSize = 0.01;

  const { lossBefore, lossAfter } = runTrainingLoop({
    network,
    testData,
    targets,
    stepSize,
    steps,
  });

  expect(lossAfter).toBeLessThan(lossBefore);
});
