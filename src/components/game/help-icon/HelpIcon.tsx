import React from 'react';
import { useTour } from 'context/Provider';
import './help-icon.scss';

const HelpIcon = () => {
  const { setTour } = useTour();
  return (
    <div className='help-icon' onClick={() => setTour(true)}>
      ?
    </div>
  );
};

export default HelpIcon;
