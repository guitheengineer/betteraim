import { useEffect, useState } from 'react';
import './home.scss';

import BubblesBackground from 'assets/bubbles-background.png';
import { useGame } from 'context/Provider';
import { getSimpleLocalStorage } from 'utils';

const Home = () => {
  const { setIsGaming, setPhase } = useGame();
  const [levelIsFetched, setLevelIsFetched] = useState(false);

  useEffect(() => {
    const localLevel = getSimpleLocalStorage('LEVEL');
    if (localLevel) {
      setPhase(Number(localLevel));
    }
    setLevelIsFetched(true);
  }, []);

  const handleClick = () => {
    if (levelIsFetched) {
      setIsGaming('start');
    }
  };

  return (
    <>
      <button className="Home" onClick={handleClick}>
        <img
          className="Home__bubbles-background"
          alt="bubbles"
          src={BubblesBackground}
        />
        <div className="Home__play">
          <span className="Home__text">Play</span>
        </div>
      </button>
      <span className="Home__copyright">
        Made with ❤ by
        <a
          className="Home__guilhermefront"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/guilhermefront"
        >
          guilhermefront
        </a>
      </span>
    </>
  );
};

export default Home;
