import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import starWarsFetchPlanets from '../services/starWarsFetchAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]); // retorno da api
  const [name, setName] = useState(''); // para guardar o nome no input
  const [filteredPlanet, setFilteredPlanet] = useState([]); // funcao de filtrar nome
  const [theColumns, setTheColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filteredColumns, setFilteredColumns] = useState([]);

  // funcao para pegar os dados da API
  useEffect(() => {
    /* console.log(starWarsFetchPlanets()); */
    const fetchRequest = async () => {
      setData(await starWarsFetchPlanets());
    };
    fetchRequest();
  }, []);

  useEffect(() => {

  }, []);

  // requisito 3 - ao clicar no botao Filtrar!
  // funcao para filtrar as categorias dos valores numericos
  function handleClick(column, comparison, value) {
    setFilteredPlanet(
      data.filter((planet) => {
        if (comparison === 'maior que') {
          // console.log(planet[column] > parseInt(value, 10))
          return planet[column] > parseInt(value, 10);
          // https://stackoverflow.com/questions/6611824/why-do-we-need-to-use-radix-parameter-when-calling-parseint
        }
        if (comparison === 'menor que') {
          return planet[column] < parseInt(value, 10);
        }
        return planet[column] === value;
      }),
    );
    // eu seto o estado das colunas quando eles pegam o item que nao eh igual a coluna
   /*  setTheColumns(
      theColumns.filter((item) => item !== column),
    ); */

    setFilteredColumns(
      theColumns.filter((item) => item !== column && item.length === 5)
    );

    // inicio requisito 5
    const filterResult = `<div data-testid='filter'>
    Filtro: ${column} ${comparison} ${value} <button>x</button></div>`;
    const containerInput = document.querySelector('.container');
    containerInput.insertAdjacentHTML('beforeend', filterResult);
  }

  /* requisito 5 - - Adiciona um filtro e verifica se a tabela foi atualizada com as informações filtradas, depois remove o filtro e verifica se os valores da tabela voltaram ao original.
- Adiciona dois filtros e verifica se a tabela foi atualizada com as informações filtradas, depois remove os filtros e verifica se os valores da tabela voltaram ao original. */

  // console.log(savedFilters);

  // utilizada no TableInputs
  function handleChange(event) {
    setName(event.target.value);
    // chamando a funcao abaixo
    // console.log(name);
  }

  // para poder tratar o filtro a partir do estado name, se vai ser executada se o estado for alterado
  useEffect(() => {
    function planetSearch() {
      const result = data.filter((planet) => planet.name.toLowerCase()
        .includes(name.toLowerCase()));
        // console.log(name);
      setFilteredPlanet(result);
    }
    planetSearch();
  }, [data, name]); // se eu adcionar um filtro no meu planetSearch, preciso pensar na dependencia filterByNumericValues

  const planetValue = {
    data,
    setData,
    setName,
    filterByName: {
      name,
    },
    handleChange,
    filteredPlanet,
    setFilteredPlanet,
    handleClick,
    filteredColumns,
    setFilteredColumns,
    theColumns,
    setTheColumns,
  };

  return (
    <PlanetsContext.Provider value={ planetValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};

export default PlanetsProvider;
