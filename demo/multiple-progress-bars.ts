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
const progressBar1 = frogress.add({
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader #1',
  },
});

const progressBar2 = frogress.add({
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader #2',
  },
});

const progressBar3 = frogress.add({
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader #3',
  },
});

// 3. Render progress bar
progressBar1.start({ value: 0 });
progressBar2.start({ value: 0 });
progressBar3.start({ value: 0 });

// 4. Update progress bar state
Promise.all([
  dummyTask({
    onProgress: (progress) => {
      progressBar1.update({ value: progress });
    },
  }),
  dummyTask({
    onProgress: (progress) => {
      progressBar2.update({ value: progress });
    },
  }),
  dummyTask({
    onProgress: (progress) => {
      progressBar3.update({ value: progress });
    },
  }),
]).then(() => {
  // 5. Remove all progress bars
  frogress.removeAll();
});
