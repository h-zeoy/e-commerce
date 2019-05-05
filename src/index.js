
import React from 'react';
import ReactDOM from 'react-dom'; // react-dom 虚拟DOM
import { BrowserRouter } from 'react-router-dom';
import App from '@/app.js';
// reset样式
import 'styles/reset.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'));
