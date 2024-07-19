import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addComplainceDocuments } from "../../../data/compliance";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: "1rem 2rem",
    width: "500px",
    borderBottom: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "& .MuiPaper-root": {
    borderRadius: "20px",
    overflowY: "auto",
  },
  "& .MuiDialogActions-root": {
    borderTop: "1px solid #ebebeb",
    padding: theme.spacing(1.5),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 400,
    fontSize: "1.2rem",
  },
  zIndex: 10000,
}));

const ImageInput = ({ index, handleAddPhoto }) => {
  return (
    <input
      type="file"
      id={`fileInput${index}`}
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleAddPhoto(`document${index}`)}
    />
  );
};

const KYC = ({ open, handleClose }) => {
  const theme = useTheme();
  const [documentDetails, setDocumentDetails] = useState({});
  const documentNames = [
    "electrical_cert",
    "fire_cert",
    "gas_cert",
    "public_liability_insurance",
  ];

  const truncateName = (name) => {
    return name.length > 15 ? `${name.slice(0, 15)}...` : name;
  };

  const handleAddPhoto = (label) => async (event) => {
    const file = event.target.files[0];

    if (file) {
      setDocumentDetails((prevDetails) => ({
        ...prevDetails,
        [label]: {
          name: file.name,
          image: file,
        },
      }));
    }
  };

  const handleSubmit = async () => {
    const data = {
      username: "disastrous",
      electrical_cert: documentDetails.document1.image,
      fire_cert: documentDetails.document2.image,
      gas_cert: documentDetails.document3.image,
      public_liability_insurance: documentDetails.document4.image,
    };
    console.log(data);
    const formData = new FormData();

    formData.append("username", "disastrous");
    for (let i = 1; i <= 4; i++) {
      const documentKey = documentNames[i - 1];
      const documentData = documentDetails[`document${i}`];
      if (documentData?.image) {
        formData.append(documentKey, documentData.image);
      }
    }

    try {
      console.log(formData);
      const response = await addComplainceDocuments(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };

  const handleDelete = (index) => {
    setDocumentDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      updatedDetails[`document${index}`] = { name: "", image: "" };
      return updatedDetails;
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
      <DialogTitle id="scroll-dialog-title">
        Submit Necessary Documents
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          left: 20,
          top: 16,
          color: "#000",
          padding: 0,
          margin: 0,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        {/* Document Fields */}
        {[1, 2, 3, 4].map((index) => (
          <Stack
            key={index}
            padding={"0.5rem 0.8rem"}
            border={"1px solid #ccc"}
            borderRadius={"10px"}
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            spacing={1}
            marginBottom={"1rem"}
          >
            {/* Document Name */}
            <Typography
              variant="body1"
              textAlign="left"
              alignItems={"center"}
              gutterBottom
            >
              {index === 1
                ? "Electricity Cert"
                : index === 2
                ? "Fire Cert"
                : index === 3
                ? "Gas Cert"
                : "Public Liability Insurance"}
            </Typography>

            {/* Add Photo Button */}
            {!documentDetails[`document${index}`]?.image && (
              <Button
                color="primary"
                component="label"
                htmlFor={`fileInput${index}`}
                sx={{ padding: 0.9, textTransform: "initial" }}
              >
                Add Photo
                <ImageInput index={index} handleAddPhoto={handleAddPhoto} />
              </Button>
            )}

            {/* Document Name and Image */}
            {documentDetails[`document${index}`]?.image && (
              <Stack direction={"row"} alignItems={"center"} spacing={0.4}>
                <Typography padding={1} variant="body2" textAlign="center">
                  {truncateName(
                    documentDetails[`document${index}`]?.name || ""
                  )}
                </Typography>

                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon sx={{ cursor: "pointer", fontSize: "1.5rem" }} />
                </IconButton>
              </Stack>
            )}
          </Stack>
        ))}
      </DialogContent>

      <DialogActions>
        {/* Submit Documents Button */}
        <Button
          sx={{
            textTransform: "initial",
            fontSize: "1.1rem",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            backgroundColor: theme.palette.primary.dark,
            color: "#fff",
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
          onClick={handleSubmit}
        >
          Submit Documents
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default KYC;
