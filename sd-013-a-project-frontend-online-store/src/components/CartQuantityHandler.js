import React, { Component } from 'react';
import PropTypes from 'prop-types';
import removeCartIcon from '../images/remove_shopping_cart_black_24dp.svg';
import './cartQuantityHandler.css';

// imports ends ----------------------------------------------------------------

class CartQuantityHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0,
      preco: 0,
      max: 0,
    };
  }

  componentDidMount() {
    this.shoppingCarttCalculator('start');
  }

  // Função principal deste arquivo
  shoppingCarttCalculator = (input) => {
    // Props são uma função que desabilita o componente no Cart e no ProductDetails, e o ID do produto
    const { unShow, updateLocal, id } = this.props;
    const storageCart = JSON.parse(localStorage.getItem('shoppingCart'));

    // O produto atual fica armazenado na const thisProduct
    const thisProduct = storageCart.find((item) => item.id === id);

    if (input === 'start' && thisProduct) {
      const { cartQuantity, preco, max } = thisProduct;
      // Inicia o estado do componente
      this.setState({
        quantity: cartQuantity,
        max,
        preco,
      });

      // Validação que verifica se o botão de somar deve ser renderizado ou não
      if (max > cartQuantity) {
        console.log(thisProduct.max);
        this.setState({
          add: true,
        });
      } else {
        this.setState({
          add: false,
        });
      }
    }

    // Acionamento da função de subtração
    if (input === 'subt') {
      this.subtraction(thisProduct, storageCart, updateLocal);
    }

    // Acionamento da função de adição
    if (input === 'add') {
      this.addition(thisProduct, storageCart, updateLocal);
    }

    // Acionamento da função de remoção do componente
    if (input === 'anihilation') {
      this.totalAnihilation(storageCart, updateLocal, unShow, id);
    }
  }

  // Função de remoção do componente
  totalAnihilation = (storageCart, updateLocal, unShow, id) => {
    const maintained = storageCart.filter((item) => item.id !== id);
    localStorage.setItem('shoppingCart', JSON.stringify(maintained));
    unShow(id);
    updateLocal();
  }

  // Função de subtração da quantidade de um mesmo produto do carrinho
  subtraction = (thisProduct, storageCart, updateLocal) => {
    const { cartQuantity, price } = thisProduct;

    const newQuantity = cartQuantity - 1;
    const newPreco = newQuantity * price;

    this.setState({
      quantity: newQuantity,
      preco: newPreco,
      add: true,
    });

    // Se a quantidade no carrinho for igual a 0, então remove o elemento do carrinho
    if (newQuantity === 0) {
      this.shoppingCarttCalculator('anihilation');
    } else {
      // Salva a alteração no shoppingCart do LocalStorage
      thisProduct.cartQuantity -= 1;
      thisProduct.preco = thisProduct.price * thisProduct.cartQuantity;
      localStorage.setItem('shoppingCart', JSON.stringify(storageCart));
      updateLocal();
    }
  }

  // Função de adição da quantidade de um mesmo produto do carrinho
  addition = (thisProduct, storageCart, updateLocal) => {
    const { cartQuantity, price, max } = thisProduct;

    // Se a quantidade no carrinho for maior que o estoque, desabilita o botão e mostra o preço final.
    if (cartQuantity === max) {
      const newPreco = cartQuantity * price;
      this.setState({
        add: false,
        quantity: cartQuantity,
        preco: newPreco,
      });
    }

    // Se a quantidade no carrinho for menor que o estoque, adiciona mais 1 e aumenta o preço.
    if (cartQuantity < max) {
      const newQuantity = cartQuantity + 1;
      const newPreco = newQuantity * price;

      this.setState({
        quantity: newQuantity,
        preco: newPreco,
      });

      // Salva a alteração no shoppingCart do LocalStorage
      thisProduct.cartQuantity += 1;
      thisProduct.preco = thisProduct.price * thisProduct.cartQuantity;
      localStorage.setItem('shoppingCart', JSON.stringify(storageCart));
      updateLocal();
    }
  }

  // Função acionada quando o botão de reduzir quantidade no carrinho é pressionado
  reduceCardQuantity = () => {
    const { quantity } = this.state;

    if (quantity > 0) {
      this.shoppingCarttCalculator('subt');
    }
  }

  // Função acionada quando o botão de aumentar quantidade no carrinho é pressionado
  increaseCartQuantity = () => {
    const { quantity, max } = this.state;

    if (quantity >= max - 1) {
      this.setState({
        add: false,
      });
    }
    if (quantity < max) {
      this.shoppingCarttCalculator('add');
    }
  }

  render() {
    const { preco, quantity, add } = this.state;
    // Botão de adicionar habilitado
    const buttonAdd = (
      <button
        type="button"
        className="handleQuantityButton add"
        data-testid="product-increase-quantity"
        onClick={ this.increaseCartQuantity }
      >
        +
      </button>
    );

    // Botão de adicionar desabilitado
    const buttonAddDisabled = (
      <button
        type="button"
        className="handleQuantityButton noadd"
        data-testid="product-increase-quantity"
        disabled
      >
        +
      </button>
    );

    // Botão de subtrair
    const buttonReduce = (
      <button
        type="button"
        className="handleQuantityButton subtract"
        data-testid="product-decrease-quantity"
        onClick={ this.reduceCardQuantity }
      >
        -
      </button>
    );

    // Informação do preço total daquele item no carrinho.
    const precoTotal = (
      <span className="totalValue">
        Valor Total:
        <p>
          {preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </p>
      </span>
    );

    // Informação da quantidade total daquele item no carrinho.
    const carQuantity = (
      <span data-testid="shopping-cart-product-quantity" className="inCartTotal">
        Total no Carrinho:
        <p>
          {quantity}
        </p>
      </span>
    );

    // Botão de remover item do carrinho
    const removeFromCard = (
      <button
        type="button"
        className="handleQuantityButton remove"
        onClick={ () => this.shoppingCarttCalculator('anihilation') }
      >
        <img src={ removeCartIcon } alt="remove cart icon" />
      </button>
    );

    return (
      <div className="cartQuantityHandler">
        <div className="cartQuantityInfos">
          {precoTotal}
          {carQuantity}
        </div>
        <div className="cartQuantityButtons">
          {add ? buttonAdd : buttonAddDisabled}
          {buttonReduce}
          {removeFromCard}
        </div>
      </div>
    );
  }
}

CartQuantityHandler.propTypes = {
  updateLocal: PropTypes.func.isRequired,
  unShow: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default CartQuantityHandler;
