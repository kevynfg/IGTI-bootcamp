import React, { Component } from 'react';
import User from './User';

//import css from './counter.module.css'

export default class Users extends Component {
    constructor() {
        super()

        this.state = {
            secondsVisible: 0
        }
    }
    componentDidMount() {

        this.interval = setInterval(() => {
            const { secondsVisible } = this.state
            this.setState({
                secondsVisible: secondsVisible + 1
            })
        }, 1000);
    }

    componentDidUpdate() {
        console.log('DidUpdate de Users.js')
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { users } = this.props
        const { secondsVisible } = this.state
        return (
            <div>
                <p>Seconds visible {secondsVisible} seconds</p>
                <ul>
                    {users.map((user) => {
                        const { login } = user
                        return (
                            <li key={login.uuid}>
                                <User user={user} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}