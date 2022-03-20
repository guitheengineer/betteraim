import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import { render } from 'components/utils';
import { leftRandomPosition } from 'utils';

beforeEach(() => {
  jest.useFakeTimers();
});

test('if game works correctly', async () => {
  render(<App />);

  userEvent.click(screen.getByRole('button', { name: 'bubbles Play' }));

  await waitFor(() => {
    expect(
      screen.queryByRole('button', { name: 'bubbles Play' })
    ).not.toBeInTheDocument();
  });

  const gameWindow = screen.getByTestId('game-window');
  expect(gameWindow).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByTestId('bubbles-list')).toBeInTheDocument();
  });

  act(() => {
    let counter = 1000;
    // Recursive timeout to increase time between bubbles

    let bubblesInsertedQuantity = 0;
    const RecursiveTimeout = () => {
      bubblesInsertedQuantity++;
      // Defines how much time should have between one bubble and another
      counter = counter * 1.5 - 100;

      // Timeout that calls recursive timeout, but with a increased time on 'counter'
      const lowTimeout = setTimeout(RecursiveTimeout, counter);

      // If bubbles quantity has reached, the timeout it's cleared and no bubbles is gonna be inserted
      if (bubblesInsertedQuantity === 5) {
        clearInterval(lowTimeout);
        expect(screen.getAllByTestId('bubble-item').length + 1).toBe(5);
      }
    };

    setTimeout(RecursiveTimeout, counter);

    jest.runAllTimers();
  });

  userEvent.click(screen.getByRole('button', { name: 'pause' }));

  expect(screen.getAllByTestId('bubble-item')[0]).toHaveStyle(
    `animation: bubblesAnimation 3s ease-in-out alternate forwards paused`
  );

  userEvent.click(screen.getByRole('button', { name: 'pause' }));

  expect(screen.getAllByTestId('bubble-item')[0]).toHaveStyle(
    `animation: bubblesAnimation 3s ease-in-out alternate forwards`
  );
});

test('if the limits of generated random positions work correctly', () => {
  expect(
    Number(leftRandomPosition({ gameWidth: 744, bubbleSize: 40 }).slice(0, -2))
  ).toBeGreaterThanOrEqual(0);
  expect(
    Number(leftRandomPosition({ gameWidth: 744, bubbleSize: 40 }).slice(0, -2))
  ).toBeLessThanOrEqual(744);
});
