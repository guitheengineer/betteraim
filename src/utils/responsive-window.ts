export const responsiveWindow = (
  setWindowData: any,
  isMin790: boolean,
  is790: boolean,
  is670: boolean,
  is585: boolean,
  is485: boolean,
  is415: boolean,
  is360: boolean
) => {
  if (isMin790) {
    setWindowData({
      type: 'windowDimensions',
      content: { width: 774, height: 448 },
    });
  }
  if (is790) {
    setWindowData({
      type: 'windowDimensions',
      content: { width: 650, height: 440 },
    });
  }
  if (is670) {
    setWindowData({
      type: 'windowDimensions',
      content: { width: 575, height: 440 },
    });
  }
  if (is585) {
    setWindowData({
      type: 'windowDimensions',
      content: { width: 470, height: 400 },
    });
  }
  if (is485) {
    setWindowData({
      type: 'windowDimensions',
      content: { width: 400, height: 400 },
    });
  }
  if (is415) {
    setWindowData({
      type: 'windowDimensions',
      content: { width: 345, height: 400 },
    });
  }
  if (is360) {
    setWindowData({
      type: 'windowDimensions',
      content: { width: 310, height: 400 },
    });
  }
};
