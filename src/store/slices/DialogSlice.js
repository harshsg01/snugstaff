import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: "",
  open: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: initialState,
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
    },
    closeDialog: (state, action) => {
      state.open = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    }
  }
});

export const { openDialog, closeDialog, setMessage } = dialogSlice.actions;
export const selectDialog = (state) => state.dialog;
export default dialogSlice.reducer;