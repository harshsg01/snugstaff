import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { NavigateBefore } from "@mui/icons-material";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImagesSlider from "./ImagesSlider";
import noimage from "../../../assets/noimage.jpg";
import { useMediaQuery, useTheme } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageComponent = ({ src, handleClickOpen, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      {!imageLoaded && (
        <Skeleton
          sx={{ backgroundColor: "f2f2f2", marginBottom: "10px" }}
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={"50vh"}
        />
      )}
      {imageLoaded && (
        <img
          onClick={() => handleClickOpen(index)}
          src={`${src}?w=162&auto=format`}
          alt={"property-image"}
          onError={(e) => {
            e.target.src = noimage;
          }}
          style={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            display: "block",
            cursor: "pointer",
            transition: "opacity 0.3s ease-in-out",
            opacity: 1,
            width: "100%",
            height: "auto",
            marginBottom: "10px",
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = 0.8;
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = 1;
          }}
        />
      )}
    </>
  );
};

const ImagesGallery = ({
  savetoWishlist,
  open,
  handleCloseGallery,
  propertyImages,
  featured,
  showcases,
}) => {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const handleClickOpen = (index) => {
    setCurrentImageIndex(index);
    setSliderOpen(true);
  };

  const handleClickClose = () => {
    setSliderOpen(false);
  };

  // Function to arrange images in alternating columns with marginBottom
  const arrangeImagesInColumns = (images) => {
    const columns = [[], []];

    images.forEach((item, index) => {
      const columnIndex = index % 2;

      columns[columnIndex].push(
        <ImageComponent
          handleClickOpen={handleClickOpen}
          index={index}
          key={index}
          src={item.raw_image || noimage}
          hash={item.hash}
        />
      );
    });

    return columns;
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseGallery}
        TransitionComponent={Transition}
        style={{
          zIndex: 10000,
          marginTop: "3.7rem",
        }}
      >
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#fff", boxShadow: "none" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              sx={{
                borderRadius: "50%",
                padding: "1rem",
                color: "black",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                },
              }}
              style={{
                width: "1px",
                height: "1px",
              }}
              onClick={handleCloseGallery}
            >
              <NavigateBefore />
            </IconButton>

            <Box>
              <Button
                sx={{
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  transition: "background 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
                onClick={savetoWishlist}
              >
                <FavoriteIcon
                  style={{
                    fontSize: "20px",
                    color: "black",
                  }}
                />
                <Typography
                  sx={{
                    textDecoration: "underline",
                    fontSize: "1.1rem",
                    textTransform: "capitalize",
                    marginLeft: "0.3rem",
                    color: "#000",
                  }}
                >
                  Save
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container
          style={{
            padding: isMd ? null : "10vh 12vw 5vh 12vw",
          }}
        >
          {propertyImages && propertyImages.length > 0 && (
            <Grid container spacing={1}>
              {arrangeImagesInColumns([
                featured,
                ...propertyImages,
                ...showcases,
              ]).map((column, columnIndex) => (
                <Grid item xs={6} key={columnIndex} sx={{ columnGap: "1rem" }}>
                  {column}
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Dialog>

      <ImagesSlider
        open={sliderOpen}
        handleClose={handleClickClose}
        propertyImages={propertyImages}
        featured={featured}
        showcases={showcases}
        currentImageIndex={currentImageIndex}
      />
    </>
  );
};

export default ImagesGallery;
