import React, { Component } from 'react';

export default class MainInput extends Component {
  handleValueChange = ({ target }) => {
    const { onChange } = this.props;
    const number = parseInt(target.value, 10);

    onChange(number);
  };

  render() {
    const { number } = this.props;

    return (
      <div className='input-field' style={{ marginBottom: '50px' }}>
        <input
          autoFocus
          id='inputNumber'
          type='number'
          placeholder='Informe um número aqui'
          min='1'
          max='100'
          value={number}
          onChange={this.handleValueChange}
        />
        <label htmlFor='inputNumber' className='active'>
          Número principal
        </label>
      </div>
    );
  }
}
