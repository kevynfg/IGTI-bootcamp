import React from 'react';
import * as api from './api/apiService';

export default function App() {
  const testapi = async () => {
    const result = await api.getAllGrades();
    console.log(result);
  };
  testapi();
  return <h1>Hello World! hi</h1>;
}
