import React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import logo from "../../../assets/fav.png";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: "1rem 3rem",
    width: "500px",
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
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
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

const HostSignup = ({ open, handleOpen, handleClose }) => {
  const theme = useTheme();

  const handleClick = () => {
    handleOpen("profile");
    handleClose("signup");
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={() => handleClose("signup")}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Register as Host</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose("signup")}
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
        <img src={logo} width={"20%"} height={"100%"} alt="logo" />

        <Typography
          variant="heading"
          marginBlock="1rem 0.5rem"
          fontSize={"1.2rem"}
        >
          Welcome to SnugStaff
        </Typography>

        <Typography
          variant="body2"
          fontFamily={"Inter"}
          textAlign={"center"}
          fontSize={"0.9rem"}
        >
          Start listing your properties and earn a passive income.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClick}
          sx={{
            textTransform: "initial",
            fontSize: "1.1rem",
            width: "100%",
            borderRadius: "6px",
            backgroundColor: theme.palette.primary.dark,
            color: "#fff",
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
        >
          Get Started
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default HostSignup;
