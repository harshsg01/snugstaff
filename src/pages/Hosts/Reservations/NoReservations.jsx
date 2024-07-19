import { Box, Typography } from "@mui/material";
import React from "react";

const NoReservations = () => {
  return (
    <Box
      sx={{
        height: "50vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" fontSize={"1.8rem"}>
        No Reservations Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        There are currently no reservations found for your Bookings.
      </Typography>
    </Box>
  );
};

export default NoReservations;
