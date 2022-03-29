import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToCart from '../components/AddToCart';
import CartQuantityHandler from '../components/CartQuantityHandler';
import EvaluateProduct from '../components/EvaluateProduct';
import Evaluations from '../components/Evaluations';
import CartIcon from '../components/CartIcon';
import './productDetails.css';

// imports ends ----------------------------------------------------------------

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addButton: true,
      emptyCart: true,
      inCart: 0,
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  // Função que gerencia as atualizações no localStorage, é enviada como prop para CartQuantityHandler
  getLocalStorage = () => {
    const { props: { location: { state } } } = this;
    const { id } = state;
    const storageCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');

    // Esta Hof atualiza a quantidade total de produtos no carrinho.
    const totalInCart = storageCart
      .reduce((acc, { cartQuantity }) => cartQuantity + acc, 0);

    this.setState({
      inCart: totalInCart,
    });

    // Em thisProduct armazenamos o produto que está sendo manipulado.
    const thisProduct = storageCart.find((item) => item.id === id);

    // Se este produto tiver o estoque maior do que a quantidade no carrinho, renderiza-se o botão
    if (thisProduct && thisProduct.max > thisProduct.cartQuantity) {
      this.setState({
        emptyCart: false,
        addButton: true,
      });
    }

    // Se este produto tiver o estoque maior igual a quantidade no carrinho, naõ renderiza o botão
    if (thisProduct && thisProduct.max === thisProduct.cartQuantity) {
      this.setState({
        addButton: false,
        emptyCart: false,
      });
    }
  }

  // Esta função apaga o componente CartQuantityHandler caso este produto seja removido do carrinho.
  unshowCartHandler = () => {
    this.setState({
      emptyCart: true,
      addButton: true,
    });
  };

  render() {
    const { props: { location: { state } } } = this;
    const {
      title,
      price,
      thumbnail,
      id,
    } = state;

    document.title = 'product-details';
    const { emptyCart, inCart, addButton } = this.state;

    return (
      <section className="productDetails">
        <CartIcon inCart={ inCart } />
        <div className="detailsCard">
          <div className="imageDiv">
            <img alt="title" src={ thumbnail } />
          </div>
          <div className="infosCardDetails">
            <h2 data-testid="product-detail-name">{ title }</h2>
            <div className="textInfos">
              <p>
                {`Preço unitário: ${price
                  .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}
              </p>
              <p>{`Quantidade Disponível: ${state.available_quantity}`}</p>
              <p>{`Cidade: ${state.address.city_name}`}</p>
              <p>{`Estado: ${state.address.state_name}`}</p>
              <AddToCart
                addButtonCheck={ addButton }
                product={ state }
                dataTestId="product-detail-add-to-cart"
                updateCart={ this.getLocalStorage }
              />
              { !emptyCart
              && <CartQuantityHandler
                id={ id }
                unShow={ this.unshowCartHandler }
                updateLocal={ this.getLocalStorage }
              />}
            </div>
            <EvaluateProduct id={ id } />
            <Evaluations id={ id } />
          </div>
          <div />
        </div>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default ProductDetails;
