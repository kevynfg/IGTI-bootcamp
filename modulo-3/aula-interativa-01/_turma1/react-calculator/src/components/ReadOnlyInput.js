import React, { Component } from 'react';
import * as formatHelpers from '../helpers/formatHelpers';

export default class ReadOnlyInput extends Component {
  render() {
    const { label, value } = this.props;
    const id = `input${label}`;

    return (
      <div className='input-field'>
        <input
          id={id}
          type='text'
          readOnly
          value={formatHelpers.formatValue(value)}
        />
        <label htmlFor={id} className='active'>
          {label}
        </label>
      </div>
    );
  }
}
