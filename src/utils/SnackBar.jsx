import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar, selectSnackbar } from '../store/slices/SnackBarSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const SnackBarAlert = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const { message, isOpen } = useSelector(selectSnackbar);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    const unlisten = () => {
      dispatch(closeSnackbar());
    };

    return () => {
      unlisten();
    };
  }, [path, dispatch]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      message={message}
      action={action}
    />
  );
};

export default SnackBarAlert;
