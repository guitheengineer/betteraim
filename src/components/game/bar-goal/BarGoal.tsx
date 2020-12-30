import { useEffect } from 'react';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd';
import { useGame } from 'context/Provider';
import {
  StorageItems,
  getLocalStorage,
  setLocalStorage,
  setSimpleLocalStorage,
} from 'utils';
import './bar-goal.scss';

const BarGoal = () => {
  const {
    state: {
      meta,
      points,
      isDragable,
      windowDimensions,
      phase,
      barGoalDimensions,
      resetWindows,
    },
    setIsGaming,
    setPhase,
    setWindowData,
  } = useGame();

  const percentage = (points * 100) / meta;

  useEffect(() => {
    const localBarGoalPosition = getLocalStorage({
      localString: StorageItems.barGoalPositioning,
    });
    if (localBarGoalPosition) {
      setWindowData({
        type: 'barGoalDimensions',
        content: localBarGoalPosition,
      });
    } else {
      setWindowData({
        type: 'barGoalDimensions',
        content: {
          x: (window.screen.width - windowDimensions.width) / 2,
          y:
            window.screen.height -
            (window.screen.height - windowDimensions.height) / 2 +
            15 -
            62,
        },
      });
    }
    const localBarGoalDimensions = getLocalStorage({
      localString: StorageItems.barGoalDimensions,
    });
    if (localBarGoalDimensions) {
      setWindowData({
        type: 'barGoalDimensions',
        content: localBarGoalDimensions,
      });
    } else {
      setWindowData({
        type: 'barGoalDimensions',
        content: { width: windowDimensions.width - (127 + 8), height: 31 },
      });
    }
  }, [resetWindows]);

  useEffect(() => {
    if (percentage >= 100) {
      setIsGaming('passed');
      setPhase('increase');
    }
  }, [percentage]);

  useEffect(() => {
    setSimpleLocalStorage('LEVEL', phase);
  }, [phase]);

  const handleDragStop: RndDragCallback = (_e, data) => {
    const { x, y } = data;
    setWindowData({ type: 'barGoalDimensions', content: { x, y } });
    setLocalStorage({
      localString: StorageItems.barGoalPositioning,
      localObject: { x, y },
    });
  };

  const handleResizeStop: RndResizeCallback = (
    _e,
    _dir,
    ref,
    _delta,
    position
  ) => {
    const width = ref.offsetWidth;
    const height = ref.offsetHeight;
    setWindowData({ type: 'barGoalDimensions', content: { width, height } });
    setLocalStorage({
      localString: StorageItems.barGoalDimensions,
      localObject: { width, height },
    });

    const { x, y } = position;
    setWindowData({ type: 'barGoalDimensions', content: { x, y } });
    setLocalStorage({
      localString: StorageItems.barGoalPositioning,
      localObject: { x, y },
    });
  };

  return (
    <Rnd
      bounds=".App"
      disableDragging={!isDragable}
      enableResizing={isDragable}
      className="bar__wrapper"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      size={barGoalDimensions}
      default={barGoalDimensions}
      position={{ x: barGoalDimensions.x, y: barGoalDimensions.y }}
    >
      <div
        style={{ border: isDragable ? '1px dashed red' : 'initial' }}
        className="bar__goal"
      >
        <span
          className="bar__goal--fill"
          style={{
            width: `${percentage >= 100 ? 100 : percentage}%`,
            backgroundColor: percentage >= 100 ? '#00ae00' : '#484848',
          }}
        />
      </div>
    </Rnd>
  );
};

export default BarGoal;
