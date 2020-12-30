import { useGame } from 'context';
import './show-level.scss';

const ShowLevel = () => {
  const {
    state: { phase },
  } = useGame();

  return (
    <div className="show-level">
      <span className="show-level__level">Level:</span>
      <span className="show-level__phase">{phase}</span>
    </div>
  );
};

export default ShowLevel;
