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
  template: 'Downloader {no} {progress} ({value}/{total}, {percentage})',
  placeholder: {
    no: {
      text: '#1',
      color: 'grey',
    },
  },
});

const progressBar2 = xlane.add({
  total: 100,
  template: 'Downloader {no} {progress} ({value}/{total}, {percentage})',
  placeholder: {
    no: {
      text: '#2',
      color: 'grey',
    },
  },
});

const progressBar3 = xlane.add({
  total: 100,
  template: 'Downloader {no} {progress} ({value}/{total}, {percentage})',
  placeholder: {
    no: {
      text: '#3',
      color: 'grey',
    },
  },
});

// 3. Render progress bar
progressBar1.start({ value: 0 });
progressBar2.start({ value: 0 });
progressBar3.start({ value: 0 });

function getColorByPercent(percent: number): string {
  let color: string;

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

// 4. Update progress bar state
Promise.all([
  dummyTask({
    onProgress: (progress) => {
      progressBar1.update({
        value: progress,
        placeholder: {
          percentage: {
            color: getColorByPercent(progress),
          },
        },
      });
    },
  }),
  dummyTask({
    onProgress: (progress) => {
      progressBar2.update({
        value: progress,
        placeholder: {
          percentage: {
            color: getColorByPercent(progress),
          },
        },
      });
    },
  }),
  dummyTask({
    onProgress: (progress) => {
      progressBar3.update({
        value: progress,
        placeholder: {
          percentage: {
            color: getColorByPercent(progress),
          },
        },
      });
    },
  }),
]).then(() => {
  // 5. Remove all progress bars
  xlane.removeAll();
});
