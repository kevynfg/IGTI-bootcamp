import React, { useEffect, useState } from 'react';
import { getNewTimeStamp } from './helpers/dateTimeHelpers';

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length;
  });

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getNewTimeStamp());

    setClickArray(newClickArray);
  };

  return (
    <div>
      <h1>React com class components</h1>

      <button onClick={handleClick}>Adicionar timestamp</button>

      <ul>
        {clickArray.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
}
