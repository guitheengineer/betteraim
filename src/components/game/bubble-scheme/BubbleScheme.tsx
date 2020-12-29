import React, { useEffect } from 'react';
import { useGame } from 'context/Provider';
import { bubbleAdd } from 'utils';
import './bubble-scheme.scss';
import { nanoid } from 'nanoid';

const BubblesScheme = () => {
  const { setTimer, state, setClickQuantity, setBubbles } = useGame();
  const {
    phase,
    windowDimensions,
    bubbleSize,
    isResizing,
    isPaused,
    bubblesQuantity,
    situation,
    isWindowFetched,
    isGaming,
    isDragable,
    bubbles,
    isDraging,
  } = state;

  useEffect(() => {
    if (situation === 'start' && isWindowFetched) {
      setTimer(phase * 1000 + 40000);

      let counter = 1000;
      // Recursive timeout to increase time between bubbles

      let bubblesInsertedQuantity = 0;
      const RecursiveTimeout = () => {
        setBubbles({
          type: 'add',
          content: bubbleAdd(nanoid(), windowDimensions, bubbleSize),
        });

        bubblesInsertedQuantity++;
        // Defines how much time should have between one bubble and another
        counter = counter * 1.5 - phase * 100;

        // Timeout that calls recursive timeout, but with a increased time on 'counter'
        const lowTimeout = setTimeout(RecursiveTimeout, counter);

        // If bubbles quantity has reached, the timeout it's cleared and no bubbles is gonna be inserted
        if (bubblesInsertedQuantity === bubblesQuantity) {
          clearInterval(lowTimeout);
        }
      };

      const bubblesTimeout = setTimeout(RecursiveTimeout, counter);

      return () => clearTimeout(bubblesTimeout);
    }
  }, []);

  const handleClick = (id: number) => {
    if (!isPaused && !isDragable) {
      setClickQuantity('increase');
      setBubbles({ type: 'delete', content: id });

      setTimeout(() => {
        setBubbles({
          type: 'add',
          content: bubbleAdd(nanoid(), windowDimensions, bubbleSize),
        });
      }, 2000);
    }
  };

  const handleTimeout = (id: number) => {
    if (!isResizing) {
      setClickQuantity('decrease');
    }

    setBubbles({ type: 'delete', content: id });

    setTimeout(() => {
      setBubbles({
        type: 'add',
        content: bubbleAdd(nanoid(), windowDimensions, bubbleSize),
      });
    }, 2000);
  };

  return (
    <ul data-testid="bubbles-list" className="bubble-scheme">
      {!isResizing &&
        !isDraging &&
        isGaming &&
        bubbles.map((bubble) => (
          <li
            data-testid="bubble-item"
            key={bubble.id}
            id={bubble.id}
            style={{
              left: bubble.left,
              top: bubble.top,
              width: bubble.width,
              height: bubble.width,
              animation: isPaused
                ? 'bubblesAnimation 3s ease-in-out alternate forwards paused'
                : 'bubblesAnimation 3s ease-in-out alternate forwards',
            }}
            className="bubble-scheme__bubbles"
            onMouseDown={() => handleClick(bubble.id)}
            onAnimationEnd={() => handleTimeout(bubble.id)}
          />
        ))}
    </ul>
  );
};

export default BubblesScheme;
