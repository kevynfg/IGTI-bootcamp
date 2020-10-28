import React, { Fragment, useState } from 'react';
import Band from './components/Counter/Band';
import Counter from './components/Counter/Counter';
import Counter2 from './components/Counter/Counter2';

export default function App() {
  const [currentCounter, setCurrentCounter] = useState(0);
  const [steps, setSteps] = useState(2);

  const handleCount = (clickType) => {
    const counter = clickType === '+' ? currentCounter + 1 : currentCounter - 1;
    setCurrentCounter(counter);
    setSteps(steps + 1);
  };

  return (
    <Fragment>
      <h3>Band</h3>
      <Band />
      <h3>Counter 1 - Exemplo de estado de componente individual</h3>
      <Counter /> <Counter /> <Counter />
      <h3>Counter 2 - Exemplo de estado compartilhado</h3>
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentSteps={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentSteps={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentSteps={steps}
      />
    </Fragment>
  );
}
