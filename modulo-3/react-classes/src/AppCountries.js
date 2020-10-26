import React, { Component } from 'react';
import Toggle from './components/Toggle/Toggle';
import Users from './components/Users/Users';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false,
    };
  }

  async componentDidMount() {
    const res = await fetch(
      'https://randomuser.me/api/?seed=javascript&results=10&nat=BR&noinfo'
    );

    const json = await res.json();

    this.setState({
      users: json.results,
    });
  }

  handleShowUsers = (isChecked) => {
    this.setState({
      showUsers: isChecked,
    });
  };

  componentDidUpdate() {
    console.log('DidUpdate');
  }

  componentWillUnmount() {
    console.log('Unmount');
  }

  render() {
    const { showUsers, users } = this.state;
    //console.log(showUsers)
    return (
      <div>
        <h3>React LifeCycle</h3>
        <Toggle
          description="Mostrar usuários: "
          enabled={showUsers}
          onToggle={this.handleShowUsers}
        />
        <hr />

        {
          //Se showUsers for verdadeiro, mostra os usuários ->
          showUsers && (
            <div>
              <Users users={users} />
            </div>
          )
        }
      </div>
    );
  }
}
