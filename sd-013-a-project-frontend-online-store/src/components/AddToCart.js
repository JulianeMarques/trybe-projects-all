import React, { Component } from 'react';
import PropTypes from 'prop-types';

// imports ends ----------------------------------------------------------------

// Lógica instigada por Rogério P. da Silva 1990 cv!
class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // estado responsável por permitir ou não o clique no botão de adicionar no carrinho no ProductCard
      disabled: false,
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  // função que consulta no localStorage pelo produto que irá renderizar o botão AddToCart
  getLocalStorage = () => {
    const { product } = this.props;
    const storageCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');

    // O produto atual fica armazenado na const thisProduct
    const thisProduct = storageCart.find((item) => item.id === product.id);

    // Se o produto atual existir e sua quantidade no estoque for igual a quantidade no carrinho, desabilita o botão.
    if (thisProduct && thisProduct.max === thisProduct.cartQuantity) {
      this.setState({
        disabled: true,
      });
    }
  }

    // Função que lida com o clique do botão
    handleClick = () => {
      const { product, updateCart } = this.props;

      // cria um novo objeto de nome Produto, que será passado para a função que adiciona o produto no carrinho.
      const produto = {
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        id: product.id,
        // Variável criada para pegar a quantidade do produto no estoque
        max: product.available_quantity,
        // Variável criada para manipular o preco do produto no carrinho
        preco: product.price,
        // Variável criada para manipular a quantidade do produto no carrinho
        cartQuantity: 1,
      };
      this.addToCart(produto);

      // Esta funçaõ, passada por pros, realiza a atualização do número no carrinho, tanto no Details como na Home.
      updateCart();
    }

    // Função que adicona o produto no carrinho
    addToCart = (produto) => {
      // Pega o que existe no localStorage na chave 'shoppingCart' e atribui à listaDeCompras
      let listaDeCompras = JSON.parse(localStorage.getItem('shoppingCart') || '[]');

      // Valida se o produto passado por parâmetro existe ou não no carrinho.
      const validated = this.productExists(listaDeCompras, produto);

      // Se o produto exististir no carrinho, validated será diferente do produto passado por parametro.
      if (validated !== produto && validated.cartQuantity < validated.max) {
        // Validated será o produto de dentro do array listaCompras
        // Então aumentamos a sua quantidade no carrinho em 1 e...
        // Corrigimos o seu preco no carrinho
        validated.cartQuantity += 1;
        validated.preco = validated.price * validated.cartQuantity;
        localStorage.setItem('shoppingCart', JSON.stringify(listaDeCompras));
      }

      // Se Validated for igual ao Produto, quer dizer que o produto não existe no carrinho.
      if (validated === produto) {
        // Então adicionamos o produto no carrinho, e salvamos.
        listaDeCompras = [...listaDeCompras, validated];
        localStorage.setItem('shoppingCart', JSON.stringify(listaDeCompras));
      }
      this.getLocalStorage();
    }

    // Função que valida ou não a existência do produto passado como parâmetro no carrinho
    productExists = (listaDeCompras, produto) => {
      // A Riqueza de se usar o find é que você pode manipular o productFound de dentro do carrinho.
      const productFound = listaDeCompras.find((item) => item.id === produto.id);
      if (!productFound) return produto;
      return productFound;
    }

    render() {
      const { dataTestId, addButtonCheck } = this.props;
      const { disabled } = this.state;

      const addButton = (
        <div>
          <button
            type="button"
            data-testid={ dataTestId }
            onClick={ this.handleClick }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      );

      // botão de adicionar bloqueado, para quando a quantidade máxima for alcançada
      const blockedAddButton = (
        <div>
          <button
            type="button"
            data-testid={ dataTestId }
            disabled
          >
            Adicionar ao Carrinho
          </button>
        </div>
      );

      return (
        // O primeiro elemento valida a aparicao do botão no ProductCard o segunto, para ProductDetails
        (disabled && !addButtonCheck ? blockedAddButton : addButton)
      );
    }
}

AddToCart.propTypes = {
  product: PropTypes.object,
  dataTestId: PropTypes.string,
  updateCart: PropTypes.func,
}.isRequired;

export default AddToCart;
