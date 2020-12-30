import { useGame } from 'context';

import './reset.scss';

const Reset = () => {
  const {
    state: { isDragable, isResizing },
    setResetWindows,
  } = useGame();

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
