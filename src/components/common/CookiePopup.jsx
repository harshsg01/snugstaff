import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, createTheme, useMediaQuery } from '@mui/material';

const CookiePopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Check if 'isopen' is present in session storage
    const isOpenInStorage = localStorage.getItem('isopen');

    if (isOpenInStorage === 'false') {
      setIsOpen(false);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('isopen', 'false');
  };

  const handleAccept = () => {
    // Handle Accept logic if needed
    handleClose();
  };

  const handleReject = () => {
    // Handle Reject logic if needed
    handleClose();
  };

  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000, // Set your custom breakpoint at 1000px
        lg: 1280,
        xl: 1920,
      },
    },
  });
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down("sm"));

  // If the popup is closed, do not render it
  if (!isOpen) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '16px',
        right: '18px',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          width: isSmallScreen ? '300px' : '450px',
          padding: '16px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" style={{ fontSize: '0.8rem', textAlign: 'justify', paddingBottom: '5px' }}>
          This website uses cookies to ensure you get the best experience on our platform. By continuing to browse,
          you agree to our use of cookies as described in our Cookie Policy. You can manage your cookie preferences in
          your browser settings. For more details, please read our Privacy Policy.
        </Typography>
        <Button variant="contained" color="primary" sx={{ margin: '15px' }} onClick={handleAccept}>
          Accept
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReject}>
          Reject
        </Button>
      </Box>
    </Box>
  );
};

export default CookiePopup;






