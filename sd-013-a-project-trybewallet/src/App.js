import React, { Component } from 'react';
// Importa o Route e o Switch para configurar as rotas
import { Route, Switch } from 'react-router-dom';
// Importa as pages para serem usadas, estrutuando suas rotas pelo Route
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />  {/* requisito 1 com a rota correta */}
        <Route path="/carteira" component={ Wallet } /> {/* requisito 4 - rota para a pagina */}
      </Switch>
    );
  }
}

export default App;

// codigo inteiro do projeto baseado nos estudos da aluna Aline Eiko Hoshino e do Pedro Delicoli
