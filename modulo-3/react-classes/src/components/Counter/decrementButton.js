import React from 'react';

// import { Container } from './styles';

export default function DecrementButton({ onDecrement }) {
  const handleButtonClick = () => {
    onDecrement('-');
  };

  return (
    <button
      onClick={handleButtonClick}
      className="waves-effect waves-light btn red darken-4"
    >
      -
    </button>
  );
}
