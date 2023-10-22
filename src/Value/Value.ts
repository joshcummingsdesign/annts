export class Value {
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

    this._backward = () => {
      this.grad += out.grad;
      next.grad += out.grad;
    };

    return out;
  }

  mul(next: Value): Value {
    const out = new Value(this.input * next.input, [this, next], "*");

    this._backward = () => {
      this.grad += next.input * out.grad;
      next.grad = this.input * out.grad;
    };

    return out;
  }

  backward(): void {
    // Topographical sort
    const topo: Value[] = [];
    const visited: Value[] = [];

    const buildTopo = (v: Value): void => {
      if (!visited.includes(v)) {
        visited.push(v);
        v.children.forEach((child) => {
          buildTopo(child);
        });
        topo.push(v);
      }
    };

    buildTopo(this);

    this.grad = 1;

    topo.reverse().forEach((v) => {
      v._backward();
    });
  }
}
