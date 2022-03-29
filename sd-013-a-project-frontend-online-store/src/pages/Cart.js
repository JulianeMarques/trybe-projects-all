import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartListItems from '../components/CartListItems';

// imports ends ----------------------------------------------------------------

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Estado responsável por dizer se o carrinho está vazio ou não
      empty: true,
      // Estado que captura do localStorage a lista de itens do carrinho
      purchaseList: '',
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
        empty: false,
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
        empty: true,
      });
    }
  }

  render() {
    const { purchaseList, empty } = this.state;

    // Caso o carrinho esteja vazio!
    const notCarts = (
      <div>
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
      </div>
    );

    const cardsFound = (
      <div>
        <CartListItems
          purchaseList={ purchaseList }
          unShow={ this.unshowProduct }
          updateLocal={ this.getLocalStorage }
        />
        <Link
          to="/checkout"
          data-testid="checkout-products"
        >
          Finalizar Compra
        </Link>
      </div>
    );

    return (
      (empty ? notCarts : cardsFound)
    );
  }
}

export default Cart;
