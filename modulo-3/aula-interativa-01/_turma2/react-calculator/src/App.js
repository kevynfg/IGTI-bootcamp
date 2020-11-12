import React from 'react';

import ReadOnlyInput from './components/ReadOnlyInput';
import MainInput from './components/MainInput';

const ALL_CALCULATIONS = [
  {
    id: 'c1',
    description: 'Quadrado: ',
    calculation: (number) => number * number,
  },

  {
    id: 'c2',
    description: 'Raiz quadrada: ',
    calculation: (number) => Math.sqrt(number),
  },

  {
    id: 'c3',
    description: 'Fatorial: ',
    calculation: (number) => getFactorialFrom(number),
  },

  {
    id: 'c4',
    description: 'Cubo: ',
    calculation: (number) => number ** 3,
  },
];

const ALL_ACTIONS = [
  {
    id: 'a1',
    description: 'Dobrar',
    calculation: (number) => number * 2,
  },

  {
    id: 'a2',
    description: 'Triplicar',
    calculation: (number) => number * 3,
  },
];

function getFactorialFrom(number) {
  if (number <= 1) {
    return 1;
  }

  // 5 * 4 * 3 * 2 * 1

  return number * getFactorialFrom(number - 1);
}

function calculateValuesFrom(number) {
  const square = number * number;
  const squareRoot = Math.sqrt(number).toFixed(2);
  const fatorial = getFactorialFrom(number);

  return { square, squareRoot, fatorial };
}

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      number: 1,
    };
  }

  componentDidUpdate() {
    document.title = this.state.number;
  }

  handleValueChange = (newNumber) => {
    const calculations = calculateValuesFrom(newNumber);
    this.setState({ calculations, number: newNumber });
  };

  handleButtonClick = ({ target }) => {
    const { id: buttonId } = target;

    const actionFromButton = ALL_ACTIONS.find(
      (action) => action.id === buttonId
    );

    this.handleValueChange(actionFromButton.calculation(this.state.number));
  };

  render() {
    const { number } = this.state;

    return (
      <div className='container'>
        <h1 className='center'>React Calculator</h1>
        <MainInput number={number} onChange={this.handleValueChange} />

        {ALL_ACTIONS.map(({ id, description }) => {
          return (
            <button
              id={id}
              key={id}
              style={{ marginRight: '10px' }}
              className='waves-effect waves-light btn blue darken-4'
              onClick={this.handleButtonClick}
            >
              {description}
            </button>
          );
        })}

        <h2 className='center' style={{ marginBottom: '30px' }}>
          Cálculos
        </h2>

        {ALL_CALCULATIONS.map(({ id, description, calculation }) => {
          const value = calculation(number);

          return <ReadOnlyInput key={id} value={value} label={description} />;
        })}
      </div>
    );
  }
}
