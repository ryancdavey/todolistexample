import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import '../src/stylesheets/style.css' 
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import UserProvider from './components/UserProvider';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


