import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Cart, ProductDetails, Checkout } from './pages/pagesIndex';

// imports ends ----------------------------------------------------------------

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/product-details/:id" component={ ProductDetails } />
        <Route exact path="/checkout" component={ Checkout } />
      </Switch>
    </Router>
  );
}

export default App;
