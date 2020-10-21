import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
    constructor() {
        super()

        this.state = {
            AllCountries: [],
            filteredCountries: [],
            FilteredPopulation: 0,
            filter: ''
        }
    }

    async componentDidMount() {
        const res = await fetch('https://restcountries.eu/rest/v2/all')
        const json = await res.json()

        const AllCountries = json.map(({ name, numericCode, flag, population }) => {
            return {
                id: numericCode,
                name,
                filteredName: name.toLowerCase(),
                flag,
                population
            }
        })

        const FilteredPopulation = this.calculatePopulationFrom(AllCountries)

        this.setState({
            AllCountries,
            filteredCountries: Object.assign([], AllCountries),
            FilteredPopulation
        })
    }

    calculatePopulationFrom = (countries) => {
        const totalPopulation = countries.reduce((accumulator, current) => {
            return accumulator + current.population
        }, 0)

        return totalPopulation
    }

    handleChangeFilter = (newText) => {
        this.setState({
            filter: newText
        })

        const filterLowerCase = newText.toLowerCase()

        const filteredCountries = this.state.AllCountries.filter((country) => {
            return country.filteredName.includes(filterLowerCase)
        })

        const FilteredPopulation = this.calculatePopulationFrom(filteredCountries)

        this.setState({
            filteredCountries,
            FilteredPopulation
        })

    }

    render() {
        const { filteredCountries, filter, FilteredPopulation } = this.state

        return (
            <div className="container">
                <h1>React All Countries</h1>
                <Header
                    filter={filter}
                    countryCount={filteredCountries.length}
                    totalPopulation={FilteredPopulation}
                    onChangeFilter={this.handleChangeFilter} />
                <Countries countries={filteredCountries} />
            </div>
        )
    }
}
