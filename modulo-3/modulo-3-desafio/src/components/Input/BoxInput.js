import React from 'react';

export default function BoxInput({ handleBox, boxArray }) {
  const handleInputChange = (event) => {
    const newValue = event.target.value;

    handleBox(newValue);
  };
  return (
    <div className="input-field">
      <input
        style={{ width: '100px' }}
        type="number"
        placeholder="Quantidade de caixas"
        min="0"
        max="99"
        step="1"
        value={boxArray}
        onChange={handleInputChange}
      />
      <label className="active" htmlFor="inputBox">
        Parcelas:
      </label>
    </div>
  );
}
