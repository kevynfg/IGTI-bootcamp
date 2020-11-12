import React from 'react';

import ReadOnlyInput from './components/ReadOnlyInput';
import MainInput from './components/MainInput';

import * as mathHelpers from './helpers/mathHelpers';

const ALL_CALCULATIONS = [
  {
    id: 'c1',
    description: 'Quadrado: ',
    calculation: (number) => number ** 2,
  },

  {
    id: 'c2',
    description: 'Raiz Quadrada: ',
    calculation: (number) => Math.sqrt(number),
  },

  {
    id: 'c3',
    description: 'Fatorial: ',
    calculation: (number) => mathHelpers.getFactorialFrom(number),
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
    description: 'Dobrar input',
    calculation: (number) => number * 2,
  },

  {
    id: 'a2',
    description: 'Triplicar input',
    calculation: (number) => number * 3,
  },
];

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      number: 1,
    };
  }

  handleValueChange = (newNumber) => {
    this.setState({ number: newNumber });
  };

  handleButtonClick = ({ target }) => {
    const buttonId = target.id;

    // prettier-ignore
    const actionCalculation = 
      ALL_ACTIONS.find((item) => item.id === buttonId);

    const { number } = this.state;

    const newNumber = actionCalculation.calculation(number);
    this.setState({ number: newNumber });
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
              key={id}
              id={id}
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

          return (
            <ReadOnlyInput
              key={id}
              id={`input${id}`}
              label={description}
              value={value}
            />
          );
        })}
      </div>
    );
  }
}
