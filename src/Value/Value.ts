/**
 * The Value object.
 *
 * A scalar value that supports backpropogation.
 */
export class Value {
  id: number;
  input: number;
  operator: string;
  children: Value[];
  grad: number = 0;
  _backward: () => void = () => {};

  constructor(input: number, children: Value[] = [], operator: string = "") {
    this.input = input;
    this.children = children;
    this.operator = operator;
  }

  /**
   * Add a value.
   */
  add(next: Value): Value {
    const out = new Value(this.input + next.input, [this, next], "+");

    out._backward = () => {
      this.grad += out.grad;
      next.grad += out.grad;
    };

    return out;
  }

  /**
   * Multiply a value.
   */
  mul(next: Value): Value {
    const out = new Value(this.input * next.input, [this, next], "*");

    out._backward = () => {
      this.grad += next.input * out.grad;
      next.grad += this.input * out.grad;
    };

    return out;
  }

  /**
   * Raise a number to a power.
   */
  pow(next: Value): Value {
    const out = new Value(this.input ** next.input, [this, next], "**");

    out._backward = () => {
      this.grad += next.input * this.input ** (next.input - 1) * out.grad;
    };

    return out;
  }

  /**
   * Apply a tanh activation function.
   */
  tanh(): Value {
    const n = this.input;
    const t = (Math.exp(2 * n) - 1) / (Math.exp(2 * n) + 1);
    const out = new Value(t, [this], "tanh");

    out._backward = () => {
      this.grad += (1 - t ** 2) * out.grad;
    };

    return out;
  }

  /**
   * Make a backward pass and assign gradient values.
   */
  backward(): void {
    // Topological sort of every child in the graph
    const sorted: Value[] = [];
    const visited: Value[] = [];
    const topSort = (v: Value): void => {
      if (!visited.includes(v)) {
        visited.push(v);
        v.children.forEach((child) => {
          topSort(child);
        });
        sorted.push(v);
      }
    };
    topSort(this);

    // Apply the chain rule to every child to get its gradient.
    this.grad = 1;
    sorted.reverse().forEach((v) => {
      v._backward();
    });
  }
}
