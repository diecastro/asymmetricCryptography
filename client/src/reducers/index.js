import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import applicationReducer from './applicationReducer';
const reducers = {
  application: applicationReducer,
  form: formReducer,
  routing,
};

const appReducer = combineReducers(reducers);

export default appReducer;
