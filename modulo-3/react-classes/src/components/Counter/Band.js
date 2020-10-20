import React, { Component } from 'react';

//import css from './counter.module.css'

export default class Band extends Component {
    constructor() {
        super()

        this.state = {
            BandName: 'Charlie Brown Jr.',

            bandMembers: [
                {
                    id: 1,
                    name: 'Chorão',
                    instrument: 'Vocalista'
                },
                {
                    id: 2,
                    name: 'Champignon',
                    instrument: 'Baixo'
                },
                {
                    id: 3,
                    name: 'Marcão',
                    instrument: 'Guitarra'
                }
            ]
        }
    }
    render() {
        const { bandName, bandMembers } = this.state
        return (
            <div>
                <h4>{bandName}</h4>
                {bandMembers.map(({ id, name, instrument }) => {
                    return (
                        <li key={id}>
                            {name} - {instrument}
                        </li>
                    )
                })}
            </div>
        )
    }
}