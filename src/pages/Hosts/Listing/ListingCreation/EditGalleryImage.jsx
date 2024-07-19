import React, { useState, useEffect } from "react";
import { Stack, Grid, Button, IconButton } from "@mui/material";
import { saveImage } from "../../../../data/fetchEssentials";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { editListing } from "../../../../data/fetchListings";
import { fetchoneListing } from "../../../../data/fetchListings";
import { useParams } from "react-router";

function LinearProgressWithLabel(props) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%", mt: 1, mb: 2 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Completed {props.value} %
        </Typography>
      </Box>
    </Box>
  );
}

const ImageUploader = ({ onImageChange, progress, uploading, buffer }) => {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      onImageChange({
        target: {
          files: files,
        },
      });
    }
  };

  return (
    <Stack
      border="3px dashed #ddd"
      borderRadius={2}
      style={{ width: "100%", height: "100%" }}
      justifyContent="center"
      alignItems="center"
      onChange={onImageChange}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      draggable={false}
      padding={"1.4rem"}
    >
      <AddPhotoAlternateIcon fontSize="large" color="primary" />
      {/* <Typography sx={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        Add image
      </Typography> */}

      {uploading && (
        <Box sx={{ width: "100%", marginTop: "1rem", display: "flex" }}>
          <LinearProgressWithLabel
            value={progress}
            variant="buffer"
            valueBuffer={buffer}
          />
        </Box>
      )}
    </Stack>
  );
};

