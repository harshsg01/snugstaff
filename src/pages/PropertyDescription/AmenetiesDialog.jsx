import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

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
  borderRadius: "200px"
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: 400,
  marginBottom: theme.spacing(1.5),
}));

const AmenetiesDialog = ({ open, handleClose, amenetiesData }) => {

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Ameneties</DialogTitle>
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
        <Heading>What this place offers</Heading>
        {amenetiesData.map((item, index) => {
          return (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingBlock: "1rem",
                borderBottom: "1px solid #ebebeb",
              }}
              key={index}
            >
              <i
                className={item.icon}
                style={{
                  fontSize: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  marginRight: "1.5rem",
                }}
              ></i>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Inter",
                  fontWeight: "400",
                }}
              >
                {item.ammenetie_name}
              </Typography>
            </Box>
          );
        })}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default AmenetiesDialog;
