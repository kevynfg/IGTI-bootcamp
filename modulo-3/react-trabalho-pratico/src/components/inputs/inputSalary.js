import React, { Component } from 'react';

export default class inputSalary extends Component {
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
                    onChange={this.handleChange}
                    value={value} >test</input>

            </div>
        )
    }
}