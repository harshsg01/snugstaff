import React, { useState, useEffect } from "react";
import { Stack, Grid, Button, IconButton } from "@mui/material";
import { saveImage } from "../../../../data/fetchEssentials";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

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
      padding={"2rem"}
    >
      <AddPhotoAlternateIcon fontSize="large" color="primary" />
      <Typography sx={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        Drop Your File(s) here or browse
      </Typography>

      {uploading && (
        <Box sx={{ width: "60%", marginTop: "1rem", display: "flex" }}>
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

const ImageBox = ({ imagesList, setImagesList, images, setImages }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(15);
  const [error, setError] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Function to update session storage with images
  const updateSessionStorage = (images, imagesList) => {
    sessionStorage.setItem('boxImages', JSON.stringify(images));
    sessionStorage.setItem('boxImagesId', JSON.stringify(imagesList));
  };

  useEffect(() => {
    // Retrieve images from session storage when component mounts
    const storedImages = sessionStorage.getItem('boxImages');
    const storedImagesid = sessionStorage.getItem('boxImagesId');
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
    if (storedImagesid) {
      setImagesList(JSON.parse(storedImagesid));
    }
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
      incrementProgress(40);

      if (event.target.files.length > 15) {
        console.error("Please select only up to 15 images.");
        setError(true);
        setUploading(false);
        return;
      }

      if (images?.length + event.target.files.length > 15) {
        console.error("Please select only up to 15 images.");
        setError(true);
        setUploading(false);
        return;
      }

      if (
        images?.length + event.target.files.length < 16 ||
        event.target.files.length === 15
      ) {
        setError(false);
      }

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

      // Update session storage with new images
      updateSessionStorage([...images, ...newImages], [...imagesList, ...imageIds]);

      setUploading(false);
      setError(false);
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

    // Update session storage after removing image
    updateSessionStorage(images.filter((_, index) => index !== imgIndex), imagesList.filter((_, index) => index !== imgIndex));
  };

  return (
    <Stack>
      {/* Heading */}
      <Typography marginBottom={0.5} variant="h5" gutterBottom>
        Add Gallery Images
      </Typography>

      <Typography marginBottom={3} variant="subtitle1" gutterBottom>
        ( Gallery images will be shown in the images gallery in the Property
        Description Page )
      </Typography>

      {/* No images selected yet */}
      {error && (
        <Box paddingBottom={3}>
          <Typography variant="body1" color={"red"}>
            Upload max 15 photos
          </Typography>
        </Box>
      )}

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
            {images.map((image, index) => (
              <Grid
                style={{
                  padding: "0px 10px 10px 0px",
                  width: "100%",
                  height: "18rem",
                  position: "relative",
                }}
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={4}
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
    </Stack>
  );
};

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ImageBox;
