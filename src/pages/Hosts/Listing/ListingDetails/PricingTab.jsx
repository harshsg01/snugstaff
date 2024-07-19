import React, { useState } from "react";
import { Divider, Stack, Typography, styled, useTheme } from "@mui/material";
import SetPricingDialog from "./SetPricingDialog";
import { Link, useNavigate } from "react-router-dom/dist";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 500,
  marginBottom: theme.spacing(3),
}));

const EditButton = ({ handleOpen, text }) => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        fontSize: "1.2rem",
        fontWeight: 400,
        textDecoration: "underline",
        color: "#000",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          color: theme.palette.primary.main,
        },
      }}
      onClick={handleOpen}
    >
      {text}
    </Typography>
  );
};

const BasicColumn = ({ heading, subheading, handleOpen }) => {
  return (
    <Stack direction={"column"} spacing={2.5}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"column"} spacing={0.5}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 400,
            }}
          >
            {heading}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: "0.9rem",
              fontWeight: 300,
              fontFamily: "Inter",
            }}
          >
            {subheading}
          </Typography>
        </Stack>

        <EditButton handleOpen={handleOpen} text={"Edit"} />
      </Stack>

      <Divider sx={{ marginBlock: "2rem 3rem" }} />
    </Stack>
  );
};

const styles = {
  marginBlock: "0.5rem 0rem",
  fontSize: "1rem",
  fontWeight: 300,
  fontFamily: "Inter",
  cursor: "pointer",
};

const PricingTab = ({ listing, setListing, error }) => {
  const [pricing, setPricing] = useState(listing.pricing || 0);
  const [serviceFee, setServiceFee] = useState(listing.service_fees || 0);
  const [subscriptionType, setSubscriptionType] = useState(
    listing.subscription_plan || "none"
  );
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleTermsnavigate = () => {
    navigate("/terms");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
      <Stack spacing={5} marginBottom={2}>
        <Heading>Pricing</Heading>
        <BasicColumn
          heading={"Nightly Price"}
          subheading={`Base Price: ${pricing} GBP`}
          handleOpen={handleOpen}
        />
        <BasicColumn
          heading={"Cleaning Fees"}
          subheading={`${serviceFee} GBP`}
          handleOpen={handleOpen}
        />
        <BasicColumn
          heading={"Subscription Type"}
          subheading={subscriptionType}
          handleOpen={handleOpen}
        />
      </Stack>

      <Typography variant="body2" sx={styles} onClick={handleTermsnavigate}>
        *<Link to="/terms">Terms and Conditions </Link>
        applied to all prices.
      </Typography>

      <SetPricingDialog
        listing={listing}
        pricing={pricing}
        setPricing={setPricing}
        serviceFee={serviceFee}
        setServiceFee={setServiceFee}
        setListing={setListing}
        open={open}
        handleClose={handleClose}
        subscriptionType={subscriptionType}
        setSubscriptionType={setSubscriptionType}
      />
    </Stack>
  );
};

export default PricingTab;
