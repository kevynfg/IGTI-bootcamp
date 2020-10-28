import React, { useState } from 'react';

//import css from './counter.module.css'

const BAND_MEMBERS = [
  {
    id: 1,
    name: 'Chorão',
    instrument: 'Vocalista',
  },
  {
    id: 2,
    name: 'Champignon',
    instrument: 'Baixo',
  },
  {
    id: 3,
    name: 'Marcão',
    instrument: 'Guitarra',
  },
];

export default function Band() {
  const [bandMembers, setBandMembers] = useState(BAND_MEMBERS);
  const [bandName, setBandName] = useState('Charlie Brown Jr.');
  return (
    <div>
      <h4>{bandName}</h4>
      {bandMembers.map(({ id, name, instrument }) => {
        return (
          <li key={id}>
            {name} - {instrument}
          </li>
        );
      })}
    </div>
  );
}
