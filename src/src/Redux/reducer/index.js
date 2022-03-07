import { combineReducers } from 'redux';

import auth from './Auth';
import config from './Config';
import app from './App';
import course from "./Course"

  const appReducer = combineReducers( {
  auth,
  config,
  app,
  course
} );

const initialState = appReducer({}, {} ,{} ,{})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = initialState
  }

  return appReducer(state, action)
}

export default rootReducer ;