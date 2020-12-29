import React from 'react';

type Props = {
  setFunction: any;
  condition?: boolean;
  icon: string;
  alt: string;
};

const Option = ({ setFunction, condition, icon, alt }: Props) => (
  <button
    className="bar__options-item"
    onClick={() => setFunction()}
    style={{ filter: condition ? 'brightness(180%)' : 'initial' }}
  >
    <img alt={alt} src={icon} />
  </button>
);

export default Option;
