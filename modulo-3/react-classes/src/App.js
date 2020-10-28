import React, { useEffect, useState } from 'react';
import Toggle from './components/Toggle/Toggle';
import Users from './components/Users/Users';

export default function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        'https://randomuser.me/api/?seed=javascript&results=10&nat=BR&noinfo'
      );
      const json = await res.json();
      setUsers(json.results);
    };

    fetchUsers();
  }, []);

  const handleShowUsers = (isChecked) => {
    setShowUsers(isChecked);
  };

  return (
    <div>
      <h3>React LifeCycle</h3>
      <Toggle
        description="Mostrar usuários: "
        enabled={showUsers}
        onToggle={handleShowUsers}
      />
      <hr />

      {
        //Se showUsers for verdadeiro, mostra os usuários ->
        showUsers && (
          <div>
            <Users users={users} />
          </div>
        )
      }
    </div>
  );
}
