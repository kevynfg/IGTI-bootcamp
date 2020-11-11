import React from 'react';

export default function Installment(props) {
  const { id, label, value, onChangeInput, min, max, step } = props;
  const handleChangeInput = (event) => {
    onChangeInput(+event.target.value);
  };

  return (
    <div className="col input-field s6 m4 l4">
      <input
        id={id}
        type="number"
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
