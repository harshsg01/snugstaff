import { Box, Typography } from "@mui/material";
import React from "react";
import Contact from "../Contact";
import { useNavigate } from "react-router-dom";

const NoProperties = () => {
  const navigate = useNavigate()

  const handlecontact = () => {
    navigate("/contact" );
  };


  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography marginTop={"5rem"} variant="h3" fontSize={"1.8rem"}>
        No Properties Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        Try a different criteria or remove some of your filters
      </Typography>
      <Typography variant="caption"  onClick={handlecontact} style={{cursor:'pointer'}}>
        Contact Us
      </Typography>
    </Box>
  );
};

export default NoProperties;
