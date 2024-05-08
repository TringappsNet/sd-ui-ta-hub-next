import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [],
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    updateClient: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.clients.findIndex(client => client.id === id);
      if (index !== -1) {
        state.clients[index] = { ...state.clients[index], ...newData };
      }
    },
  },
});

export const { setClients, updateClient } = clientsSlice.actions;

export default clientsSlice.reducer;