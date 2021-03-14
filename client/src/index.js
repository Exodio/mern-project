import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';

import Reducer from './components/reducers';
const basicReduxStore = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer, basicReduxStore)}>
  <BrowserRouter>

    <App />

    </BrowserRouter>

    </Provider>
    
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();