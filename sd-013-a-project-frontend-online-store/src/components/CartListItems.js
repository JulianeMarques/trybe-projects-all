import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

// imports ends ----------------------------------------------------------------

class CartListItems extends Component {
  render() {
    const { purchaseList, unShow, updateLocal } = this.props;

    const cartItems = purchaseList.map((product) => (
      <CartItem
        key={ product.id }
        product={ product }
        unShow={ unShow }
        updateLocal={ updateLocal }
      />
    ));

    const totalPrice = purchaseList
      .reduce((acc, { preco }) => acc + preco, 0);

    return (
      <>
        {cartItems}
        <p>
          {
            `Valor Total da Compra: ${totalPrice
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`
          }
        </p>
      </>
    );
  }
}

CartListItems.propTypes = {
  purchaseList: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default CartListItems;

// cometario
