import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendVerificationEmail } from "../../../data/emailVerification";
import { fetchUser } from "../../../data/fetchUser";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: "1rem 2rem",
    width: "550px",
    borderBottom: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "& .MuiPaper-root": {
    borderRadius: "20px",
    overflowY: "auto",
  },
  "& .MuiDialogActions-root": {
    borderTop: "1px solid #ebebeb",
    padding: theme.spacing(1.5),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 400,
    fontSize: "1.2rem",
  },
  zIndex: 10000,
}));

const VerifyEmail = ({
  open,
  handleClose,
  user,
  fetchUserDetails,
  convertUsertoHost,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const isLoggedIn = localStorage.getItem("access_token") ? true : false;


  const handleSendEmail = async () => {
    try {
      const response = await sendVerificationEmail();
      console.log(response);
      setEmailSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserProfile = async () => {
    if (!isLoggedIn) {
      return;
    }

    try {
      const response = await fetchUser();
      console.log(response);
      localStorage.setItem("username", response.username);
      localStorage.setItem("usertype", response.user_type);
      localStorage.setItem("first_name", response.first_name);
      localStorage.setItem("userId", response.id);
      return response.isActive;
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  };

  const handleClick = async () => {
    const isEmailVerified = await fetchUserProfile();
    if (isEmailVerified) {
      handleClose("email");
      await convertUsertoHost();
      navigate("/host/dashboard/");
    } else {
      alert("Please verify your email first");
    }
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClick}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Verify Your Email</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose("email")}
        sx={{
          position: "absolute",
          left: 20,
          top: 16,
          color: "#000",
          padding: 0,
          margin: 0,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Stack direction={"column"} alignItems={"center"} marginBlock={2}>
          {/* Email Confirmation Message */}
          <Typography
            variant="body1"
            textAlign="center"
            width={"100%"}
            fontSize="1.2rem"
          >
            Please verify your email before proceeding. Click on the button
            below to get a verification email on your registered gmail.
          </Typography>

          {emailSent && (
            <Button
              variant="contained"
              disableRipple
              onClick={handleSendEmail}
              sx={{
                marginTop: "1.5rem",
                backgroundColor: "#f2f2f2",
                width: "fit-content",
                height: "fit-content",
                textTransform: "capitalize",
                color: "#000",
                "&:hover": {
                  color: "#000",
                  backgroundColor: "#f2f2f2",
                },
              }}
            >
              Resend Email
            </Button>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        {/* Proceed Now/Get Email Button */}
        <Button
          sx={{
            textTransform: "initial",
            fontSize: "1.1rem",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            height: "fit-content",
            backgroundColor: theme.palette.primary.dark,
            color: "#fff",
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
          onClick={emailSent ? handleClick : handleSendEmail}
        >
          {emailSent ? "Proceed Now" : "Get Email"}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default VerifyEmail;
