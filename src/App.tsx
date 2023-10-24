import { DrawDot } from "./components/DrawDot";
import { MLP } from "./engine/MLP";
import { Value } from "./engine/Value";
import { calculateLoss } from "./engine/lib/calculateLoss";

const network = new MLP(3, [4, 4, 1]);

const prediction = network.fire([
  new Value(1.0),
  new Value(1.0),
  new Value(-1.0),
]);

const loss = calculateLoss([1.0], [prediction]);

loss.backward();

export const App = () => <DrawDot value={loss} />;
