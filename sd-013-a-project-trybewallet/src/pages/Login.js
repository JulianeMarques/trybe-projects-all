import React from 'react';
// O connect é uma função muito importante que conecta o mapStateToProps e o mapDispatchToProps com o componente
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { emailLogin } from '../actions';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    // State inicial vai ser as chaves abaixo:
    this.state = {
      email: '',
      password: '',
    };
// As funções abaixo serão habilitadas para serem usadas em todo o componente/page
    this.handleChange = this.handleChange.bind(this); // Tudo que for digitado nos campos, é alterado automaticamente na state
    this.handleNextPage = this.handleNextPage.bind(this); // Vai ser executada quando clicar no botão "Entrar"
  }

  handleChange(e) {
    this.setState((previousState) => ({ ...previousState, [e.target.name]: e.target.value}))
    /* this.setState({ [e.target.name]: e.target.value }); */
  }

  handleNextPage() { // Vai ser executada quando clicar no botão "Entrar"
    const { email } = this.state;
    const { changeValue, history } = this.props;
    changeValue(email);
    history.push('./carteira');
  }

  render() {
    const { email, password } = this.state; // Desconstrói o email e password que está na state
    const { handleChange, handleNextPage } = this;
    const passwordLength = 6; // deixar a senha com 6 numeros
    const passwordCorrect = password.length >= passwordLength; // deixar a senha com 6 numeros ou mais
    const validateEmail = () => {
      const emailCorrect = /\S+@\S+\.\S+/; // modo de deixar o formato do e-mail correto
      return emailCorrect.test(email);
    };
    return (
      <div>
        <header className="headertrybe"> Trybe Wallet </header>
        <div className="container">
        <div className="form-div">
          <form>
            <Input // local para usuario insirir email
              label="Email:"
              name="email"
              datatestid="email-input"  // requisito 1
              placeholder="Email"
              type="text" 
              id="email"
              onChange={ handleChange }
            />
            <Input
              label="Senha:" // local para usuario insirir senha
              placeholder="Senha"
              type="password" // requisito 2
              name="password"
              datatestid="password-input"  // requisito 1
              onChange={ handleChange }
            />
            <Button  // requisito 1
              className="button-primary"
              onClick={ handleNextPage } // 
              disabled={ !(validateEmail() && passwordCorrect) } // requisito 2 - desabilitado ou habilitado quando um email e uma senha válidos são passados
              name="Entrar"  // requisito 1
            />
          </form>
        </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeValue: (state) => dispatch(emailLogin(state)) });

Login.propTypes = {
  changeValue: Proptypes.func.isRequired,
  history: Proptypes.shape().isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
