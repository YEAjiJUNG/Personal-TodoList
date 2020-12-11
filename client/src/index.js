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

//리덕스에서 store생성하는데, 그냥 store는 객체형식만 받을 수 있기 때문에 promise와 function받을수있게해줌
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider //리덕스와 app을 연결하기 위해 리덕스에서 제공하는 provider
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
