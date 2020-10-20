import React, { Component } from 'react';

import css from './user.module.css'
//import css from './counter.module.css'

export default class User extends Component {


    render() {
        const { login, name, picture } = this.props.user
        return (
            <div className={css.FlexRow}>
                <img className={css.avatar} src={picture.large} alt={name.first} />
                <span>{name.first}</span>
            </div>
        )
    }
}