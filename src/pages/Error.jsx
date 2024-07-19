import React from "react";
import image from "../assets/new/error1.jpg";
import { Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error = () => {
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
        padding: "10vh 5vw",
      }}
    >
      <img
        style={{ width: "100%", maxWidth: "600px", height: "auto" }}
        src={image}
        alt="404"
      />

      <Typography
        variant="h6"
        sx={{
          fontSize: "1.1rem",
          textTransform: "inherit",
          marginBlock: "1.5rem",
          fontWeight: "400",
          fontFamily: "Inter",
        }}
      >
        Something went wrong due to an error. Please reload the page or try again later.
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
        onClick={() => window.location.reload()}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            textTransform: "capitalize",
            marginRight: "0.2rem",
          }}
        >
          Reload Page
        </Typography>
      </Button>
      
    </div>
  );
};

export default Error;
