import { Neuron } from "../Neuron";
import { Value } from "../Value";

/**
 * A neural network layer.
 */
export class Layer {
  neurons: Neuron[];

  constructor(numInputs: number, numNeurons: number) {
    this.neurons = [...Array(numNeurons)].map(() => new Neuron(numInputs));
  }

  /**
   * Get the parameters.
   */
  parameters(): Value[] {
    return this.neurons.reduce<Value[]>((acc, neuron) => {
      acc = [...acc, ...neuron.parameters()];
      return acc;
    }, []);
  }

  /**
   * Fire all the neurons in the layer.
   *
   * Takes in the inputs and returns an array of weighted sums.
   *
   * @returns {Value[]} yhat array
   */
  fire(inputs: Value[]): Value[] {
    return this.neurons.map((neuron) => neuron.fire(inputs));
  }
}
