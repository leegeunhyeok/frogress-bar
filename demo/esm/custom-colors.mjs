import * as Frogress from '../../dist/index.mjs';
import { dummyTask } from '../__fixtures__/dummy-task.mjs';

const defaultConfig = {
  progressBarSize: 50,
  activeChar: '█',
  inactiveChar: '░',
};

// 1. Create progress bars
const progressBar1 = Frogress.create({
  ...defaultConfig,
  total: 100,
  template: 'Downloader {no} {progress} ({value}/{total}, {percentage})',
  placeholder: {
    no: Frogress.color('#1', 'gray'),
  },
});

const progressBar2 = Frogress.create({
  ...defaultConfig,
  total: 100,
  template: 'Downloader {no} {progress} ({value}/{total}, {percentage})',
  placeholder: {
    no: Frogress.color('#2', 'gray'),
  },
});

const progressBar3 = Frogress.create({
  ...defaultConfig,
  total: 100,
  template: 'Downloader {no} {progress} ({value}/{total}, {percentage})',
  placeholder: {
    no: Frogress.color('#3', 'gray'),
  },
});

// 2. Render progress bar
progressBar1.start({ value: 0 });
progressBar2.start({ value: 0 });
progressBar3.start({ value: 0 });

function getColorByPercent(percent) {
  let color;

  if (percent >= 100) {
    color = '#2196F3';
  } else if (percent >= 75) {
    color = '#4caf50';
  } else if (percent >= 5) {
    color = '#ffeb3b';
  } else if (percent >= 25) {
    color = '#ff9800';
  } else {
    color = '#f44336';
  }

  return color;
}

// 3. Update progress bar state
Promise.all([
  dummyTask({
    onProgress: (progress) => {
      progressBar1.update({
        value: progress,
        placeholder: {
          percentage: Frogress.color(getColorByPercent(progress)),
        },
      });
    },
  }),
  dummyTask({
    onProgress: (progress) => {
      progressBar2.update({
        value: progress,
        placeholder: {
          percentage: Frogress.color(getColorByPercent(progress)),
        },
      });
    },
  }),
  dummyTask({
    onProgress: (progress) => {
      progressBar3.update({
        value: progress,
        placeholder: {
          percentage: Frogress.color(getColorByPercent(progress)),
        },
      });
    },
  }),
]).then(() => {
  // 4. Remove all progress bars
  Frogress.removeAll();
});
