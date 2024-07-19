import React, { useState } from "react";
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
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

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

const DetailsDialog = ({
  open,
  handleClose,
  bookingEssentials,
  setBookingEssentials,
}) => {
  const theme = useTheme();
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const {
    registeredCompanyName,
    companyNameHouseRegistrationNumber,
    vatRegistrationNumber,
  } = bookingEssentials;

  const handleValueChange = (e) => {
    setBookingEssentials({
      ...bookingEssentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Booking Essentials</DialogTitle>
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
            label="Registered Company Name"
            variant="outlined"
            type="text"
            name="registeredCompanyName"
            value={registeredCompanyName}
            onChange={handleValueChange}
          />
          {/* <TextField
            id="outlined-basic"
            label="Company's House Registration Number"
            variant="outlined"
            type="tel"
            name="companyNameHouseRegistrationNumber"
            value={companyNameHouseRegistrationNumber}
            onChange={handleValueChange}
          /> */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                fontSize={"1.2rem"}
              >
                VAT Registration
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ marginBottom: "1rem" }}
                color={"grey"}
              >
                Is your company VAT registered?
              </Typography>
            </Box>

            <Stack spacing={2} direction={"row"}>
              <Button
                sx={{
                  textTransform: "none",
                  backgroundColor: bookingEssentials.vatRegistrationNumber
                    ? theme.palette.primary.main
                    : "#fff",
                  borderRadius: "20px",
                  padding: "0.5rem 1.5rem",
                  transition: "all 0.3s ease",
                  color: bookingEssentials.vatRegistrationNumber
                    ? "#fff"
                    : theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                onClick={() => {
                  setBookingEssentials({
                    ...bookingEssentials,
                    vatRegistrationNumber: true,
                  });
                }}
              >
                Yes
              </Button>

              <Button
                sx={{
                  textTransform: "none",
                  backgroundColor: !bookingEssentials.vatRegistrationNumber
                    ? theme.palette.primary.main
                    : "#fff",
                  borderRadius: "20px",
                  padding: "0.5rem 1.5rem",
                  transition: "all 0.3s ease",
                  color: !bookingEssentials.vatRegistrationNumber
                    ? "#fff"
                    : theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                onClick={() => {
                  setBookingEssentials({
                    ...bookingEssentials,
                    vatRegistrationNumber: false,
                  });
                }}
              >
                No
              </Button>
            </Stack>
          </Stack>
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
          onClick={handleClose}
        >
          Add
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DetailsDialog;
