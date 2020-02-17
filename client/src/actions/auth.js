import axios from 'axios';

import {
  REGISTER_SUCCESS, LOGIN_SUCCESS
} from './types';  

// Register User
export const register = ({ email, password })  => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post('/user', body,config);
      dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Register User
export const login = ({ email, password })  => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post('/auth', body,config);
      dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };