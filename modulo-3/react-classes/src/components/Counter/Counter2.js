import React from 'react';

import css from './counter.module.css';
import IncrementButton from './incrementButton';
import DecrementButton from './decrementButton';
import Value from './Value';
import Steps from './Steps';

export default function Counter2(props) {
  const handleButtonClick = (clickType) => {
    props.onCount(clickType);
  };

  const { countValue, currentSteps } = props;

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleButtonClick}></DecrementButton>
      <Value value={countValue} />
      <IncrementButton onIncrement={handleButtonClick}></IncrementButton>
      <Steps currentSteps={currentSteps} />
    </div>
  );
}
