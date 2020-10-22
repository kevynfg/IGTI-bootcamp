import React, { Component } from 'react';

export default class InputSalary extends Component {
    handleChange = (event) => {
        const newValue = event.target.value

        this.props.onChangeSalary(newValue)
    }
    render() {
        const { value } = this.props
        return (
            <div className="input-field col s12">
                <input
                    type="number"
                    min="0"
                    max="999999999"
                    step="100"
                    id="fullSalary"
                    style={{ fontSize: '1.4rem', fontWeight: 'bold' }}
                    onChange={this.handleChange}
                    value={value}
                />
                <label className="active" htmlFor="fullSalary">Salário bruto</label>
            </div>
        )
    }
}