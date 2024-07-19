import { useState, useMemo } from "react";
import { Grid, Box, Typography, Stack, Button } from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { post } from "../../../../utils/Api";

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

const UploadListingCerts = ({
  listing,
  creator,
  authToken,
  isMd,
  fetchData,
  setListingData,
}) => {
  const [files, setFiles] = useState({});
  const [loading, setloading] = useState(false);

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFiles((prev) => ({
      ...prev,
      [name]: files[0],
      // listing: listing,
      creator: creator,
    }));
  };

  const handleSave = async () => {
    try {
      setloading(true);
      const formData = new FormData();
      for (let fileKey in files) {
        formData.append(fileKey, files[fileKey]);
      }
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const url = `/api/kyc/?listing=${listing}`;
      const response = await post(url, formData, config);
      console.log(response);
      setFiles({});
      setloading(false);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      setloading(false);
      alert("Listing Certificate is not created please try again!")
    }
  };

  const ButtonStyles = useMemo(
    () => ({
      textTransform: "none",
      fontSize: "1.2rem",
    }),
    []
  );
  const isValid = useMemo(
    () =>
      files?.electrical_cert ||
      files?.gas_cert ||
      files?.fire_cert ||
      files?.public_liability_insurance,
    [files]
  );

  return (
    <>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
        spacing={2}
      >
        <Button
          style={ButtonStyles}
          disabled={!isValid}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Stack>

      <Grid container spacing={4} paddingTop={"2rem"}>
        {listcerts.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
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
    </>
  );
};

export default UploadListingCerts;
