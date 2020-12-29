// Return a random left position value in pixels based on gameWidth dimensions.

const leftRandomPosition = ({
  gameWidth,
  bubbleSize,
}: {
  gameWidth: number;
  bubbleSize: number;
}) =>
  Math.floor(Math.random() * (gameWidth - bubbleSize) - gameWidth + 1) +
  gameWidth +
  'px';

export default leftRandomPosition;
