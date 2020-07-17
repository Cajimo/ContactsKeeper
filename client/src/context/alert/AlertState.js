import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

// Initial State
const AlertState = (props) => {
  const initialState = [];

  // Pull out the state and dispatch from reducer
  // state allow us to access anything in our state and dispatch allow us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //! ACTIONS
  // Set Alert
  const setAlert = (msg, type, timeout = 2000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
  //Anything that we want to be able to access from other components including state
  //and actions need to go in "value={{}}"
  return (
    <AlertContext.Provider
      value={{
        //We can use state bc we brought that in from useReducer
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
