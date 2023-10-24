import { MLP } from "../MLP";
import { Value } from "../Value";
import { calculateLoss } from "./calculateLoss";

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
  const loss = calculateLoss(targets, predictions);

  // Zero grad before backward pass
  network.parameters().forEach((p) => {
    p.grad = 0;
  });

  // Backward pass
  loss.backward();

  // Update the parameters (gradient descent)
  network.parameters().forEach((p) => {
    p.input += -stepSize * p.grad;
  });

  return loss.input;
};
