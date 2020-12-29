import React, { useEffect } from 'react';
import { BubbleScheme } from '../bubble-scheme';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd';
import FullScreen from 'react-full-screen';
import { useGame } from 'context/Provider';
import './game-window.scss';
import { TimeBar } from 'components/game/time-bar';
import { PauseIcon } from 'components/game/pause-icon';
import { HandleSituation } from 'components/handle-situation';
import { useMediaQuery } from 'react-responsive';
import { getLocalStorage, StorageItems, setLocalStorage } from 'utils';
import { responsiveWindow } from 'utils/responsive-window';
import ShowLevel from '../show-level/ShowLevel';

const GameWindow = () => {
  const {
    setClick,
    setBubbles,
    state,
    setIsResizing,
    setIsWindowFetched,
    setIsFullScreen,
    setWindowData,
    setIsDraging,
    setResetWindows,
  } = useGame();

  const {
    windowDimensions,
    isDragable,
    situation,
    isWindowFetched,
    isFullScreen,
    resetWindows,
  } = state;

  const isMin790 = useMediaQuery({ minWidth: 790 });
  const is790 = useMediaQuery({ maxWidth: 790 });
  const is670 = useMediaQuery({ maxWidth: 670 });
  const is585 = useMediaQuery({ maxWidth: 585 });
  const is485 = useMediaQuery({ maxWidth: 485 });
  const is415 = useMediaQuery({ maxWidth: 415 });
  const is360 = useMediaQuery({ maxWidth: 360 });

  useEffect(() => {
    if (is790 && isWindowFetched) {
      setResetWindows(true);
    }
  }, [isWindowFetched]);

  useEffect(() => {
    const localStorageWindowPositioning = getLocalStorage({
      localString: StorageItems.windowPositioning,
    });
    if (localStorageWindowPositioning) {
      setWindowData({
        type: 'windowDimensions',
        content: localStorageWindowPositioning,
      });
    } else {
      setWindowData({
        type: 'windowDimensions',
        content: {
          x: window.screen.width / 2 - windowDimensions.width / 2,
          y: window.screen.height / 2 - windowDimensions.height / 2 - 62,
        },
      });
    }

    const localStorageWindowDimensions = getLocalStorage({
      localString: StorageItems.windowDimensions,
    });

    if (localStorageWindowDimensions) {
      setWindowData({
        type: 'windowDimensions',
        content: localStorageWindowDimensions,
      });
    } else {
      responsiveWindow(
        setWindowData,
        isMin790,
        is790,
        is670,
        is585,
        is485,
        is415,
        is360
      );
    }
    setIsWindowFetched(true);
    setResetWindows(false);
  }, [resetWindows, isWindowFetched]);

  useEffect(() => {
    setBubbles({ type: 'update-position' });
    setIsResizing(true);
    setIsResizing(false);
  }, [windowDimensions]);

  const handleResizeStop: RndResizeCallback = (
    _e,
    _dir,
    ref,
    _delta,
    position
  ) => {
    const width = ref.offsetWidth;
    const height = ref.offsetHeight;
    setWindowData({ type: 'windowDimensions', content: { width, height } });

    setLocalStorage({
      localString: StorageItems.windowDimensions,
      localObject: { width, height },
    });

    const { x, y } = position;
    setWindowData({ type: 'windowDimensions', content: { x, y } });
    setLocalStorage({
      localString: StorageItems.windowPositioning,
      localObject: { x, y },
    });
  };

  const handleDragStart = () => {
    setIsDraging(true);
  };

  const handleDragStop: RndDragCallback = (_e, data) => {
    setIsDraging(false);
    const { x, y } = data;
    setWindowData({ type: 'windowDimensions', content: { x, y } });
    setLocalStorage({
      localString: StorageItems.windowPositioning,
      localObject: { x, y },
    });
  };

  const handleFullScreenHandle = (enabled: boolean) => {
    if (!enabled) {
      setIsFullScreen(false);

      const localDimensions = getLocalStorage({
        localString: StorageItems.windowDimensions,
      });
      if (localDimensions) {
        const { width, height } = localDimensions;
        setWindowData({ type: 'windowDimensions', content: { width, height } });
      } else {
        responsiveWindow(
          setWindowData,
          isMin790,
          is790,
          is670,
          is585,
          is485,
          is415,
          is360
        );
      }
    } else {
      setWindowData({
        type: 'windowDimensions',
        content: { width: window.screen.height, height: window.screen.width },
      });
    }
  };
  return (
    <Rnd
      data-testid="game-window"
      minHeight={62}
      minWidth={63}
      className="game-window"
      bounds=".App"
      // lockAspectRatio={true}
      disableDragging={!isDragable}
      enableResizing={isDragable}
      onClick={() => setClick(false)}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={handleResizeStop}
      style={{
        border: isDragable ? '1px dashed red' : 'initial',
        background:
          situation === 'start'
            ? 'linear-gradient(0deg, rgba(255, 255, 255, 0.41), rgba(255, 255, 255, 0.41)), #2d2d2d'
            : 'linear-gradient(129.44deg, rgba(255, 255, 255, 0.23) -18.63%, rgba(255, 255, 255, 0) 100.85%), #2D2D2D',
      }}
      default={windowDimensions}
      size={windowDimensions}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      position={{ x: windowDimensions.x, y: windowDimensions.y }}
    >
      <FullScreen enabled={isFullScreen} onChange={handleFullScreenHandle}>
        {situation === 'rejected' || situation === 'passed' ? (
          <HandleSituation />
        ) : situation === 'start' && isWindowFetched ? (
          <>
            <TimeBar />
            <BubbleScheme />
            <PauseIcon />
            <ShowLevel />
          </>
        ) : (
          <></>
        )}
      </FullScreen>
    </Rnd>
  );
};

export default GameWindow;
