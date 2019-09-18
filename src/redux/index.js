import { combineReducers } from 'redux';
import configureStore from './createStore';
import UserActions, { usersReducer as user } from './users';

export default () => {
  / ------------- Assemble The Reducers ------------- /
  const rootReducer = combineReducers({
    user,
  });
  return configureStore(rootReducer);
};

export {
  UserActions
};
