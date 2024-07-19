import { Stack, TextField, Typography, styled } from "@mui/material";
import React, { useState } from "react";

const PriceSection = styled(Stack)(
  ({ theme }) => `
          width: 100%;
          border-radius: 8px;
          margin-bottom: ${theme.spacing(3)};
        `
);

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 400,
  marginBottom: theme.spacing(0.6),
}));

const Pricing = ({
  pricePerNight,
  setPricePerNight,
  serviceFees,
  setServiceFees,
}) => {
  const handlePriceChange = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setPricePerNight(event.target.value);
  };

  const handleServiceFeeChange = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setServiceFees(e.target.value);
  };

  return (
    <PriceSection>
      <Heading>Set Pricing</Heading>
      <Typography marginBottom={4} variant="subtitle1" gutterBottom>
        Please ensure you include your VAT rates. ( Inclusive Rates of VAT )
      </Typography>
      <TextField
        sx={{ marginBottom: 3 }}
        fullWidth
        label="Charge per night per head (£)"
        type="tel"
        id="chargepernightperhead"
        value={pricePerNight}
        onChange={handlePriceChange}
      />

      <TextField
        sx={{ marginBottom: 2 }}
        fullWidth
        label="Cleaning Fees"
        type="tel"
        id="serviceFees"
        value={serviceFees}
        onChange={handleServiceFeeChange}
      />
    </PriceSection>
  );
};

export default Pricing;
