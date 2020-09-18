import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import auth_reducer from './reducers/auth_reducer';
import quiz_reducer from './reducers/quiz_reducer';

// Redux: Combine Multiple Reducers together.
const rootReducer = combineReducers({
    auth_reducer,
    quiz_reducer
});
  

// Redux: Middleware for logging all things related to the Redux.
const logger = store => {
    if (process.env.NODE_ENV === 'development'){
        return next => {
            return action => {
                console.log('[Middleware] Dispatching', action);
                const result = next(action);
                console.log('[Middleware] next state', store.getState());
                return result;
            }
        }
    }
}
  
// Redux: Setup Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Redux: Setup the Store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

export default store;