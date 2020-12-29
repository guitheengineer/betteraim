// Abstraction to create bubbles with pre-defined positioning, size and id.

import topRandomPosition from './top-random-position';
import leftRandomPosition from './left-random-position';

const bubbleAdd = (
  id: string,
  windowDimensions: { width: number; height: number },
  bubbleSize: number
) => {
  return {
    id,
    left: leftRandomPosition({ gameWidth: windowDimensions.width, bubbleSize }),
    top: topRandomPosition({
      gameHeight: windowDimensions.height,
      bubbleSize,
    }),
    width: `${bubbleSize}px`,
    height: `${bubbleSize}px`,
    bubbleSize: 40,
  };
};

export default bubbleAdd;
