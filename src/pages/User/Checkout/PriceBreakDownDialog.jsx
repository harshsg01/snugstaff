import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";

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

const PriceBreakDownDialog = ({
  open,
  handleClose,
  price,
  days,
  guests,
  serviceFee,
}) => {
  const mainCharges = price * days * guests;
  const subtotal = serviceFee ? mainCharges + serviceFee : mainCharges;
  const vat = (subtotal * 20) / 100;
  const total = subtotal + vat;

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Price Breakdown</DialogTitle>
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
        <Box>
          {/* Price */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            paddingBlock={"0.6rem"}
          >
            <Typography
              fontSize={"1rem"}
              fontFamily={"Inter"}
              variant="subtitle1"
              fontWeight={400}
            >
              {days} Nights Stay x {guests} Guests
            </Typography>
            
            <Typography
              fontSize={"1rem"}
              fontFamily={"Inter"}
              variant="subtitle1"
              fontWeight={400}
            >
              £ {mainCharges}
            </Typography>
          </Box>

          {/* Service Fee */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            paddingBlock={"0.6rem"}
          >
            <Typography
              fontSize={"1rem"}
              fontFamily={"Inter"}
              variant="subtitle1"
              fontWeight={400}
            >
              Cleaning Fees
            </Typography>
            <Typography
              fontSize={"1rem"}
              fontFamily={"Inter"}
              variant="subtitle1"
              fontWeight={400}
            >
              £ {serviceFee ? serviceFee : 0}
            </Typography>
          </Box>

          <Divider style={{ marginBlock: "0.5rem 1rem" }} />

          {/* SubTotal */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            marginBottom={"0.4rem"}
          >
            <Typography
              fontSize={"1rem"}
              fontFamily={"Inter"}
              variant="subtitle1"
              fontWeight={600}
            >
              Subtotal
            </Typography>
            <Typography
              fontSize={"1rem"}
              fontFamily={"Inter"}
              variant="subtitle1"
              fontWeight={600}
            >
              £ {subtotal}
            </Typography>
          </Box>

          {/* VAT */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            paddingBlock={"0.6rem"}
          >
            <Typography
              fontSize={"1rem"}
              fontFamily={"Inter"}
              variant="subtitle1"
              fontWeight={400}
            >
              VAT @ 20%
            </Typography>
            <Typography
              fontSize={"1rem"}
              fontFamily={"Inter"}
              variant="subtitle1"
              fontWeight={400}
            >
              £ {vat}
            </Typography>
          </Box>
        </Box>

        <Divider style={{ marginBlock: "0.5rem 1rem" }} />

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Typography
            fontSize={"1rem"}
            fontFamily={"Inter"}
            variant="subtitle1"
            fontWeight={600}
          >
            Total
          </Typography>
          <Typography
            fontSize={"1rem"}
            fontFamily={"Inter"}
            variant="subtitle1"
            fontWeight={600}
          >
            £ {total}
          </Typography>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default PriceBreakDownDialog;
