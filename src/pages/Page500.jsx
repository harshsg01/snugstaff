import React from "react";
import image from "../assets/new/Icons/4.jpg";
import {Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Page500 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBlock: "20vh 5vw",
      }}
    >
      <img
        style={{ width: "80%", maxWidth: "800px", height: "auto" }}
        src={image}
        alt="404"
      />
      <Typography
        variant="h6"
        sx={{
          fontSize: "1rem",
          textTransform: "inherit",
          marginBlock: "3rem 2rem",
          fontWeight: "400",
          fontFamily: "Inter",
        }}
      >
        It seems that we have encountered an error. Please try again after some time.
      </Typography>
      <Button
        sx={{
          paddingY: "0.7rem",
          paddingX: "2rem",
          color: "#fff",
          borderRadius: "30px",
          cursor: "pointer",
          backgroundColor: theme.palette.primary.dark,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        disableRipple={true}
        disableFocusRipple={true}
        onClick={() => navigate("/")}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            textTransform: "capitalize",
            marginRight: "0.2rem",
          }}
        >
          Go to Home Page
        </Typography>
      </Button>
    </div>
  );
};

export default Page500;
