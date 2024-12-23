const Frogress = require('../../dist/index');
const { dummyTask } = require('../__fixtures__/dummy-task');

const defaultConfig = {
  progressBarSize: 50,
  activeChar: '█',
  inactiveChar: '░',
};

// 1. Create progress bars
const progressBar1 = Frogress.create({
  ...defaultConfig,
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader #1',
  },
});

const progressBar2 = Frogress.create({
  ...defaultConfig,
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader #2',
  },
});

const progressBar3 = Frogress.create({
  ...defaultConfig,
  total: 100,
  template: '{label} {progress} ({percentage})',
  placeholder: {
    label: 'Downloader #3',
  },
});

// 2. Render progress bar
progressBar1.start({ value: 0 });
progressBar2.start({ value: 0 });
progressBar3.start({ value: 0 });

// 3. Update progress bar state
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
  // 4. Remove all progress bars
  Frogress.removeAll();
});
