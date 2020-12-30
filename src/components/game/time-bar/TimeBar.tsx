import { useGame } from 'context/Provider';

import './time-bar.scss';

const Timebar = () => {
  const {
    state: { isGaming, timer, isPaused },
    setIsGaming,
  } = useGame();

  return timer ? (
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
            : { animation: `fill ${timer / 1000}s linear forwards` }
        }
      />
    </div>
  ) : null;
};

export default Timebar;
