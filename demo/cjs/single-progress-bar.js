const Frogress = require('../../dist/index');
const { dummyTask } = require('../__fixtures__/dummy-task');

// 1. Create progress bar
const progressBar = Frogress.create({
  progressBarSize: 50,
  activeChar: '█',
  inactiveChar: '░',
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader',
  },
});

// 2. Render progress bar
progressBar.start({ value: 0 });

dummyTask({
  onProgress: (progress) => {
    // 3. Update progress bar state
    progressBar.update({ value: progress });
  },
}).then(() => {
  // 4. Remove progress bar
  Frogress.removeAll();
});
