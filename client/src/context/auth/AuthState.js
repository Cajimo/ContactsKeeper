import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

// Initial State
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  // Pull out the state and dispatch from reducer
  // state allow us to access anything in our state and dispatch allow us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  //! ACTIONS
  // Load User
  const loadUser = () => console.log('loaduser');

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = () => console.log('login');

  // Logout
  const logout = () => console.log('logout');

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  //Anything that we want to be able to access from other components including state
  //and actions need to go in "value={{}}"
  return (
    <AuthContext.Provider
      value={{
        //We can use state bc we brought that in from useReducer
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
