import { useTour } from 'context/Provider';
import React from 'react';
import Tour from 'reactour';

const Tutorial = () => {
  const { setTour, state } = useTour();
  const { isTourOpen } = state;
  return (
    <Tour
      accentColor="#ff2323"
      steps={[
        {
          selector: '.react-draggable',
          content:
            "Welcome to the tutorial. Let's go directly to the point, is in this window that you're tested. Hit the bubbles as fast as you can.",
          position: 'top',
          style: {
            backgroundColor: '#383838',
            fontSize: '15px',
            color: 'white',
            lineHeight: '140%',
            fontFamily: 'Play',
          },
        },
        {
          selector: '.time-bar',
          content: 'This bar indicates how much time is left to end the round.',
          style: {
            backgroundColor: '#383838',
            fontSize: '15px',
            color: 'white',
            lineHeight: '140%',
            fontFamily: 'Play',
          },
          position: 'left',
        },
        {
          selector: '.bar__goal',
          content:
            'This bar indicates the goal to be achieved. As you hit those bubbles, it will fill, if you reached the required quantity, you passed to the next level.',
          position: 'right',
          style: {
            backgroundColor: '#383838',
            fontSize: '15px',
            color: 'white',
            lineHeight: '140%',
            fontFamily: 'Play',
          },
        },
        {
          selector: '.bar__options',
          // eslint-disable-next-line react/display-name
          content: () => (
            <>
              <p>These are the game options which you are capable of:</p>
              <li>
                Resizing and moving all the windows in this game (hand icon)
              </li>
              <li>Pause the game (pause icon)</li>
              <li>Enter in fullscreen (ícone de fullscreen)</li>
            </>
          ),
          position: 'right',
          style: {
            listStylePosition: 'inside',
            backgroundColor: '#383838',
            fontSize: '15px',
            color: 'white',
            lineHeight: '140%',
            fontFamily: 'Play',
          },
        },
        {
          selector: '.App',
          content: "This is it, we're done. Have fun!",
          position: 'center',
          style: {
            backgroundColor: '#383838',
            fontSize: '15px',
            color: 'white',
            lineHeight: '140%',
            fontFamily: 'Play',
          },
        },
      ]}
      isOpen={isTourOpen}
      onRequestClose={() => setTour(false)}
      rounded={8}
    />
  );
};

export default Tutorial;
