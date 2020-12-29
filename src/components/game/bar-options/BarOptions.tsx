import React, { useEffect } from 'react';
import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';
import hand from 'assets/graphics/icons/hand.svg';
import pause from 'assets/graphics/icons/pause.svg';
import Option from './Option';
import OptionFullScreen from './OptionFullscreen';
import { setLocalStorage, StorageItems, getLocalStorage } from 'utils';
import { useGame } from 'context/Provider';
import './bar-options.scss';
import { useMediaQuery } from 'react-responsive';

const BarOptions = () => {
  const { state, setWindowData, setIsDragable, setIsPaused } = useGame();
  const {
    windowDimensions,
    isDragable,
    barOptionsDimensions,
    isPaused,
    resetWindows,
  } = state;

  useEffect(() => {
    const localBarPositioning = getLocalStorage({
      localString: StorageItems.barOptionsPositioning,
    });
    if (localBarPositioning) {
      setWindowData({
        type: 'barOptionsDimensions',
        content: localBarPositioning,
      });
    } else {
      setWindowData({
        type: 'barOptionsDimensions',
        content: {
          x:
            windowDimensions.width -
            127 +
            (window.screen.width - windowDimensions.width) / 2,
          y:
            window.screen.height -
            (window.screen.height - windowDimensions.height) / 2 +
            15 -
            62,
        },
      });
    }

    const localBarDimensions = getLocalStorage({
      localString: StorageItems.barOptionsDimensions,
    });
    if (localBarDimensions) {
      setWindowData({
        type: 'barOptionsDimensions',
        content: localBarDimensions,
      });
    } else {
      setWindowData({
        type: 'barOptionsDimensions',
        content: { width: 127, height: 31 },
      });
    }
  }, [resetWindows]);

  const handleDragStop: RndDragCallback = (_e, data) => {
    const { x, y } = data;
    setWindowData({
      type: 'barOptionsDimensions',
      content: { x, y },
    });
    setLocalStorage({
      localString: StorageItems.barOptionsPositioning,
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
    setWindowData({
      type: 'barOptionsDimensions',
      content: { width, height },
    });

    setLocalStorage({
      localString: StorageItems.barOptionsDimensions,
      localObject: { width, height },
    });

    const { x, y } = position;
    setWindowData({
      type: 'barOptionsDimensions',
      content: { x, y },
    });
    setLocalStorage({
      localString: StorageItems.barOptionsPositioning,
      localObject: { x, y },
    });
  };
  const is790 = useMediaQuery({ maxWidth: 790 });
  return (
    <Rnd
      bounds=".App"
      className="bar__options"
      minWidth={127}
      minHeight={31}
      default={barOptionsDimensions}
      disableDragging={is790 ? true : !isDragable}
      enableResizing={isDragable}
      onResizeStop={handleResizeStop}
      onDragStop={handleDragStop}
      size={barOptionsDimensions}
      position={{ x: barOptionsDimensions.x, y: barOptionsDimensions.y }}
    >
      <div
        style={{ border: isDragable && !is790 ? '1px dashed red' : 'initial' }}
        className="bar__options"
      >
        <ul className="bar__options-list">
          <Option
            setFunction={setIsDragable}
            condition={isDragable}
            icon={hand}
            alt="edit windows"
          />
          <Option
            setFunction={setIsPaused}
            condition={isPaused}
            icon={pause}
            alt="pause"
          />
          <OptionFullScreen />
        </ul>
      </div>
    </Rnd>
  );
};

export default BarOptions;
