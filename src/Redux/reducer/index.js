import { combineReducers } from 'redux';

import auth from './Auth';
import config from './Config';
import app from './App';
import course from "./Course"

export default combineReducers( {
  auth,
  config,
  app,
  course
} );