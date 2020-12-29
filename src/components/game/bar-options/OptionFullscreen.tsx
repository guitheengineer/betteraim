import React from 'react';
import fullscreen from 'assets/graphics/icons/fullscreen.svg';
import { useGame } from 'context/Provider';

const OptionFullScreen = () => {
  const { state, setIsFullScreen } = useGame();
  const { isFullScreen } = state;
  return (
    <button
      className="bar__options-item"
      onClick={() => setIsFullScreen()}
      style={{ filter: isFullScreen ? 'brightness(180%)' : 'initial' }}
    >
      <img alt="fullscreen" src={fullscreen} />
    </button>
  );
};

export default OptionFullScreen;