const EditImageBox = (existingimage) => {
  const [imagesList, setImagesList] = useState([]);
  const [images, setImages] = useState([]);
  const [imageerror,setImageerror] = useState('')
  const [listing, setListing] = useState({});
  const [error, setError] = useState(false);
  const { propertyId } = useParams();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(15);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchListing = async () => {
    try {
      const data = {
        id: propertyId,
      };
      const response = await fetchoneListing(data);
      console.log(response);
      if (!response.id) {
        // setError(true);
        throw new Error("Something went wrong");
      }
      setListing(response);
    } catch (error) {
      console.error("Error fetching listing:", error);
      setError(true);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchListing();
    window.scrollTo(0, 0);
  }, []);

  const incrementProgress = (number) => {
    setProgress((prevProgress) => {
      if (prevProgress >= 100) {
        return prevProgress;
      } else if (number && prevProgress >= 100) {
        return number;
      } else {
        return prevProgress + 10;
      }
    });
    setBuffer((prevProgress) => {
      if (prevProgress >= 100) {
        return prevProgress;
      } else {
        return prevProgress + Math.random() * 15;
      }
    });
  };

  const sendImagetoAPI = async (image) => {
    try {
      const formData = new FormData();
      formData.append("raw_image", image);
      const response = await fetch(`${apiUrl}/api/images/`, {
        method: "POST",
        body: formData,
      });
      const json = await response.json();

      const imageId = json.response.id;

      if (json.error) {
        console.error(json.error);
      } else {
        return imageId;
      }
    } catch (error) {
      console.error("Error sending image to API:", error);
      throw error; // Propagate the error for handling in the caller
    }
  };

  const onImageChange = async (event) => {
    try {
      setUploading(true);
      incrementProgress(30);

      const uploadPromises = Array.from(event.target.files).map((file) =>
        sendImagetoAPI(file)
      );

      // Wait for all asynchronous requests to complete
      const imageIds = await Promise.all(uploadPromises);
      incrementProgress(80);

      console.log(imageIds);

      // Update the state with the results
      await setImagesList((prevImagesList) => [...prevImagesList, ...imageIds]);
      incrementProgress();

      // Display selected images
      const newImages = await Promise.all(
        Array.from(event.target.files).map(
          (file) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                resolve(e.target.result);
              };
              reader.readAsDataURL(file);
            })
        )
      );
      incrementProgress();

      setImages([...images, ...newImages]);
      setUploading(false);
      setProgress(0);
      setBuffer(10);
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploading(false);
      setProgress(0);
      setBuffer(10);
    }
  };

  const removeImage = (imgIndex) => {
    setImages((prevImages) =>
      prevImages.filter((id, index) => index !== imgIndex)
    );
    console.log(imagesList);
    setImagesList((prevImagesList) =>
      prevImagesList.filter((id, index) => index !== imgIndex)
    );
  };

  const handleEditClick = async () => {
    const existingImages = existingimage?.existingimage || [];

    const existingImageIds = existingImages.map((image) => image.id);
    console.log(existingImageIds); // Log all existing image ids

    try {
      // Append existing image ids to the imagesList array
      const updatedImagesList = [...imagesList, ...existingImageIds];

      const data = {
        uid: listing.id,
        property_images: updatedImagesList,
      };
      console.log(data);
      if (updatedImagesList.length < 15) {
        const response = await editListing(data);
        window.location.reload();
      } else {
        console.log("Error: Upload max 15 photos ");
        setImageerror('Upload max 15 photos')
        // Handle the case where there are not enough images selected
      }
      // setListing(response);
    } catch (error) {
      console.log(error);
      // setError(error);
    // } finally {
    //   setLoading(false);
    //   window.scrollTo(0, 0);
    //   handleClose();
    }
  };

  return (
    <Stack>
      {/* Heading */}
      {/* <Typography marginBottom={0.5} variant="h5" gutterBottom>
        Add Gallery Images
      </Typography>
      <Typography marginBottom={3} variant="subtitle1" gutterBottom>
        ( Gallery images will be shown in the images gallery in the Property
        Description Page )
      </Typography> */}

      {/* No images selected yet */}
      {/* {images?.length > 0 && images?.length < 3 && (
        <Box paddingBottom={3}>
          <Typography variant="body1" color={"red"}>
            Select a minimum of 3 images
          </Typography>
        </Box>
      )} */}

      {/* Box for adding images */}
      <input
        type="file"
        accept="image/*"
        id="image-upload-3"
        multiple
        style={{ display: "none" }}
        onChange={onImageChange}
      />
      <label
        style={{ cursor: "pointer", width: "100%" }}
        htmlFor="image-upload-3"
      >
        {/* Grey Box */}
        <ImageUploader
          onImageChange={onImageChange}
          progress={progress}
          uploading={uploading}
          buffer={buffer}
        />
      </label>
      {imageerror === 'Upload max 15 photos' && (
        <Typography variant="body1" color={"red"} style={{fontSize:'15px'}}>
            * Upload max 15 photos
          </Typography>
      )}

      {/* Display selected images side by side */}
      <Stack
        marginTop={4}
        width={"100%"}
        direction={"column"}
        justifyContent={"flex-start"}
        spacing={1}
      >
        {/* Display selected images side by side */}
        {images && (
          <Grid container>
            {images?.map((image, index) => (
              <Grid
                style={{
                  padding: "0px 10px 10px 0px",
                  width: "100%",
                  height: "5rem",
                  position: "relative",
                }}
                key={index}
                // xs={12}
                // sm={6}
                // md={4}
                // lg={4}
                item
              >
                <img
                  src={image}
                  alt={"selected-images"}
                  style={{
                    paddingTop: 0,
                    borderRadius: 8,
                    width: "100%",
                    height: "100%",
                  }}
                />
                <IconButton
                  aria-label="more"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 20,
                    zIndex: 1000,
                    backgroundColor: "#fff",
                  }}
                  onClick={() => removeImage(index)}
                >
                  <CloseIcon sx={{ fontSize: "1rem", color: "#000" }} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
      
      <Button
          sx={{
            textTransform: "initial",
            fontSize: "1rem",
            padding: "0.5rem 0.5rem",
            borderRadius: "10px",
            backgroundColor: '#033557',
            color: "#fff",
            "&:hover": {
              backgroundColor: "#000",
            },
            margin:'20px 0px'
          }}
          onClick={handleEditClick}
        >
          Apply Changes
        </Button>
    </Stack>
  );
};

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default EditImageBox;