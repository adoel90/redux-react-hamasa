import {combineReducers} from 'redux';
import userReducer from './user';
import loginReducer from './login';
import systemSessionLocalStorageReducer from './system-local-storage'

const rootReducer = combineReducers({
    // recipes: recipesReducer,
    // ingredients : ingredientsReducer,
    user : userReducer,
    login: loginReducer,
    accessToken: systemSessionLocalStorageReducer
});

export default rootReducer;