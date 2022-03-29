import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartQuantityHandler from './CartQuantityHandler';
import './cartItem.css';

// imports ends ----------------------------------------------------------------

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { product, unShow, updateLocal } = this.props;
    const { title, thumbnail, price, id } = product;

    return (
      <div data-testid="shopping-cart-product-name" className="cartItenDiv">
        <div className="imageDiv">
          <img src={ thumbnail } alt={ title } />
        </div>
        <div className="cartItemInfo">
          <h1 data-testid="">{ title }</h1>
          <p>
            {
              `Preço unit.: R$ ${price
                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`
            }
          </p>
          <CartQuantityHandler id={ id } unShow={ unShow } updateLocal={ updateLocal } />
        </div>
      </div>
    );
  }
}

CartItem.propTypes = ({
  product: PropTypes.shape({
    cartQuantity: PropTypes.number,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }),
}).isRequired;

export default CartItem;
