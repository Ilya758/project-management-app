import { createSlice } from '@reduxjs/toolkit';
import { IState } from './appReducer.model';

export const initialState: IState = {
  isLoggedIn: false,
};

const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    toggleIsLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { toggleIsLoggedIn } = appReducer.actions;
export default appReducer.reducer;
