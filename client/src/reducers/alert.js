import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];
export default function(state = initialState, action) {
    const { type, payload } = action; 

    switch(type) {
        case SET_ALERT:
            // state is immutable so you have to return any other state that 
            // is there, so spread operator copies current state while
            // sending the new alert
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default: 
            return state;
    }
}