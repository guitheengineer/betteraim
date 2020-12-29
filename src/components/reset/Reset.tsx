import { useGame } from 'context';
import React from 'react';
import './reset.scss';

const Reset = () => {
  const { state, setResetWindows } = useGame();

  const { isDragable, isResizing } = state;

  const handleClick = () => {
    localStorage.clear();
    setResetWindows(true);
  };

  return isDragable || isResizing ? (
    <button className="Reset" onClick={handleClick}>
      Reset windows
    </button>
  ) : null;
};

export default Reset;
