import { Value } from "../Value";
import { MLP } from "../MLP";
import { test, expect } from "@jest/globals";

test("should be capable of being trained successfully", () => {
  const n = new MLP(3, [4, 4, 1]);

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

  /**
   * Run a training loop iteration and return the loss.
   */
  const runTrainingLoop = (): number => {
    // Forward pass
    const predictions = testData.map((data) => n.fire(data));

    // Evaluate the Mean Squared Error (MSE) loss
    // sum([..., (prediction - target)**2])
    const loss = predictions
      .map((pred) => pred[0]) // clean up array
      .map((pred, i) => pred.add(new Value(-targets[i])).pow(new Value(2)))
      .reduce((acc, pred) => {
        acc = acc.add(pred);
        return acc;
      }, new Value(0));

    // Backward pass
    loss.backward();

    // Update parameters (gradient descent)
    n.parameters().forEach((p) => {
      p.input += -stepSize * p.grad;
    });

    return loss.input;
  };

  // Training loop
  const before = runTrainingLoop();

  [...Array(steps).keys()].forEach(() => {
    const loss = runTrainingLoop();
  });

  const after = runTrainingLoop();
  // const finalParams = n.parameters();

  // // Results
  // console.log("Before: ", before, "After: ", after);
  // console.log("Final Params: ", finalParams);

  expect(after).toBeLessThan(before);
});
