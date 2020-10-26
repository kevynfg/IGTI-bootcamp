import React from 'react';
import Country from './Country';

import css from '../countries/countries.module.css';

export default function Countries({ countries }) {
  return (
    <div className={`${css.flexRow} ${css.border}`}>
      {countries.map((country) => {
        return <Country key={country.id} country={country} />;
      })}
    </div>
  );
}
