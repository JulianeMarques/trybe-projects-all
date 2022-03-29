const fetchPlanets = 'https://swapi-trybe.herokuapp.com/api/planets/';

const starWarsFetchPlanets = async () => {
  const apiPLanets = await fetch(fetchPlanets).then((response) => response.json());
  /* console.log(apiPLanets.results) */
  // Retorna a chave results
  return apiPLanets.results;
};

export default starWarsFetchPlanets;
