import React, { Component } from 'react';
import PropTypes from 'prop-types';

// imports ends ----------------------------------------------------------------

class EvaluateProduct extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props;
    this.state = {
      email: '',
      nota: 0,
      avaliacao: '',
      id,
    };
  }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    registerEvaluation = (event) => {
      event.preventDefault();
      const { email, nota, avaliacao, id } = this.state;
      let avaliacoes = JSON.parse(localStorage.getItem('evaluations') || '[]');

      const newEvalution = {
        id,
        evaluation: {
          email,
          nota,
          avaliacao,
        },
      };

      avaliacoes = [...avaliacoes, newEvalution];
      localStorage.setItem('evaluations', JSON.stringify(avaliacoes));
      this.setState({
        nota: 0,
        avaliacao: '',
        email: '',
      });
    }

    render() {
      const { email, nota, avaliacao } = this.state;
      return (
        <div>
          <h1>Avaliações</h1>
          <form onSubmit={ this.registerEvaluation }>
            <label htmlFor="nota">
              <p style={ { borderRight: '5px' } }>Nota:</p>
              <input
                id="nota"
                type="number"
                name="nota"
                onChange={ this.handleChange }
                value={ nota }
                required
                style={ {
                  padding: '10px', borderRadius: '5px', width: '10%', margin: '5px' } }
              />
            </label>
            <label htmlFor="email">
              <input
                id="email"
                type="email"
                placeholder="E-mail"
                name="email"
                onChange={ this.handleChange }
                value={ email }
                required
                style={ {
                  padding: '11px', borderRadius: '5px', width: '40%', margin: '5px' } }
              />
            </label>
            <label htmlFor="message">
              <textarea
                data-testid="product-detail-evaluation"
                id="message"
                placeholder="Insira sua mensagem aqui"
                name="avaliacao"
                onChange={ this.handleChange }
                value={ avaliacao }
                style={ {
                  padding: '15px', borderRadius: '5px', width: '80%', margin: '5px' } }
              />
            </label>
            <button style={ { margin: '5px' } } type="submit">Enviar</button>
          </form>
        </div>
      );
    }
}

EvaluateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EvaluateProduct;
