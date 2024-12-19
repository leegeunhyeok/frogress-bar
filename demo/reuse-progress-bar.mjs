import { stdin } from 'node:process';
import { emitKeypressEvents } from 'node:readline';
import * as Frogress from '../src/index.js';
import { dummyTask } from './__fixtures__/dummy-task.js';

// 1. Create progress bars
const progressBar = Frogress.create({
  progressBarSize: 50,
  activeChar: '█',
  inactiveChar: '░',
  total: 100,
  template: 'Bundle {progress} ({value}/{total} Modules, {percentage})',
});

let status = 'idle';
let attempt = 0;

async function build() {
  if (status === 'building') {
    return;
  }

  console.log(`Build #${(++attempt).toString()}`);

  // 2. Render progress bar
  progressBar.start({ value: 0 });

  status = 'building';

  await dummyTask({
    onProgress: (progress) => {
      // 3. Update progress bar state
      progressBar.update({ value: progress });
    },
  });

  progressBar.stop();

  console.log('✅ Build finished successfully');

  status = 'idle';
}

if (stdin.isTTY) {
  stdin.setRawMode(true);

  emitKeypressEvents(process.stdin);

  stdin.on('keypress', (_, key) => {
    if (key.ctrl) {
      if (key.name === 'c') {
        // 4. Remove all progress bars
        Frogress.removeAll();
        process.exit(0);
      }
    } else if (key.name === 'b') {
      build();
    }
  });

  console.log(`Press 'B' to build`);
  console.log(`Press 'Ctrl + C' to exit`);
  console.log('');
} else {
  console.warn('not supported environment');
  process.exit(1);
}
