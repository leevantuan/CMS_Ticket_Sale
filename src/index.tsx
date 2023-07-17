import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './view/App';
import { Provider } from 'react-redux';
import { store } from './core/store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
