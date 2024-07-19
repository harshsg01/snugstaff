import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  DialogActions,
} from "@mui/material";
import Calendar from "../../../components/common/Calendar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    paddingBlock: theme.spacing(1),
    paddingInline: theme.spacing(4),
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

const DatesDialog = ({ open, handleClose }) => {
  const theme = useTheme();

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Booking Dates</DialogTitle>
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
        <Calendar minimumDays={4} />
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
          onClick={handleClose}
        >
          Apply Changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DatesDialog;
