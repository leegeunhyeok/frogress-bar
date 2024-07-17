import * as Frogress from '../src';
import { dummyTask } from './__fixtures__/dummy-task';

// 1. Create instance
const frogress = Frogress.create({
  progressBarSize: 50,
  activeChar: '█',
  inactiveChar: '░',
  refreshRate: 50,
});

// 2. Add new progress bar
const progressBar = frogress.add({
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
  frogress.removeAll();
});
