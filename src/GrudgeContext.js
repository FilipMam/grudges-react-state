import React, { useReducer, createContext, useCallback, Children } from 'react';

import id from 'uuid/v4';
import initialState from './initialState';

export const GrudgeContext = createContext();

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  }

  if (action.type === GRUDGE_FORGIVE) {
    return state.map((grudge) => {
      return grudge.id === action.payload
        ? { ...grudge, forgiven: !grudge.forgiven }
        : grudge;
    });
  }

  return state;
};

export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = (grudge) => {
    grudge.id = id();
    grudge.forgiven = false;
    dispatch({
      type: GRUDGE_ADD,
      payload: grudge
    });
  };

  const toggleForgiveness = (id) => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: id
    });
  };

  const value = { grudges, addGrudge, toggleForgiveness };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};
