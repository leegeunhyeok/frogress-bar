import React, { useState, useLayoutEffect } from 'react';
import { Text } from 'ink';

const MAX_DOTS = 3;

export function WorkingInProgress(): React.JSX.Element {
  const [tick, setTick] = useState(0);

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      setTick((prevTick) => (prevTick < MAX_DOTS ? prevTick + 1 : 0));
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Text>
      Working in progress
      {'.'.repeat(tick % (MAX_DOTS + 1))}
    </Text>
  );
}
