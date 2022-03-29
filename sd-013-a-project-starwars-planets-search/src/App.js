import React from 'react';
import Table from './components/Table';
import './App.css';
import TableFilterInput from './components/TableFilterInput';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <h1>Star Wars Planet Search</h1>
      <TableFilterInput />
      <Table />
    </PlanetsProvider>
  );
}

export default App;

