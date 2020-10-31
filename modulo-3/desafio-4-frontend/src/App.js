import React, { useEffect, useState } from 'react';
import * as api from './api/apiService';
import GradesControl from './components/GradesControl';
import ModalGrade from './components/ModalGrade';
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

  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await api.deleteGrade(gradeToDelete);

    if (isDeleted) {
      //Busca o index do item que foi deletado
      const deletedGradeIndex = allGrades.findIndex((grade) => {
        return grade.id === gradeToDelete.id;
      });

      //Cria um novo objeto e atribui as grades
      //altera para Deletado e zera o valor da nota
      const newGrades = Object.assign([], allGrades);
      newGrades[deletedGradeIndex].isDeleted = true;
      newGrades[deletedGradeIndex].value = 0;

      setAllGrades(newGrades);
    }
  };

  const handlePersist = (grade) => {
    setSelectedGrade(grade);
    setisModalOpen(true);
  };

  return (
    <div>
      <h1 className="center">Controle de notas</h1>
      {allGrades.length === 0 && <Spinner></Spinner>}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}

      {isModalOpen && <ModalGrade />}
    </div>
  );
}
