import React, { useEffect, useState } from 'react';
import * as api from './api/apiService';
import GradesControl from './components/GradesControl';
import Spinner from './components/Spinner';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setisModalOpen] = useState(false);

  /* carrega dados da api */
  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };

    getGrades();
  }, []);

  return (
    <div>
      <h1 className="center">Controle de notas</h1>
      {allGrades.length == 0 && <Spinner></Spinner>}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          // onDelete={handDelete}
          // onPersist={handlePersist}
        />
      )}
    </div>
  );
}
