// Return a top position value in pixels based on gameHeight dimensions.

const topRandomPosition = ({
  gameHeight,
  bubbleSize,
}: {
  gameHeight: number;
  bubbleSize: number;
}) =>
  Math.floor(Math.random() * (gameHeight - bubbleSize) - gameHeight + 1) +
  gameHeight +
  'px';

export default topRandomPosition;
