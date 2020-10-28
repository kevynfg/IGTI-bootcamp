import React, { useState } from 'react';

import css from './counter.module.css';
import IncrementButton from './incrementButton';
import DecrementButton from './decrementButton';
import Value from './Value';
import Steps from './Steps';

export default function Counter() {
  const [currentCounter, setCurrentCounter] = useState(0);
  const [steps, setSteps] = useState(2);

  const handleButtonClick = (clickType) => {
    const counter = clickType === '+' ? currentCounter + 1 : currentCounter - 1;
    setCurrentCounter(counter);
    setSteps(steps + 1);
  };

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleButtonClick}></DecrementButton>
      <Value value={currentCounter} />
      <IncrementButton onIncrement={handleButtonClick}></IncrementButton>
      <Steps currentSteps={steps} />
    </div>
  );
}
