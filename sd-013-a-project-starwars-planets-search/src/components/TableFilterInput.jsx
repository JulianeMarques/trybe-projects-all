import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

function TableFilterInput() {
  const { name, handleChange, handleClick } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  function handeColumn(event) {
    setColumn(event.target.value);
  }

  function handleComparison(event) {
    setComparison(event.target.value);
  }

  function handleValue(event) {
    setValue(event.target.value);
  }

  // Realizado com a ajuda do aluno Thalles Carneiro turma 12
  return (
    <div>
      <label htmlFor="planet-name">
        Nome do Planeta:
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Planet"
          value={ name }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="column">
        Colunas:
        <select
          value={ column }
          onChange={ handeColumn }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        Comparacao:
        <select
          value={ comparison }
          onChange={ handleComparison }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor:
        <input
          value={ value }
          onChange={ handleValue }
          type="number"
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        /* necessario utilizar os parametros */
        onClick={ () => handleClick(column, comparison, value) }
      >
        Filtrar!
      </button>
    </div>
  );
}

TableFilterInput.propTypes = {
  handleChange: PropTypes.func,
};

export default TableFilterInput;