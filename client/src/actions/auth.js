import axios from 'axios';

import {
  REGISTER_SUCCESS
} from './types';  

// Register User
export const register = ({ name, email, password })  => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ name, email, password });
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