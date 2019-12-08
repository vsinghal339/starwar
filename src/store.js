import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import itemReducer from './reducers/items';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware)
);

export default function configureStore(preloadedState) {
  return createStore(
    itemReducer,
    preloadedState,
    enhancer
  );
}
