import React from 'react';

export default function Installment(props) {
  const { id, label, value, onChangeInput, min, max, step } = props;
  const handleChangeInput = (event) => {
    onChangeInput(+event.target.value);
  };

  return (
    <div className="input-field">
      <input
        style={{ width: '100px' }}
        id={id}
        type="number"
        placeholder="Quantidade de caixas"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChangeInput}
      />
      <label className="active" htmlFor={id}>
        {label}:
      </label>
    </div>
  );
}
