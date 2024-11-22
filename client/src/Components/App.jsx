import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
import "../../bootstrap/main.css";
import "./../Styles/addon.css";
import "./../Styles/bg.css";

function App() {

  return (
    <BrowserRouter> 
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
