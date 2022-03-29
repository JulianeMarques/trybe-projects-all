import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../images/shopping_cart_black_24dp.svg';
import './cartIcon.css';

class CartIcon extends Component {
  render() {
    const { inCart } = this.props;
    return (
      <Link to="/Cart" data-testid="shopping-cart-button">
        <img className="shoppingCart" src={ cartIcon } alt="shopping cart" />
        <span data-testid="shopping-cart-size">{ inCart }</span>
      </Link>
    );
  }
}

CartIcon.propTypes = {
  inCart: PropTypes.number.isRequired,
};

export default CartIcon;
