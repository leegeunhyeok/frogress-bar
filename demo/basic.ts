/* eslint-disable no-console -- demo */
import { xLane } from '../src';
import type { ProgressBar } from '../src/progress-bar';

const TOTAL = 100;

function delay(ms: number): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return -- demo
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function startTask(progress: ProgressBar, stopOnEnd = false): Promise<void> {
  let value = 0;

  progress.start(value);

  return new Promise<void>((resolve) => {
    const timer = setInterval(() => {
      value += Math.random() * 10;

      if (value >= TOTAL) {
        if (stopOnEnd) {
          progress.stop();
        }

        clearInterval(timer);
        resolve();
      }

      progress.update(Math.min(value, TOTAL));
    }, 100);
  });
}

async function main(): Promise<void> {
  console.log('create xlane instance');
  const xlane = xLane({
    progressBarSize: 50,
  });

  console.log('add progress bars');
  const p1 = xlane.add(TOTAL);
  const p2 = xlane.add(TOTAL);
  const p3 = xlane.add(TOTAL);
  const p4 = xlane.add(TOTAL);
  const p5 = xlane.add(TOTAL);

  console.log('#1 start');

  await Promise.all([
    startTask(p1, true),
    startTask(p2),
    startTask(p3, true),
    startTask(p4),
    startTask(p5, true),
  ]);

  console.log('#1 end');

  await delay(1000);

  console.log('#2 start');

  await Promise.all([
    startTask(p1),
    startTask(p2),
    startTask(p3),
    startTask(p4),
    startTask(p5),
  ]);

  console.log('#2 end');

  console.log('before cleanup');

  xlane.removeAll();

  console.log('after cleanup');
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises -- demo
main();
