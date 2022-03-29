import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TableInputs() {
  const { filterByName: { name },
    handleChange,
    handleClick,
    theColumns } = useContext(PlanetsContext);
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

  return (
    <div className="container">
      <label htmlFor="planet-name">
        Nome do Planeta:
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Planet"
          name="name-filter"
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
          {theColumns.map((columns, index) => (
            <option key={ index }>{ columns }</option>
          ))}
          ;
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

export default TableInputs;
