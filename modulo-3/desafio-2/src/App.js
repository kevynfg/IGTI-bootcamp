import React, { useEffect, useState } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [AllCountries, setAllCountries] = useState([]);
  const [filteredCountries, setfilteredCountries] = useState([]);
  const [FilteredPopulation, setFilteredPopulation] = useState(0);
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      let allCountries = await res.json();
      allCountries = allCountries.map(
        ({ name, numericCode, flag, population }) => {
          return {
            id: numericCode,
            name,
            filteredName: name.toLowerCase(),
            flag,
            population,
          };
        }
      );
      setAllCountries(allCountries);
      /*Copia e armazena os Countries em um vetor diferente
        para não dar conflito ao alterar o AllCountries
        e alterar o filteredCountries junto */
      setfilteredCountries(Object.assign([], allCountries));
    };

    getCountries();
  }, []);

  const calculatePopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);

    return totalPopulation;
  };

  const handleChangeFilter = (newText) => {
    setUserFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = AllCountries.filter((country) => {
      return country.filteredName.includes(filterLowerCase);
    });

    const FilteredPopulation = calculatePopulationFrom(filteredCountries);

    setfilteredCountries(filteredCountries);
    setFilteredPopulation(FilteredPopulation);
  };

  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React All Countries</h1>
      <Header
        filter={userFilter}
        countryCount={filteredCountries.length}
        totalPopulation={FilteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
