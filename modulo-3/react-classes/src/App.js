import React, { Component } from 'react';
import ProjetoBase from './components/ProjetoBase/ProjetoBase'
import { getNewTimeStamp } from './helpers/dateTimeHelpers'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      clickArray: [],
    }
  }

  handleClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray);
    newClickArray.push(getNewTimeStamp())

    this.setState({ clickArray: newClickArray })
  }

  render() {
    const { clickArray } = this.state

    return <div>
      <h1>React com class components</h1>

      <button onClick={this.handleClick}>Adicionar timestamp</button>

      <ul>
        {clickArray.map((item) => {
          return <li>{item}</li>
        })}
      </ul>
    </div>
  }
}


