// candidatesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  candidates: [],
};

export const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCandidates: (state, action) => {
      state.candidates = action.payload;
    },
    updateCandidate: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.candidates.findIndex(candidate => candidate.id === id);
      if (index !== -1) {
        state.candidates[index] = { ...state.candidates[index], ...newData };
      }
    },
  },
});

export const { setCandidates, updateCandidate } = candidatesSlice.actions;

export default candidatesSlice.reducer;