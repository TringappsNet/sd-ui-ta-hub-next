"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Features/counter/counterSlice"; // Assuming you have a loginSlice for managing login state
import formSlice from "./Features/counter/formSlice";

// Combine reducers
const rootReducer = combineReducers({
  login: counterReducer,
  form: formSlice,
  // Add other reducers if needed
});

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
});
