import React, { Component } from 'react';
import * as api from '../services/api';
import CategoriesFilter from '../components/CategoriesFilter';
import ProductCard from '../components/ProductCard';
import CartIcon from '../components/CartIcon';
import './home.css';

// imports ends ----------------------------------------------------------------

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false, // Quando não for encontrada uma busca realizada
      noSearch: true, // Quando não for realizado nenhuma busca
      inputValue: '', // valor do input da busca
      categoria: '', // categoria do seletor de categorias
      products: [], // array de produtos a ser exibido na tela
      inCart: 0, // quantidade de produtos no carrinho
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  // função que busca no storage a quantidade total de produtos no carrinho
  getLocalStorage = () => {
    const storageCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const totalInCart = storageCart
      .reduce((acc, { cartQuantity }) => cartQuantity + acc, 0);

    this.setState({
      inCart: totalInCart,
    });
  }

  // função que busca produtos pela barra de busca
  getProductsBySearch = async () => {
    const { inputValue, categoria } = this.state;
    const request = await api.getProductsFromCategoryAndQuery(categoria, inputValue);
    console.log(request);
    if (request.results.length === 0) {
      this.setState({
        products: [],
        notFound: true,
        noSearch: false,
      });
    } else {
      this.setState({
        products: request.results,
        noSearch: false,
        notFound: false,
      });
    }
  }

  // função que lida com a mudança do input da barra de busca
  handleChangeInput = ({ target }) => {
    const { value } = target;
    this.setState({
      inputValue: value,
    });
  }

  // função que lida com a mudança dos radio buttons de categorias
  handleChangeCategory = ({ target }) => {
    const { value } = target;
    const { inputValue } = this.state;

    this.setState({
      categoria: value,
    }, () => this.getProductsByCategory(value, inputValue));
  }

  // função que busca produtos com a mudança de radio buttons
  getProductsByCategory = async (value, inputValue) => {
    if (value) {
      const request = await api.getProductsFromCategoryAndQuery(value, inputValue);

      this.setState({
        products: request.results,
      }, () => this.setState({
        noSearch: false,
        notFound: false,
      }));
    }
  }

  render() {
    const {
      inputValue,
      noSearch,
      notFound,
      products,
      inCart,
    } = this.state;

    // realiza o map do array de produtos e renderiza na tela um Card para cada produto do array;
    const productCards = products.map((product) => (
      <ProductCard
        key={ product.id } // chave de cada produto;
        product={ product } // informações completas do produto;
        updateCart={ this.getLocalStorage } // funcao que pega o carrinho do localStorage atualizado
      />
    ));

    // lista de produtos, é a div que abraça a renderização de ProductCards.
    const productList = (
      <div className="productList">
        { productCards }
      </div>
    );

    // Parágrafo que aparce quando nenhuma busca foi feita;
    const facaUmaBusca = (
      <p data-testid="home-initial-message" className="searchMsg">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );

    // Parágrafo que aparece quando o retorno da busca não retorna nada;
    const naoEncontrado = (
      <p className="notFound">
        Nenhum produto foi encontrado
      </p>
    );

    return (
      <>
        <section className="homeMain">
          <div className="topInputHome">
            <input
              data-testid="query-input"
              type="text"
              name="product-search"
              onChange={ this.handleChangeInput }
              value={ inputValue }
              placeholder="Produtos, marcas, o que você quiser ..."
            />
            <button
              data-testid="query-button"
              onClick={ this.getProductsBySearch }
              type="button"
            >
              Buscar
            </button>
            <CartIcon inCart={ inCart } />
          </div>
          <section className="homeCards">
            { noSearch && facaUmaBusca }
            { !noSearch && productList }
            { notFound && naoEncontrado}
          </section>
        </section>
        <CategoriesFilter onChange={ this.handleChangeCategory } />
      </>
    );
  }
}

export default Home;
