import React from 'react';
import RecipesProvider from './context/RecipesProvider';
import Routes from './routes';

function App() {
  return (
    <RecipesProvider>
      <Routes />
    </RecipesProvider>
  );
}

export default App;
