import React from 'react';
import {
  Container,
  type ContainerOptions,
  type ContainerProps,
} from '../components/container.js';

export function createContainerElement(
  containerProps: ContainerProps & ContainerOptions,
): React.ReactElement<ContainerProps> {
  return React.createElement(Container, containerProps);
}
