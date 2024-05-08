"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Features/counter/counterSlice"; // Assuming you have a loginSlice for managing login state
import formSlice from "./Features/counter/formSlice";
import usersReducer from './Features/counter/usersSlice';
import clientsReducer from './Features/counter/clientsSlice';
import candidatesReducer from './Features/counter/candidatesSlice';
// Combine reducers
const rootReducer = combineReducers({
  login: counterReducer,
  form: formSlice,
  users: usersReducer,
  clients: clientsReducer,
  candidates: candidatesReducer,
  // Add other reducers if needed
});

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
});
