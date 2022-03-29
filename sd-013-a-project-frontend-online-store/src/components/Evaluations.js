import React, { Component } from 'react';
import PropTypes from 'prop-types';

// imports ends ----------------------------------------------------------------

class Evaluations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluations: [],
    };
  }

    componentDidMount = () => {
      this.getEvaluations();
    }

    getEvaluations = () => {
      const { id } = this.props;
      const avaliacoes = JSON.parse(localStorage.getItem('evaluations') || '[]');
      console.log('avaliacoes');
      const thisProductEvaluations = avaliacoes.filter((item) => item.id === id);
      this.setState({ evaluations: thisProductEvaluations });
    }

    render() {
      const { evaluations } = this.state;

      return (
        <div>
          {evaluations.map((item) => (
            <div key={ item.id }>
              <p>{ item.evaluation.email }</p>
              <span>{ item.evaluation.nota }</span>
              <div>
                <p>{ item.evaluation.avaliacao }</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
}

Evaluations.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Evaluations;
