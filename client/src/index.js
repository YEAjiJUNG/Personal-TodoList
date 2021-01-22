import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { createStore } from 'redux';
import Reducer from './_reducers';
import { applyMiddleware} from 'redux';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider 
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
    <App />
  </Provider>

  , document.getElementById('root')
);
reportWebVitals();
