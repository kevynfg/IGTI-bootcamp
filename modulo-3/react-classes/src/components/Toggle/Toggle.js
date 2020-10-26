import React from 'react';

//import css from './counter.module.css'

export default function Toggle({ onToggle, enabled, description }) {
  const handleChange = (event) => {
    const isChecked = event.target.checked;

    onToggle(isChecked);
  };

  return (
    <div className="switch">
      <label>
        {description}
        <input type="checkbox" checked={enabled} onChange={handleChange} />
        <span className="lever"></span>
      </label>
    </div>
  );
}
