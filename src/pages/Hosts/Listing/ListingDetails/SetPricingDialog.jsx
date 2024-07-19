import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Stack, TextField, Checkbox } from "@mui/material";
import { editListing } from "../../../../data/fetchListings";
import { initiateSubscription } from "../../../../data/subscription";
import { useNavigate } from "react-router-dom/dist";

// Styled Component
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
    width: "600px",
  },
  "& .MuiPaper-root": {
    borderRadius: "20px",
    overflowY: "auto",
  },
  "& .MuiDialogActions-root": {
    borderTop: "1px solid #ebebeb",
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  "& .MuiDialogTitle-root": {
    borderBottom: "1px solid #ebebeb",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  zIndex: 10000,
}));

const PriceSection = styled(Stack)(
  ({ theme }) => `
          width: 100%;
          border-radius: 8px;
          margin-bottom: ${theme.spacing(3)};
        `
);

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 400,
  marginBottom: theme.spacing(2),
}));

const SetPricingDialog = ({
  pricing,
  setPricing,
  listing,
  setListing,
  open,
  handleClose,
  serviceFee,
  setServiceFee,
  subscriptionType,
  setSubscriptionType,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const navigate = useNavigate()

  const handlePriceChange = (event) => {
    setPricing(event.target.value);
  };

  const handleServiceFeeChange = (event) => {
    setServiceFee(event.target.value);
  };

  const handleEditClick = async () => {
    console.log("called")
    try {
      const data = {
        uid: listing.id,
        pricing: pricing,
        service_fees: serviceFee,
      };
      console.log(data);
      const response = await editListing(data);
      console.log(response);
      setListing(response);
      if (response.id) {
        const newResponse = await initiateSubscription(
          response.id,
          subscriptionType
        );
        console.log(newResponse);
        if (newResponse.session_url) {
          window.location.href = newResponse.session_url;
        } else {
          handleClose();
          window.location.reload();
        }
      } else {
        const keys = Object.keys(response);
        const errorPlaces = keys.join(" and ");
        alert(
          `Something went wrong with ${errorPlaces}. Please add them again or try again later.`
        );
        handleClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      window.scrollTo(0, 0);
    }
  };

  const handleChangeSubscription = (type) => {
    setSubscriptionType(type);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleTermsclick = () => {
    navigate("/terms")
  }

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Edit Pricing</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          left: 10,
          top: 16,
          color: "#000",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <PriceSection>
          {/* Pricing */}
          <Stack>
            <Heading>Set Pricing</Heading>

            <TextField
              sx={{ marginBottom: 2 }}
              fullWidth
              id="pricing"
              type="tel"
              value={pricing}
              onChange={handlePriceChange}
              label="Charge per night per head (£)"
            />
          </Stack>

          {/* Service Fees */}
          <Stack>
            <Heading>Set Service Fees</Heading>

            <TextField
              sx={{ marginBottom: 2 }}
              fullWidth
              id="serviceFees"
              type="tel"
              value={serviceFee}
              onChange={handleServiceFeeChange}
              label="Cleaning Fees"
            />
          </Stack>

          {/* Changing Subscription Type */}
          <Stack
            width={"100%"}
            marginTop={2}
            marginBottom={2}
            direction="column"
            justifyContent="flex-start"
          >
            <Heading>Change your Subscription Plan</Heading>

            <Stack direction="row" spacing={2} justifyContent="flex-start">
              <Button
                onClick={() => handleChangeSubscription("month")}
                sx={{
                  textTransform: "none",
                  backgroundColor:
                    subscriptionType === "month"
                      ? theme.palette.primary.main
                      : "#fff",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  transition: "all 0.3s ease",
                  color:
                    subscriptionType === "month"
                      ? "#fff"
                      : theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                Monthly Subscription
              </Button>
              <Button
                onClick={() => handleChangeSubscription("commission")}
                sx={{
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    subscriptionType === "commission"
                      ? theme.palette.primary.main
                      : "#fff",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  color:
                    subscriptionType === "commission"
                      ? "#fff"
                      : theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                Commission on Bookings
              </Button>
            </Stack>
          </Stack>

          {/* Checkbox */}
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              color="primary"
            />
            <Typography style={{marginTop:"30px", cursor:"pointer"}} onClick={handleTermsclick}>Click this to acknowledge that if your listing has trademark or 
            watermark on your images. Your Property will not be approved.</Typography>
          </Stack>
        </PriceSection>
      </DialogContent>

      <DialogActions>
      <Button
  sx={{
    textTransform: "initial",
    fontSize: "1.1rem",
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
    },
    // Conditionally change background color to light grey if disabled
    ...(isChecked ? {} : { backgroundColor: "#f2f2f2", color: "#a8a8a8" }),
  }}
  onClick={handleEditClick}
  disabled={!isChecked} // Disable button if checkbox is not checked
>
  Apply Changes
</Button>

      </DialogActions>
    </BootstrapDialog>
  );
};

export default SetPricingDialog;

