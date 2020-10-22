import React, { Component } from 'react';
import { calculateSalaryFrom } from '../src/components/helpers/salary';
import inputSalary from './components/inputs/inputSalary';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      fullSalary: 1000,
      results: {}
    }
  }

  componentDidMount() {

  }


  render() {
    const { fullSalary } = this.state

    return (
      <div className="container">
        <h1 className="center-align">Hello world</h1>
        <div className="row">
          <div className="col s12">
            <inputSalary></inputSalary>
          </div>
        </div>
      </div >
    )
  }
}
