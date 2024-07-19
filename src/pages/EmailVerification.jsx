import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
// import FetchError from "../components/common/FetchError";
import {
  useNavigate,
} from "react-router-dom";
import { verifyUserEmail } from "../data/emailVerification";
import LoadingScreen from "../utils/LoadingScreen";

const EmailVerification = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const path = location.pathname;

  const verifyEmail = async () => {
    try {
      await verifyUserEmail(path);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  if (error) {
    // <FetchError />;
    navigate("/common/login")
  }

  if (loading) {
    <LoadingScreen />;
  }

  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <IconButton
          aria-label="check"
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "1rem",
            color: "#fff",
            borderRadius: "50%",
            marginBottom: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          <CheckIcon />
        </IconButton>
        <Typography variant="h3" fontSize={"1.5rem"}>
          Your email has been verified.
        </Typography>
        <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
          Thank you for verifying your email. You can now continue using the
          application.
        </Typography>
      </Box>
    </Box>
  );
};

export default EmailVerification;
