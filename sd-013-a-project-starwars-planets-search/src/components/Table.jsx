import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, name } = useContext(PlanetsContext);

  if (!data.length) return <p> Loading ... </p>;

  /* para o filtro by numeric values pensar em condicionais
  e
  eh possivel criar uma funcao que passa os filtros dentro dela mesma e passa os array filtrados - retornar um array filtrado
  */
  const planetsData = () => data.filter((planet) => (
    planet.name.toLowerCase()
      .includes(name.toLowerCase())))
    .map((planet) => (
      <tr key={ planet.name }>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>{planet.films}</td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>{planet.url}</td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          {/* header da tabela */}
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Create</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {/* {console.log(data)} */}
          {/* infos de tabela em => https://www.w3schools.com/tags/tag_th.asp */}
          {planetsData()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
