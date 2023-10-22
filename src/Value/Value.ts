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

  add(next: Value): Value {
    const out = new Value(this.input + next.input, [this, next], "+");

    out._backward = () => {
      this.grad += out.grad;
      next.grad += out.grad;
    };

    return out;
  }

  mul(next: Value): Value {
    const out = new Value(this.input * next.input, [this, next], "*");

    out._backward = () => {
      this.grad += next.input * out.grad;
      next.grad += this.input * out.grad;
    };

    return out;
  }

  relu(): Value {
    const out = new Value(Math.max(this.input, 0), [this], "relu");

    out._backward = () => {
      this.grad += out.input > 0 ? out.input * out.grad : 0;
    };

    return out;
  }

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

    // Apply chain rule to every child to get its gradient
    this.grad = 1;
    sorted.reverse().forEach((v) => {
      v._backward();
    });
  }
}
