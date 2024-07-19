import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  isOpen: false,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.message = action.payload;
      state.isOpen = true;
    },
    closeSnackbar: (state) => {
      state.message = null;
      state.isOpen = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export const selectSnackbar = (state) => state.snackbar;
export default snackbarSlice.reducer;
