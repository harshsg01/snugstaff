import { useState, useMemo } from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { post } from "../../../../utils/Api";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";

const listcerts = [
  {
    id: 1,
    title: "Electrical Certificate",
    name: "electrical_cert",
  },
  {
    id: 2,
    title: "Gas Certificate",
    name: "gas_cert",
  },
  {
    id: 3,
    title: "Fire Certificate",
    name: "fire_cert",
  },
  {
    id: 4,
    title: "Public Liability Insurance",
    name: "public_liability_insurance",
  },
];

const Step6 = ({ onNext, onBack, files, setFiles, ButtonStyles }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const creator = localStorage.getItem("userId");

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFiles((prev) => ({
      ...prev,
      [name]: files[0],
      creator: creator,
    }));
  };

  const isValid = useMemo(
    () =>
      files?.electrical_cert ||
      files?.gas_cert ||
      files?.fire_cert ||
      files?.public_liability_insurance,
    [files]
  );

  const handleNext = () => {
    if (!isValid) {
      setFiles({});
      onNext();
      return;
    }
    onNext();
  };
  return (
    <>
      <Grid container spacing={4} paddingTop={"4rem"} style={{width:"100%"}}>
        {listcerts.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id} style={{paddingLeft:"15px"}}>
            <Box>
              <Typography
                variant="h6"
                fontSize={"20px"}
                gutterBottom
                textAlign={"center"}
              >
                Add a {item.title}
              </Typography>
            </Box>

            <Box>
              <input
                type="file"
                accept="image/*, .pdf"
                id={`image-upload-${item.id}`}
                style={{ display: "none" }}
                onChange={handleFileChange}
                name={item.name}
              />
              <label
                style={{ cursor: "pointer", width: "100%" }}
                htmlFor={`image-upload-${item.id}`}
              >
                <Stack
                  border="3px dashed #ddd"
                  borderRadius={2}
                  // style={{ width: "100%", height: "100%" }}
                  justifyContent="center"
                  alignItems="center"
                  draggable={false}
                  padding={isMd ? "2rem" : "4rem"}
                  marginBottom={isMd && "1rem"}
                >
                  <AddPhotoAlternateIcon fontSize="large" color="primary" />
                  <Typography sx={{ marginTop: "1rem", fontSize: "1.1rem" }}>
                    {files[item.name]
                      ? files[item.name].name
                      : " Upload Your File(s) here"}
                  </Typography>
                </Stack>
              </label>
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* Buttons */}
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        paddingTop={"4rem"}
      >
        <Button
          style={ButtonStyles}
          variant="contained"
          color="primary"
          onClick={onBack}
        >
          Back
        </Button>
        {isValid ? (
          <Button
            style={ButtonStyles}
            disabled={!isValid}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
          </Button>
        ) : (
          <Button
            style={ButtonStyles}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Skip
          </Button>
        )}
      </Stack>
    </>
  );
};

export default Step6;
