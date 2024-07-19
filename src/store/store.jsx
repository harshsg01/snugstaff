import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import snackbarSlice from "./slices/SnackBarSlice";
import dialogSlice from "./slices/DialogSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    snackbar: snackbarSlice,
    dialog: dialogSlice,
  },
});

export default store;