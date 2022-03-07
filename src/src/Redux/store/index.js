import { createStore, applyMiddleware } from "redux";
import reducers from "../reducer"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "stem-unicorn",
  storage: storage,
};

const persistedReducer = persistReducer( persistConfig, reducers );


const middlewares = [];
middlewares.push( thunk );

if ( process.env.NODE_ENV === 'development' ) {
  const { logger } = require( 'redux-logger' );
  middlewares.push( logger );
}

export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware( ...middlewares )
  )
);

export const persistor = persistStore( store );