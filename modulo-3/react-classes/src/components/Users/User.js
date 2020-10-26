import React from 'react';

import css from './user.module.css';
//import css from './counter.module.css'

export default function User({ user }) {
  const { name, picture } = user;
  return (
    <div className={css.FlexRow}>
      <img className={css.avatar} src={picture.large} alt={name.first} />
      <span>{name.first}</span>
    </div>
  );
}
