import React, { useEffect, useState } from 'react';
import Installments from './components/Input/Installments';
import Installment from './components/Input/Installment';
import Inputs from './components/Input/Inputs';

export default function App() {
  const [initialValue, setInitialValue] = useState(1000);
  const [monthlyInterest, setmonthlyInterest] = useState(1);
  const [monthlyPeriod, setmonthlyPeriod] = useState(12);
  const [installments, setinstallments] = useState([]);

  useEffect(() => {
    CalculateInterest(initialValue, monthlyInterest, monthlyPeriod);
  }, [initialValue, monthlyInterest, monthlyPeriod]);

  const CalculateInterest = (initialValue, monthlyInterest, monthlyPeriod) => {
    let newInstallment = [];

    let currentId = 1;
    let currentValue = initialValue;
    let percentage = 0;

    for (let i = 1; i <= monthlyPeriod; i++) {
      const valueWithInterest =
        (currentValue * Math.abs(monthlyInterest)) / 100;

      currentValue =
        monthlyInterest >= 0
          ? currentValue + valueWithInterest
          : currentValue - valueWithInterest;

      percentage = (currentValue / initialValue - 1) * 100;

      newInstallment.push({
        id: currentId++,
        value: currentValue,
        difference: currentValue - initialValue,
        percentage,
        profit: monthlyInterest > 0,
      });
    }
    setinstallments(newInstallment);
    console.log(newInstallment);
  };

  const handleChangeInitialValue = (newInitialValue) => {
    setInitialValue(newInitialValue);
  };

  const handleChangeMonthlyInterest = (newMonthlyInterest) => {
    setmonthlyInterest(newMonthlyInterest);
  };

  const handleChangeMonthlyPeriod = (newMonthlyPeriod) => {
    setmonthlyPeriod(newMonthlyPeriod);
  };
  return (
    <div className="container">
      <h1 className="center-align">Desafio 3 Módulo 3</h1>
      <div className="center row">
        <Inputs
          id="1"
          type="number"
          min="100"
          max="99999"
          step="100"
          value={initialValue}
          onChangeInput={handleChangeInitialValue}
          label="Capital inicial:"
        />
        <Inputs
          id="2"
          type="number"
          min="-12"
          max="12"
          step="0.1"
          value={monthlyInterest}
          onChangeInput={handleChangeMonthlyInterest}
          label="Taxa de juros mensal:"
        />
        <Inputs
          id="3"
          type="number"
          min="1"
          max="36"
          step="1"
          value={monthlyPeriod}
          onChangeInput={handleChangeMonthlyPeriod}
          label="Período(meses):"
        />
      </div>
      <Installments>
        {installments.map((installments) => {
          return (
            <Installment key={installments.id}>{installments}</Installment>
          );
        })}
      </Installments>
    </div>
  );
}
