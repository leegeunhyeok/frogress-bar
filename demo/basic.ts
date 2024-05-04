/* eslint-disable no-console -- demo */
import { xLane } from '../src';

function delay(ms: number): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return -- demo
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  const progress = xLane({
    progresses: {
      first: { value: 10, total: 100 },
      second: { value: 50, total: 100 },
    },
    progressBarSize: 50,
  });

  console.log('#1 start');
  progress.start();

  await delay(1000);

  progress.stop();
  console.log('#1 stopped');

  await delay(1000);

  console.log('#2 start');
  progress.start();

  await delay(1000);

  progress.stop();
  console.log('#2 stopped');
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises -- demo
main();
