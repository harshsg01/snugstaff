import React, { useState } from "react";
import { Box, styled, useTheme } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../utils/Api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../store/slices/SnackBarSlice";
import SnackBarAlert from "../utils/SnackBar";
import SimpleHeader from "../components/common/SimpleHeader";

const ForgotPass = () => {
  const customTheme = useTheme();
  const { uuid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      dispatch(openSnackbar("Error: Passwords do not match."));
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const data = {
      uid64: uuid,
      token: token,
      password: password,
    };

    try {
      const response = await post("/api/auth/initiate/reset/", data);
      dispatch(openSnackbar(response.status));
      setConfirmPassword("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
      dispatch(openSnackbar(error.message));
    }
  };

  return (
    <>
      <SimpleHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: customTheme.palette.tertiary.paper,
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "500px",
            padding: customTheme.spacing(4),
            borderRadius: "10px",
            boxShadow: "0px 2px 2px rgba(100, 100, 100, 0.5)",
            backgroundColor: customTheme.palette.secondary.paper,
          }}
        >
          <TextField
            type="password"
            label="Create new Password"
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{
              marginBottom: customTheme.spacing(4),
            }}
          />
          <TextField
            type="password"
            label="Re-enter new Password"
            variant="outlined"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            sx={{
              marginBottom: customTheme.spacing(2),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!password || !confirmPassword}
            fullWidth
            disableRipple={true}
            onClick={handleChangePassword}
            sx={{
              marginTop: customTheme.spacing(2),
              transition: "all 0.3s ease-in-out",
              textTransform: "inherit",
            }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
      <SnackBarAlert />
    </>
  );
};

export default ForgotPass;
