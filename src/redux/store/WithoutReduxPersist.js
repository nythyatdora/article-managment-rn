import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers/RootReducer';

const logger = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        logger, thunk
    ),
);

export {
    store,
};