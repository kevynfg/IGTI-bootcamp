import React, { useEffect, useState } from 'react';
import User from './User';

//import css from './counter.module.css'

export default function Users({ users }) {
  const [secondsVisible, setSecondsVisible] = useState(0);

  /* 
*
  Ativa o interval da variável e monitora a variável
  caso ela mude o estado dela 
*
*/
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsVisible(secondsVisible + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [secondsVisible]);

  return (
    <div>
      <p>Seconds visible {secondsVisible} seconds</p>
      <ul>
        {users.map((user) => {
          const { login } = user;
          return (
            <li key={login.uuid}>
              <User user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
