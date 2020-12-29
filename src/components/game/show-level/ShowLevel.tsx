import { useGame } from 'context';
import React from 'react';
import './show-level.scss';

const ShowLevel = () => {
  const { state } = useGame();
  const { phase } = state;
  return (
    <div className="show-level">
      <span className="show-level__level">Level:</span>
      <span className="show-level__phase">{phase}</span>
    </div>
  );
};

export default ShowLevel;
