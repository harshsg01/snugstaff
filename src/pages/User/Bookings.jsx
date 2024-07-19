import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  useTheme,
  Divider,
  useMediaQuery
} from "@mui/material";
import { theme } from "../../themes/Themes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Page404 from "../Page404";

const Bookings = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleBookingsClick = () => {
    navigate("/userreservations");
  };

  if (!isLoggedIn) {
    return <Page404 />;
  }

  return (
    <Stack
      direction={"column"}
      spacing={4}
      sx={{ padding: isMd ?"2rem " :"2vh 18vw 10vh 18vw" }}
      minHeight={"100vh"}
      width={"fit-content"}
    >
      {/* Heading */}
      <Stack direction={"column"} spacing={1}>
        <Typography variant="heading">Bookings and Payments</Typography>
      </Stack>

      <Divider />

      {/* Content */}
      <Stack direction={"column"} spacing={10} marginBlock={{ xs: 5, md: 10 }}>
        {/* Payments/Bookings */}
        {/* <Stack direction={"column"}>
          <Typography fontWeight={600} fontSize="1.5rem">
            Your Payments
          </Typography>
          <Typography fontWeight={400} fontFamily={"Inter"} fontSize="0.9rem">
            Keep track of all your payments and refunds.
          </Typography>

          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontFamily: "Inter",
              fontWeight: 600,
              width: "fit-content",
              borderRadius: "0.5rem",
              marginTop: "1.5rem",
              textTransform: "inherit",
              padding: "0.5rem 1rem",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            
          >
            {" "}
            Manage Payments{" "}
          </Button>
        </Stack> */}

        {/* Payment Methods */}
        {/* <Stack direction={"column"}>
          <Typography fontWeight={600} fontSize="1.5rem">
            Payment Methods
          </Typography>
          <Typography fontWeight={400} fontFamily={"Inter"} fontSize="0.9rem">
            Add a payment method using our secure payment system, then start
            planning your next trip.
          </Typography>

          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontFamily: "Inter",
              fontWeight: 600,
              width: "fit-content",
              borderRadius: "0.5rem",
              marginTop: "1.5rem",
              textTransform: "inherit",
              padding: "0.5rem 1rem",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {" "}
            Add Payment Method{" "}
          </Button>
        </Stack> */}

        <Stack direction={"column"}>
          <Typography fontWeight={600} fontSize="1.5rem">
            Your Reservations
          </Typography>
          <Typography fontWeight={400} fontFamily={"Inter"} fontSize="0.9rem">
            Keep track of all your reservations.
          </Typography>

          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontFamily: "Inter",
              fontWeight: 600,
              width: "fit-content",
              borderRadius: "0.5rem",
              marginTop: "1.5rem",
              textTransform: "inherit",
              padding: "0.5rem 1rem",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}

            onClick={handleBookingsClick}
          >
            {" "}
            See Your Reservations{" "}
          </Button>
        </Stack>
      </Stack>

      <Divider />
    </Stack>
  );
};

export default Bookings;
