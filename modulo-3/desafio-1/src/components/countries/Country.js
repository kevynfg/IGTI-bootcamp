import React, { Component } from 'react'

import css from '../countries/countries.module.css'

export default class Country extends Component {
    render() {
        const { country } = this.props
        const { name, flag } = country

        return <div className={`${css.country} ${css.border}`}>
            <img src={flag} className={css.flag} alt="Bandeira" />
            <span className={css.countryName}>{country.name}</span>
        </div>
    }
}