import React, { Component } from 'react';
import { calculateSalaryFrom } from '../src/components/helpers/salary';
import InputReadOnly from './components/inputs/InputReadOnly';
import InputSalary from './components/inputs/InputSalary';
import ProgressBarSalary from './components/ProgressBarSalary/ProgressBarSalary';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
      results: {},
    };
  }

  componentDidMount() {
    const { fullSalary } = this.state;
    this.setState({
      results: calculateSalaryFrom(fullSalary),
    });
    console.log('Cálculo de salário efetuado!', this);
  }

  handleChangeSalary = (fullSalary) => {
    this.setState({
      fullSalary: fullSalary,
      results: calculateSalaryFrom(fullSalary),
    });
  };

  render() {
    const {
      fullSalary,
      results: { baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary },
    } = this.state;
    const bar1 = (discountINSS / baseINSS) * 100;
    const bar2 = (discountIRPF / baseINSS) * 100;
    const bar3 = 100 - (bar1 + bar2);

    return (
      <div className="container">
        <h3 className="center-align">Cálculo de Salário</h3>
        <div className="row">
          <div className="col s12">
            <InputSalary
              value={fullSalary}
              onChangeSalary={this.handleChangeSalary}
            />

            <InputReadOnly id="1" value={baseINSS} label="Base INSS" />
            <InputReadOnly
              id="2"
              value={discountINSS}
              label="Desconto INSS"
              color="#e67e22"
            />
            <InputReadOnly id="3" value={baseIRPF} label="Base IRPF" />
            <InputReadOnly
              id="4"
              value={discountIRPF}
              label="Desconto IRPF"
              color="#c0392b"
            />
            <InputReadOnly
              id="5"
              value={netSalary}
              label="Salário líquido"
              color="#16a085"
            />
            <div className="row">
              <ProgressBarSalary bar1={bar1} bar2={bar2} bar3={bar3} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
