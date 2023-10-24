import { Layer } from "../Layer";
import { Value } from "../Value";

/**
 * Multilayer Perceptron (MLP)
 */
export class MLP {
  layers: Layer[];

  constructor(numInputs: number, layers: number[]) {
    const size = [numInputs, ...layers];
    this.layers = layers.map((_, i) => new Layer(size[i], size[i + 1]));
  }

  /**
   * Get the parameters.
   */
  parameters(): Value[] {
    return this.layers.reduce<Value[]>((acc, layer) => {
      acc = [...acc, ...layer.parameters()];
      return acc;
    }, []);
  }

  /**
   * Fire all the layers in the neural network.
   *
   * Takes in the inputs and returns an array of weighted sums.
   *
   * @returns {Value[]} yhat array
   */
  fire(inputs: Value[]): Value[] {
    let x = this.layers[0].fire(inputs);

    this.layers.slice(1).forEach((layer) => {
      x = layer.fire(x);
    });

    return x;
  }
}
