import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="valor"> {/* requisito 6 */}
          Valor
          <input type="text" name="valor" id="valor" />
        </label>
        <label htmlFor="descricao"> {/* requisito 6 */}
          Descrição
          <input type="text" name="descricao" id="descricao" />
        </label>
        <label htmlFor="moeda"> {/* requisito 6 */}
          Moeda
          <select name="moeda" id="moeda"> {/* requisito 6 */}
            <option value="0">0</option>
          </select>
        </label>
        <label htmlFor="pagamento"> {/* requisito 6 */}
          Método de pagamento
          <select name="pagamento" id="pagamento"> {/* requisito 6 */}
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de Débito"> Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="gastos"> {/* requisito 6 */}
          Tag
          <select name="pagamento" id="gastos"> {/* requisito 6 */}
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>

    );
  }
}

export default Form;
