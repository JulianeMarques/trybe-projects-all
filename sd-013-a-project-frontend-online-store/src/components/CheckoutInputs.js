import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './checkoutInputs.css';

class CheckoutInputs extends Component {
  render() {
    const { onChange, fullname, email, cpf, phone, cep, address } = this.props;
    return (
      <div className="checkoutInputs">
        <section className="textInputs">
          <section className="personalInfo">
            INFORMAÇÕES PESSOAIS:
            <label htmlFor="fullname">
              <input
                data-testid="checkout-fullname"
                type="text"
                name="fullname"
                value={ fullname }
                placeholder="Nome Completo"
                onChange={ onChange }
                className="fullName"
                required
                style={ {
                  padding: '5px', borderRadius: '5px', width: '50%', margin: '5px' } }
              />
            </label>
            <label htmlFor="email">
              <input
                data-testid="checkout-email"
                type="email"
                name="email"
                value={ email }
                placeholder="Email"
                onChange={ onChange }
                className="email"
                required
                style={ {
                  padding: '5px', borderRadius: '5px', width: '30%', margin: '5px' } }
              />
            </label>
            <label htmlFor="cpf">
              <input
                data-testid="checkout-cpf"
                type="text"
                name="cpf"
                value={ cpf }
                placeholder="CPF"
                onChange={ onChange }
                className="cpf"
                required
                style={ {
                  padding: '5px', borderRadius: '5px', width: '20%', margin: '5px' } }
              />
            </label>
            <label htmlFor="phone">
              <input
                data-testid="checkout-phone"
                type="text"
                name="phone"
                value={ phone }
                placeholder="Telefone"
                onChange={ onChange }
                className="phone"
                required
                style={ {
                  padding: '5px', borderRadius: '5px', width: '20%', margin: '5px' } }
              />
            </label>
          </section>
          <section className="addressInfo">
            ENDEREÇO DE COBRANÇA:
            <label htmlFor="cep">
              <input
                data-testid="checkout-cep"
                type="text"
                name="cep"
                value={ cep }
                placeholder="CEP"
                onChange={ onChange }
                className="cep"
                required
                style={ {
                  padding: '5px', borderRadius: '5px', width: '20%', margin: '5px' } }
              />
            </label>
            <label htmlFor="address">
              <input
                data-testid="checkout-address"
                type="text"
                name="address"
                value={ address }
                placeholder="Endereço"
                onChange={ onChange }
                className="address"
                required
                style={ {
                  padding: '5px', borderRadius: '5px', width: '60%', margin: '5px' } }
              />
            </label>
          </section>
        </section>
        <section className="cardInputs">
          INFORMAÇÕES DE PAGAMENTO:
          <label htmlFor="boleto">
            <input
              type="radio"
              value="boleto"
              id="boleto"
              name="pagamento"
            />
            Boleto
          </label>
          <label htmlFor="visa">
            <input
              type="radio"
              value="visa"
              id="visa"
              name="pagamento"
            />
            Visa
          </label>
          <label htmlFor="mastercard">
            <input
              type="radio"
              value="mastercard"
              id="mastercard"
              name="pagamento"
            />
            Mastercard
          </label>
          <label htmlFor="elo">
            <input
              type="radio"
              value="elo"
              id="elo"
              name="pagamento"
            />
            Elo
          </label>
        </section>
      </div>
    );
  }
}

CheckoutInputs.propTypes = {
  fullname: PropTypes.string,
  email: PropTypes.string,
  onChange: PropTypes.func,
  cpf: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  address: PropTypes.string,
  phone: PropTypes.number,
  cep: PropTypes.number,
}.isRequired;

export default CheckoutInputs;
