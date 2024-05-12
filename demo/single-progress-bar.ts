import { xLane } from '../src';
import { dummyTask } from './utils/dummy-task';

// 1. Create instance
const xlane = xLane({
  progressBarSize: 50,
  activeChar: '█',
  inactiveChar: '░',
  refreshRate: 50,
});

// 2. Add new progress bar
const progressBar = xlane.add({
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader',
  },
});

// 3. Render progress bar
progressBar.start({ value: 0 });

dummyTask({
  onProgress: (progress) => {
    // 4. Update progress bar state
    progressBar.update({ value: progress });
  },
}).then(() => {
  // 5. Remove progress bar
  xlane.removeAll();
});
