import React, { Component } from 'react'
import Country from './Country'

import css from '../countries/countries.module.css'

export default class Countries extends Component {
    render() {
        const { countries } = this.props

        return (
            <div className={`${css.flexRow} ${css.border}`}>
                {countries.map((country) => {
                    return (
                        <Country key={country.id} country={country} />
                    )
                })}
            </div>
        )
    }
}