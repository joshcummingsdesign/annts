import { Value } from "../Value";
import {
  TrainingLoopIteration,
  runTrainingLoopIteration,
} from "./runTrainingLoopIteration";

interface Params extends TrainingLoopIteration {
  steps: number;
  logging?: boolean;
}

interface Results {
  lossBefore: number;
  lossAfter: number;
  finalParams: Value[];
}

/**
 * Run the training loop and return the results.
 */
export const runTrainingLoop = ({ steps, ...params }: Params): Results => {
  const { network, logging } = params;

  logging && console.log("\n======= Steps =======\n");

  // Training loop
  const lossBefore = runTrainingLoopIteration(params);
  logging && console.log(lossBefore);

  [...Array(steps - 2).keys()].forEach(() => {
    const loss = runTrainingLoopIteration(params);
    logging && console.log(loss);
  });

  const lossAfter = runTrainingLoopIteration(params);
  logging && console.log(lossAfter);

  logging && console.log("\n======= Final Parameters =======\n");

  const finalParams = network.parameters();
  logging &&
    console.log(
      JSON.stringify(
        finalParams.map((p) => p.input),
        null,
        2,
      ),
    );

  return {
    lossBefore,
    lossAfter,
    finalParams,
  };
};
