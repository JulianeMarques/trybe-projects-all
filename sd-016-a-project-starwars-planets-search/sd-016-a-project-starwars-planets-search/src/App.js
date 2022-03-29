import React from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import TableInputs from './components/TableInputs';

function App() {
  return (
    <PlanetsProvider>
      <h1>Star Wars Planet Search</h1>
      <TableInputs />
      <br />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
