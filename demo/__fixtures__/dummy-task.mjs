const MAX = 100;

export function dummyTask({ onProgress }) {
  let progress = 0;

  return new Promise((resolve) => {
    const timer = setInterval(() => {
      progress += Math.random() * 5;

      onProgress(Math.min(progress, MAX));

      if (progress >= MAX) {
        clearInterval(timer);
        resolve();
      }
    }, 100);
  });
}
