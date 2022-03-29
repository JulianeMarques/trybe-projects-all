const ENDPOINT_CATEGORIA = 'https://api.mercadolibre.com/sites/MLB/categories';
const ENDPOINT_TERMO = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const ENDPOINT_ID = 'https://api.mercadolibre.com/sites/MLB/search?category=';

export async function getCategories() {
  const requisicao = await (await fetch(ENDPOINT_CATEGORIA)).json();
  return requisicao;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let response;
  if (!categoryId && query) response = await fetch(`${ENDPOINT_TERMO}${query}`);
  if (categoryId && !query) response = await fetch(`${ENDPOINT_ID}${categoryId}`);
  response = await fetch(`${ENDPOINT_ID}${categoryId}&q=${query}`);

  const jsonResponse = response.json();

  return jsonResponse;
}
