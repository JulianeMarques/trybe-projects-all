import React from 'react';
// Importa o connect para realizar a conexão entre o mapStateToProps e o mapDispatchToProps
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import SelectCoin from '../components/SelectCoin';
import SelectPay from '../components/SelectPay';
import SelectTag from '../components/SelectTag';
import { fetchCoin, expenseAdd } from '../actions';
import Button from '../components/Button';
import './Wallet.css';

// requisito 4 - criacao deste componente Wallet
class Wallet extends React.Component {
  constructor(props) { /* Preenche a tabela com os dados retornados */
    super(props);
    // State inicial vai ser as chaves abaixo:
    this.state = {
      expenses: [],
      expense: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD', // moeda
        method: 'Dinheiro', // método de pagamento
        tag: 'Alimentação', // tipo de expense/despesa
      },
      total: 0,
    };
    this.handleChange = this.handleChange.bind(this); // Conforme for digitando os campos são guardados na state
    this.handleNextExpense = this.handleNextExpense.bind(this); // Tudo que for digitado nos campos, é alterado automaticamente na state
    this.setCoinsState = this.setCoinsState.bind(this);
  }

  componentDidMount() {
    this.setCoinsState(); // aplica esta funcao a renderizacao da pagina
  }

  async setCoinsState() {
    const { getCoins } = this.props; // descontroi o getCoins
    await getCoins(); // aguarda para executar a funcao
    const { wallet } = this.props; // descontroi o wallet
    const { currencies } = wallet; // descontroi p currencies 
    const idexpens = this.state;
    const { id, method, currency, tag } = idexpens.expense;
    // State inicial vai ser as chaves abaixo atraves da func assincrona acima
    this.setState(() => ({
      expense: {
        id,
        method,
        currency,
        tag,
        exchangeRates: {
          ...currencies,
        },
      },
    }));
  }

  setValue() { // Tudo que for digitado nos campos, é alterado automaticamente na state
    const { expense, total } = this.state;
    const { exchangeRates, currency } = expense;
    const array = Object.entries(exchangeRates);
    function select(coin) {
      if (coin[0] === currency) { // se a moeda for igual a currency va retornar a moeda utilizada
        return coin; 
      }
    }
    const selected = Object.values(array.filter(select)); // filtra o array de expenses
    const selected2 = Object.values(selected[0]);
    const { ask } = selected2[1];
    const convert = expense.value * ask;
    this.setState(() => ({
      total: (Number(total, 0) + Number(convert, 0)).toFixed(2), // permite 2 numeros apos a virgula dos valores
    }));
  }

  handleChange(e) { 
    // Tudo que for digitado nos campos, é alterado automaticamente na state
    // Conforme for digitando os campos são guardados na state
    const { expense } = this.state;
    const { name } = e.target;
    const { value } = e.target;
    this.setState(() => ({
      expense: {
        ...expense,
        [name]: value,
      },
    }));
  }

  handleNextExpense() { /* requisito 8  */ // Tudo que for digitado nos campos, é alterado automaticamente na state
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { getCoins } = this.props;
    getCoins();
    const { expense, expenses } = this.state;
    const { changeValue } = this.props;
    this.setState(() => ({ /*  requisito 8 - Os valores dos campos devem ser salvos no estado da aplicação, na chave expenses, dentro de um array contendo todos gastos que serão adicionados */
      expense: {
        ...expense, /* sava na chave expenses */
        id: expense.id + 1, /* id numeros sequenciais */
        exchangeRates: {
          ...currencies, /*  cotacao de cambio feito no momento da adicao */
        },
      },
    }));
    expenses.push(expense); /* atualiza o total das despesas */
    changeValue(expenses); /* atualiza o total das despesas */
    this.setValue(); /* atualiza o total das despesas */
  }

  render() {
    const { handleChange, handleNextExpense } = this;
    const { total } = this.state;
    const { user } = this.props;
    const { email } = user;
    return (
      <div>
        <header className="email-field" data-testid="email-field">
          <span>
            { email }
          </span>
          <div className="trybewallet">
            <span>
              Trybe Wallet
            </span>
          </div>
        </header>
        <div className="menu">
        <div className="total-field" data-testid="total-field">
          Total:
          {' '}
          { total }
        </div>
        <div className="header-currency-field" data-testid="header-currency-field">
          Resultados em reais (BRL)
        </div>
        </div>
        <form className="form">
          <Input
            id="valor"
            label="Valor"
            onChange={ handleChange }
            name="value"
            type="number"
          />
          <Input
            label="Descrição"
            onChange={ handleChange }
            name="description"
          />
          <SelectCoin
            onChange={ handleChange }
          />
          <SelectPay
            onChange={ handleChange }
          />
          <SelectTag onChange={ handleChange } />
          <Button name="Adicionar despesa" onClick={ handleNextExpense } /> {/* requisito 8 */}
        </form>
      </div>
    );
  }
}

// A função mapStateToProps mapeia as states armazenadas na store para uma props
const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

// A função do mapDispatchToProps é despachar action para a store, com a finalidade de alterar o state da aplicação
const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(fetchCoin()),
  changeValue: (state) => dispatch(expenseAdd(state)),
});

Wallet.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  getCoins: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  wallet: PropTypes.objectOf(PropTypes.string).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
