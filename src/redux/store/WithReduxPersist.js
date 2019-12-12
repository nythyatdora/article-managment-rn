import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/RootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const logger = createLogger();

const store = createStore(
  persistedReducer,
  applyMiddleware(
    logger, thunk
  ),
);

let persistor = persistStore(store);

export {
  store,
  persistor,
};