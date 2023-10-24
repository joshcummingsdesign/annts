import { Layer } from "../Layer";
import { Value } from "../Value";

/**
 * Multilayer Perceptron (MLP)
 */
export class MLP {
  layers: Layer[];

  constructor(numInputs: number, layers: number[]) {
    const sz = [numInputs, ...layers];
    this.layers = layers.map((_, i) => new Layer(sz[i], sz[i + 1]));
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
   * Fire the neural network.
   */
  fire(values: Value[]): Value[] {
    let x = this.layers[0].fire(values);

    this.layers.slice(1).forEach((layer) => {
      x = layer.fire(x);
    });

    return x;
  }
}
