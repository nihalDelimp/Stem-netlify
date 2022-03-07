import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/scss/main.scss';
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

require( 'dotenv' ).config()


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById( 'root' )
);
