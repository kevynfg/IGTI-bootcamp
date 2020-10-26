import React from 'react';

import css from '../countries/countries.module.css';

export default function Country({ country }) {
  const { flag } = country;

  return (
    <div className={`${css.country} ${css.border}`}>
      <img src={flag} className={css.flag} alt="Bandeira" />
      <span className={css.countryName}>{country.name}</span>
    </div>
  );
}
