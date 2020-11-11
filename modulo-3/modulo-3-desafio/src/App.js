import React, { useState } from 'react';
import Form from './components/Form/Form';
import BoxInput from './components/Input/BoxInput';
import Installment from './components/Input/Installment';
import Installments from './components/Input/Installments';

export default function App() {
  const [initialValue, setInitialValue] = useState(1000);
  const [monthlyInterest, setmonthlyInterest] = useState(1);
  const [monthlyPeriod, setmonthlyPeriod] = useState(12);
  const [Installment, setInstallment] = useState([]);
  const [countBoxes, setCountBoxes] = useState('');

  const handleBoxChange = (newValue) => {
    setCountBoxes(newValue);
  };

  return (
    <div className="container">
      <h1 className="center-align">Desafio 3 Módulo 3</h1>
      <div>
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>
    </div>
  );
}
