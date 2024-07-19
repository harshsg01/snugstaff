
  import { Box, Button, Grid, Skeleton, Stack, Typography ,useTheme,useMediaQuery} from "@mui/material";
import React, { useState, useEffect } from "react";
import WindowIcon from "@mui/icons-material/Window";
import noimage from "../../../assets/noimage.jpg";
const imageStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  cursor: "pointer",
  transition: "opacity 0.5s ease-in-out",
  "&:hover": {
    opacity: "0.8",
  },
};

const ImageComponent = ({ src, handleClickOpen, style }) => {
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
      <>
        {!imageLoaded && (
          <Skeleton
            sx={{ borderRadius: "20px", backgroundColor: "f2f2f2" }}
            variant="rectangular"
            animation="wave"
            width={"100%"}
            height={"100%"}
          />
        )}

        {imageLoaded && (
          <img
            onClick={handleClickOpen}
            src={src}
            onError={(e) => {
              e.target.src = noimage;
            }}
            alt="image1"
            style={{
              ...imageStyles,
              ...style,
              opacity: imageLoaded ? 1 : 0,
            }}
          />
        )}
      </>
    </>
  );
};

const ImageSection = ({ handleClickOpen, images, featured, showcases }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      direction="row"
      spacing={0.25}
      height={isMd ?"40vh" :"70vh"}
      alignContent="stretch"
    >
      {showcases[0] && (
        <Box
          sx={{
            borderRadius: "2rem 0rem 0rem 2rem",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <ImageComponent
            src={showcases[0].raw_image || noimage}
            hash={showcases[0].hash}
            handleClickOpen={handleClickOpen}
            style={{ borderRadius: "2rem 0rem 0rem 2rem" }}
          />
        </Box>
      )}

      {showcases.length > 2 && (
        <Grid container spacing={1} style={{ height: "100%", width: "50%" }}>
          {showcases[1] && (
            <Grid
              item
              xs={12}
              style={{
                height: "50%",
                borderRadius: "0rem 2rem 0rem 0rem",
                overflow: "hidden",
                paddingTop: 0,
              }}
            >
              <ImageComponent
                src={showcases[1].raw_image || noimage}
                hash={showcases[1].hash}
                handleClickOpen={handleClickOpen}
                style={{ borderRadius: "0rem 2rem 0rem 0rem" }}
              />
            </Grid>
          )}

          {showcases[2] && (
            <Grid
              item
              xs={12}
              style={{
                height: "50%",
                position: "relative",
                borderRadius: "0rem 0rem 2rem 0rem",
                overflow: "hidden",
              }}
            >
              <ImageComponent
                src={showcases[2].raw_image || noimage}
                hash={showcases[2].hash}
                handleClickOpen={handleClickOpen}
                style={{ borderRadius: "0rem 0rem 2rem 0rem" }}
              />
              {showcases.length + images.length > 3 && (
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "2rem",
                    color: "#000",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#fff",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  <WindowIcon sx={{ color: "#000", fontSize: "1rem" }} />
                  <Typography
                    sx={{
                      marginLeft: "0.4rem",
                      color: "#000",
                      textTransform: "initial",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    {showcases.length + images.length - 3} more images..
                  </Typography>
                </Button>
              )}
            </Grid>
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default ImageSection;
