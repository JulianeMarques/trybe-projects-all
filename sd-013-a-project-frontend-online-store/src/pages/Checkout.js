import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CheckoutInputs from '../components/CheckoutInputs';
import CartListItems from '../components/CartListItems';
import './checkout.css';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      purchaseList: [],
      // empty: true,
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  // Função responsável por capturar a lista de itens do carrinho e atribuir ao estado
  getLocalStorage = () => {
    const localCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');

    if (localCart.length > 0) {
      this.setState({
        // empty: false,
        purchaseList: localCart,
      });
    }
  }

  // Função responsável por remover um produto do carrinho.
  unshowProduct = (deleted) => {
    const { purchaseList } = this.state;
    const stillInCart = purchaseList.filter((item) => item.id !== deleted);
    this.setState({
      purchaseList: stillInCart,
    });
    if (!purchaseList[1]) {
      this.setState({
        // empty: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    this.setState({
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      purchaseList: '',
      // empty: true,
    });
  }

  render() {
    // const { state } = this;
    const { fullname, email, cpf, phone, cep, address } = this.state;
    const { purchaseList } = this.state;

    return (
      <main>
        <CartListItems
          purchaseList={ purchaseList }
          unShow={ this.unshowProduct }
          updateLocal={ this.getLocalStorage }
        />
        <form onSubmit={ this.submitForm }>
          <CheckoutInputs
            onChange={ this.handleChange }
            fullname={ fullname }
            email={ email }
            cpf={ cpf }
            phone={ phone }
            cep={ cep }
            address={ address }
          />
          <button type="submit" className="formButton">
            <Link to="/">Confirmar Pagamento </Link>
          </button>
        </form>
      </main>
    );
  }
}

export default Checkout;
