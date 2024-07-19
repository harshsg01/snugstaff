import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Button, DialogActions } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
    width: "600px",
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
    fontSize: "1.3rem",
    justifyContent: "center",
    alignItems: "center",
  },
  zIndex: 10000,
  borderRadius: "200px",
}));

const DeleteConfirmation = ({ open, handleClose, handleDeleteListing }) => {
  const theme = useTheme();

  const handleButtonClick = () => {
    handleDeleteListing();
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Confirm Delete Listing</DialogTitle>
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
        <Typography>Are you sure want to Delete this Listing ?</Typography>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            textTransform: "initial",
            color: "#fff",
            paddingInline: "2rem",
            backgroundColor: theme.palette.primary.main,
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={handleButtonClick}
        >
          Yes
        </Button>
        <Button
          sx={{
            textTransform: "initial",
            color: "#fff",
            paddingInline: "2rem",
            backgroundColor: theme.palette.primary.main,
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={handleClose}
        >
          No
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DeleteConfirmation;
