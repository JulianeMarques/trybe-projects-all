export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const EXPENSE_ADD = 'EXPENSE_ADD';
export const LOADING_TYPE = 'LOADING_TYPE';
export const SUCCESS_TYPE = 'SUCCESS_TYPE';
export const ERROR_TYPE = 'ERROR_TYPE';
const URL = 'https://economia.awesomeapi.com.br/json/all'; /* requisito 7 - requisição para a API das moedas*/

export const emailLogin = (payload) => ({
  type: EMAIL_LOGIN,
  payload,
});

export const expenseAdd = (payload) => ({
  type: EXPENSE_ADD,
  payload,
});

export const successAction = (payload) => ({
  type: SUCCESS_TYPE,
  payload,
});

export const errorAction = (error) => ({
  type: ERROR_TYPE,
  payload: error,
});

export const fetchCoin = () => async (dispatch) => {  /* requisito 7 - requisição para a API das moedas*/
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    return dispatch(successAction(data));
  } catch (error) {
    return dispatch(errorAction(error.message));
  }
};

// pensar em criar um codigo para falar que a requisicao esta sendo feita com o thunk, pois usamos 3 actions - 1 para fazer requisicao, 1 para sucesso, 1 para erro
