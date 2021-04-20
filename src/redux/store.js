import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';
import logger from 'redux-logger'; 

// Note: this API requires redux@>=3.1.0

const store = createStore(
  rootReducer,
  applyMiddleware(thunk,logger)
);

export default store;