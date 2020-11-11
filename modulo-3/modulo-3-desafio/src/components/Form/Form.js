import React from 'react';
import css from './form.module.css';

export default function Form({ children }) {
  return <div className={css.flexRow}>{children}</div>;
}
