import { Box, Typography } from "@mui/material";
import React from "react";

const FetchError = () => {
  return (
    <Box
      sx={{
        height: "85vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" fontSize={"1.8rem"}>
        Error Fetching Data
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        We are experiencing difficulty in fetching data, please try logging in
        again or later.
      </Typography>
    </Box>
  );
};

export default FetchError;
