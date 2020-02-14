/*
*Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.
*/


// combine reducers literally combines all the reducers into one big object

import { combineReducers } from 'redux';
import alert from './alert';

export default combineReducers({
    dummy: () => 'hello'
});