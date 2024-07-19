import React from "react";
import image from "../assets/new/error404.svg";
import { Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
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
        style={{ width: "100%", maxWidth: "800px", height: "auto" }}
        src={image}
        alt="404"
      />
      <Typography
        variant="h6"
        sx={{
          fontSize: "1.1rem",
          textTransform: "inherit",
          marginBottom: "2rem",
          fontWeight: "400",
          fontFamily: "Inter",
        }}
      >
        You tried some shady path! The page you're looking for doesn't seem to exist.
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

export default Page404;
