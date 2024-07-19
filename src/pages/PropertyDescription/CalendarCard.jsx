import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  createTheme
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/common/Calendar";
import { useSelector } from "react-redux";

const CalendarCard = ({ listing_bookings }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("sm"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000,
        lg: 1001,
        xl: 1920,
      },
    },
  });
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(customTheme.breakpoints.down("lg"));

  const navigate = useNavigate();
  const [showMessage, setMessage] = useState(null);
  const [showPrices, setShowPrices] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleChange = () => {
    setShowPrices(true);
  };

  const handleReserve = () => {
    navigate('/contact');
  };

  return (
    <Box
      top={100}
      height="100%"
      width={isLargeScreen ? "100%" : "35%"}
      position={!isLargeScreen ? "sticky" : ""}
      backgroundColor="#fff"
      boxShadow="rgba(0, 0, 0, 0.12) 0px 6px 16px"
      borderRadius="12px"
      padding="24px"
      marginBottom="2rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Calendar minimumDays={4} listing_bookings={listing_bookings} />

      <Button
        sx={{
          color: "#fff",
          width: isLargeScreen ? (isSmallScreen ? "80%" : "70%") : "100%",
          textTransform: "capitalize",
          fontWeight: "500",
          marginTop: "0.5rem",
          fontSize: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: theme.palette.primary.main,
          transition: "all 0.3s ease-in-out",
          borderRadius: "30px",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        onClick={handleReserve}
      >
        Request to Book
      </Button>

      {showMessage && (
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.8rem",
            fontFamily: "Inter",
            fontWeight: "300",
            textAlign: "center",
            width: "100%",
            display: "block",
            marginTop: "1rem",
          }}
        >
          {showMessage}
        </Typography>
      )}
    </Box>
  );
};

export default CalendarCard;
