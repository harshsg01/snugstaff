import React, { useState, useRef, useEffect } from "react";
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
  Typography,
  Switch,
  Divider,
} from "@mui/material";
import { guestDetailsData } from "../../../data/data";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(1.5),
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

const GuestMenu = ({ stayDetails, setStayDetails }) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const incrementValue = (property) => {
    setStayDetails({
      ...stayDetails,
      [property]: stayDetails[property] + 1,
    });
  };

  const decrementValue = (property) => {
    // if (stayDetails[property] === 2) {
    //   return;
    // }
    setStayDetails({
      ...stayDetails,
      [property]: stayDetails[property] - 1,
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          width: "100%",
          textAlign: "left",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: "50px",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              fontSize={"1.2rem"}
            >
              Parking
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: "1rem" }}
              color={"grey"}
            >
              Choose if you need parking
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Switch
              {...label}
              checked={stayDetails.parking}
              onChange={() =>
                setStayDetails({
                  ...stayDetails,
                  parking: !stayDetails.parking,
                })
              }
            />
          </Box>
        </Box>
        <Divider sx={{ color: "#000" }} />
      </Box>

      {/* <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Typography
          variant="subtitle1"
          fontFamily={"Inter"}
          fontSize={"0.8rem"}
          fontWeight={300}
          marginBlock={"1rem 0.5rem"}
        >
          *A minimum of 2 persons rate will be applied
        </Typography>
       </Box> */}

      {guestDetailsData.map((data) => {
        const value = stayDetails[data.value];
        return (
          <Box
            key={data.index}
            sx={{
              marginBlock: "0.5rem",
              display: "flex",
              alignItems: "left",
              width: "100%",
              textAlign: "left",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "left",
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: "50px",
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={400}
                  fontSize={"1.2rem"}
                >
                  {data.heading}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ marginBottom: "1rem" }}
                  color={"grey"}
                >
                  {data.subHeading}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  fontWeight={400}
                  onClick={() => decrementValue(data.value)}
                  color={"grey"}
                  sx={{
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundColor: "#f2f2f2",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Typography>

                <Typography
                  color={"black"}
                  textAlign={"center"}
                  style={{
                    textAlign: "center",
                  }}
                >
                  {value}
                </Typography>

                <Typography
                  color={"grey"}
                  onClick={() => incrementValue(data.value)}
                  sx={{
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundColor: "#f2f2f2",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddIcon fontSize="small" />
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

const StayDetailsDialog = ({
  open,
  handleClose,
  stayDetails,
  setStayDetails,
}) => {
  const theme = useTheme();

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Stay Details</DialogTitle>
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
        <GuestMenu stayDetails={stayDetails} setStayDetails={setStayDetails} />
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

export default StayDetailsDialog;
