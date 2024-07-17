import { stdin } from 'node:process';
import { emitKeypressEvents } from 'node:readline';
import * as Frogress from '../src';
import { dummyTask } from './__fixtures__/dummy-task';

// 1. Create instance
const frogress = Frogress.create({
  progressBarSize: 50,
  activeChar: '█',
  inactiveChar: '░',
  refreshRate: 50,
});

// 2. Add progress bars
const progressBar = frogress.add({
  total: 100,
  template: 'Bundle {progress} ({value}/{total} Modules, {percentage})',
  placeholder: {
    no: {
      color: 'grey',
    },
  },
});

let status: 'idle' | 'building' = 'idle';
let attempt = 0;

async function build(): Promise<void> {
  if (status === 'building') {
    return;
  }

  console.log(`Build #${(++attempt).toString()}`);

  // 3. Render progress bar
  progressBar.start({ value: 0 });

  status = 'building';

  await dummyTask({
    onProgress: (progress) => {
      // 4. Update progress bar state
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

  stdin.on('keypress', (_: unknown, key: { name: string; ctrl: boolean }) => {
    if (key.ctrl) {
      if (key.name === 'c') {
        // 5. Remove all progress bars
        frogress.removeAll();
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
