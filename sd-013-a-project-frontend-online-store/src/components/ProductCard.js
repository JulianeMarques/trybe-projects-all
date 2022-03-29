import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';
import './productCard.css';

// imports ends ----------------------------------------------------------------

class ProductCard extends Component {
  render() {
    // props enviadas para o componente AddToCard
    const { product, updateCart } = this.props;
    const { id, title, thumbnail, price, shipping } = product;

    return (

      <div className="productCard" data-testid="product">
        <Link
          data-testid="product-detail-link"
          // props passadas por meio da prop location do React Router
          to={ {
            pathname: `/product-details/${id}`,
            // em state passo todo o objeto do produto
            state: product,
          } }
        >
          <div className="productCardContent">
            <h2>{ title }</h2>
            <img src={ thumbnail } alt="Product Thumbnail" />
            <span>
              {
                `${price
                  .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }`
              }
            </span>
            {/* A linha abaixo verifica se existe
             frete gratis para o produto em questão */}
            {shipping.free_shipping && <p data-testid="free-shipping">Frete grátis</p>}
          </div>
        </Link>
        <AddToCart
          product={ product }
          dataTestId="product-add-to-cart"
          updateCart={ updateCart }
        />
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }),
  updateCart: PropTypes.func,
}.isRequired;

export default ProductCard;
