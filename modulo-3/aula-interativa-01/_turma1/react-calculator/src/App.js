import React from 'react';

import M from 'materialize-css';

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
    description: 'Raiz Quadrada: ',
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

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      number: 1,
    };
  }

  componentDidMount() {
    M.AutoInit();
  }

  componentDidUpdate() {
    // Atualizando aba do navegador
    document.title = this.state.number;
  }

  handleValueChange = (newNumber) => {
    this.setState({ number: newNumber });
  };

  handleButtonClick = ({ target }) => {
    const { id: buttonId } = target;

    const actionFromId = ALL_ACTIONS.find((action) => action.id === buttonId);

    const newNumber = actionFromId.calculation(this.state.number);
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
              id={id}
              style={{ marginRight: '10px' }}
              key={id}
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

        <div className='input-field col s6'>
          <input id='first_name' type='text' className='validate' />
          <label htmlFor='first_name'>First Name</label>
        </div>
      </div>
    );
  }
}
