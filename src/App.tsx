import { HelpIcon } from 'components/game/help-icon';
import './App.scss';
import { Home } from 'components/home';
import { useGame } from 'context/Provider';
import { GameWindow } from 'components/game/game-window';
import { Tutorial } from 'components/tutorial';
import BarGoal from 'components/game/bar-goal/BarGoal';
import BarOptions from 'components/game/bar-options/BarOptions';
import Reset from 'components/reset/Reset';

const App = () => {
  const {
    state: { situation, isWindowFetched },
  } = useGame();

  return (
    <div className="App">
      {situation !== '' ? (
        <>
          <GameWindow />
          {isWindowFetched ? (
            <>
              <BarGoal />
              <BarOptions />
              <Reset />
            </>
          ) : null}
          <Tutorial />
          <HelpIcon />
        </>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default App;
