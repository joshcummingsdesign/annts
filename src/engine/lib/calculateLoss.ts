import { Value } from "../Value";

/**
 * Calculate the Mean Squared Error (MSE) loss.
 *
 * ```
 * sum([..., (prediction - target)**2])
 * ```
 */
export const calculateLoss = (targets: number[], predictions: Value[][]) =>
  predictions
    .map((p) => p[0]) // clean up array
    .map((p, i) => p.add(new Value(-targets[i])).pow(new Value(2)))
    .reduce((acc, p) => {
      acc = acc.add(p);
      return acc;
    }, new Value(0));
