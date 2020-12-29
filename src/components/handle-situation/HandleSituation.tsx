import { useGame } from 'context/Provider';
import React from 'react';
import ButtonSituation from './ButtonSituation';
import './handle-situation.scss';

const HandleSituation = () => {
  const { state } = useGame();
  const { situation, phase } = state;

  return (
    <div className='handle-situation'>
      {situation === 'passed' ? (
        <>
          <div className='handle-situation__title'>
            <p className='handle-situation__level'>
              <span className='handle-situation__level--lvl'>LVL:</span>
              <span className='handle-situation__level--number'>{phase}</span>
            </p>
            Passed
          </div>
          <ButtonSituation color='#00ae00' label='Next level' />
        </>
      ) : situation === 'rejected' ? (
        <>
          <div className='handle-situation__title'>Level not completed</div>
          <ButtonSituation />
        </>
      ) : null}
    </div>
  );
};

export default HandleSituation;
