import { MLP } from "../MLP";
import { Value } from "../Value";

export interface TrainingLoopIteration {
  network: MLP;
  testData: Value[][];
  targets: number[];
  stepSize: number;
}

/**
 * Run a training loop iteration and return the loss.
 *
 * @returns {number} The loss
 */
export const runTrainingLoopIteration = ({
  network,
  testData,
  targets,
  stepSize,
}: TrainingLoopIteration): number => {
  // Forward pass
  const predictions = testData.map((data) => network.fire(data));

  // Evaluate the Mean Squared Error (MSE) loss
  // sum([..., (prediction - target)**2])
  const loss = predictions
    .map((p) => p[0]) // clean up array
    .map((p, i) => p.add(new Value(-targets[i])).pow(new Value(2)))
    .reduce((acc, p) => {
      acc = acc.add(p);
      return acc;
    }, new Value(0));

  // Backward pass
  loss.backward();

  // Update the parameters (gradient descent)
  network.parameters().forEach((p) => {
    p.input += -stepSize * p.grad;
  });

  return loss.input;
};
