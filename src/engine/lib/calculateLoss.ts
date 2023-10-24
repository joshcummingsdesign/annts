import { Value } from "../Value";

/**
 * Calculate the Mean Squared Error (MSE) loss.
 *
 * ```
 * loss = (p1 - t1)**2 + (p2 - t2)**2 ...
 * ```
 */
export const calculateLoss = (targets: number[], predictions: Value[][]) =>
  predictions
    .map((p) => p[0])
    .map((p, i) => p.add(new Value(-targets[i])).pow(new Value(2)))
    .reduce((acc, p) => {
      acc = acc.add(p);
      return acc;
    }, new Value(0));
