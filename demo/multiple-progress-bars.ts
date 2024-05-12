import { xLane } from '../src';
import { dummyTask } from './utils/dummy-task';

// 1. Create instance
const xlane = xLane({
  progressBarSize: 50,
  activeChar: '█',
  inactiveChar: '░',
  refreshRate: 50,
});

// 2. Add progress bars
const progressBar1 = xlane.add({
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader #1',
  },
});

const progressBar2 = xlane.add({
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader #2',
  },
});

const progressBar3 = xlane.add({
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
  xlane.removeAll();
});
