import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, DialogActions, TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
    width: "500px",
  },
  "& .MuiPaper-root": {
    borderRadius: "20px",
  },
  "& .MuiDialogActions-root": {
    borderTop: "1px solid #ebebeb",
    padding: theme.spacing(1.5),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  "& .MuiDialogTitle-root": {
    borderBottom: "1px solid #ebebeb",
    textAlign: "center",
    display: "flex",
    fontWeight: 400,
    fontSize: "1.2rem",
    justifyContent: "center",
    alignItems: "center",
  },
  zIndex: 10000,
  borderRadius: "200px",
}));

const ProfileDialog = ({ open, handleClose, profileInfo, setProfileInfo, handleUpdateUser }) => {
  const theme = useTheme();

  const handleValueChange = (e) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const { name, email, address, phone } = profileInfo;

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Personal Info</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          left: 20,
          padding: 0,
          top: 20,
          color: "#000",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          gap={4}
        >
          <TextField
            id="outlined-basic"
            label="Your Name"
            required
            variant="outlined"
            type="text"
            name="name"
            value={name}
            onChange={handleValueChange}
          />
          {/* <TextField
            id="outlined-basic"
            label="Your Email"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            inputProps={{style: {color:'#a09999'}}}

          /> */}
          <TextField
            id="outlined-basic"
            label="Your Phone Number"
            variant="outlined"
            type="tel"
            name="phone"
            value={phone}
            onChange={handleValueChange}
          />
          <TextField
            id="outlined-basic"
            label="Your Address"
            variant="outlined"
            type="text"
            name="address"
            value={address}
            onChange={handleValueChange}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            textTransform: "initial",
            fontSize: "1.1rem",
            padding: "0.5rem 1.5rem",
            borderRadius: "10px",
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
          onClick={handleUpdateUser}
        >
          Add
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ProfileDialog;
