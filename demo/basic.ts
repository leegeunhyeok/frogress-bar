/* eslint-disable no-console -- demo */
import { xLane } from '../src';
import type { ProgressBar } from '../src/progress-bar';

const TOTAL = 100;

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
  const xlane = xLane({
    progressBarSize: 50,
  });

  console.log('start');

  const p1 = xlane.add(TOTAL);
  const p2 = xlane.add(TOTAL);
  const p3 = xlane.add(TOTAL);
  const p4 = xlane.add(TOTAL);
  const p5 = xlane.add(TOTAL);

  await Promise.all([
    startTask(p1, true),
    startTask(p2, true),
    startTask(p3),
    startTask(p4),
    startTask(p5),
  ]);

  console.log('end 1');

  await Promise.all([
    startTask(p1, true),
    startTask(p2, true),
    startTask(p3),
    startTask(p4),
    startTask(p5),
  ]);

  xlane.removeAll();

  console.log('end 2');
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises -- demo
main();
