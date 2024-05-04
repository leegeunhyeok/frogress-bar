import React from 'react';
import { Container, type ContainerProps } from '../components/container';

export function createContainerElement(
  containerProps: ContainerProps,
): React.ReactElement<ContainerProps> {
  return React.createElement(Container, containerProps);
}
