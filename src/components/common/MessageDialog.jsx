import React from "react";
import {
  Box,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Button, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog, selectDialog } from "../../store/slices/DialogSlice";
import { useLocation, useNavigate } from "react-router";

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

const MessageDialog = ({ redirect }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { message, open } = useSelector(selectDialog);

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const handleSubmission = () => {
    dispatch(closeDialog());
    navigate(`/`);
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Message</DialogTitle>
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

      <Box dividers sx={{
        padding:".4rem 1.4rem"
      }}>
        <Typography>{message}</Typography>
      </Box>

      <DialogActions>
        <Button
          sx={{
            textTransform: "initial",
            color: "#fff",
            paddingInline: "1rem",
            backgroundColor: theme.palette.primary.main,
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={redirect ? handleSubmission : handleClose}
        >
          Okay, Got it
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default MessageDialog;
