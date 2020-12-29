import { useGame } from 'context/Provider';
import React from 'react';
import './time-bar.scss';

const Timebar = () => {
  const { state, setIsGaming } = useGame();
  const { isGaming, timer, isPaused } = state;
  return (
    <div className="time-bar">
      <span
        className="time-bar--reached time-bar--reached"
        onAnimationEnd={() => setIsGaming('rejected')}
        style={
          isPaused
            ? {
                animation: `fill ${timer / 1000}s linear PAUSED forwards`,
              }
            : isGaming
            ? {
                animation: `fill ${timer / 1000}s linear forwards`,
              }
            : { animation: 'initial' }
        }
      />
    </div>
  );
};

export default Timebar;
