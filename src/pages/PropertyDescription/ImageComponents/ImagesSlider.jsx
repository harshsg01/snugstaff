import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { Box, Skeleton, useTheme, useMediaQuery } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import noimage from "../../../assets/noimage.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Blurhash } from "react-blurhash";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageComponent = ({ src, hash }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
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
            style={{
              width: "100%",
              height: "60vh",
              objectFit: "contain",
            }}
            src={src}
            onError={(e) => {
              e.target.src = noimage;
            }}
            alt={"property-image"}
          />
        )}
      </>
    </>
  );
};

const ImagesSlider = ({
  open,
  handleClose,
  propertyImages,
  featured,
  currentImageIndex,
  showcases,
}) => {
  const sliderRef = useRef(null);
  const totalImages = propertyImages.length + showcases.length + 1;
  const recentIndex = currentImageIndex + 1;
  const [currentIndex, setCurrentIndex] = useState(recentIndex || 2);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const handlePreviousClick = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slidePrev();
    }
    if (currentIndex === 1) {
      setCurrentIndex(totalImages);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slideNext();
    }
    if (currentIndex === totalImages) {
      setCurrentIndex(1);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    setCurrentIndex(currentImageIndex + 1);
  }, [currentImageIndex]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      style={{
        zIndex: 10000,
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#000", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: "2rem",
          }}
        >
          <IconButton
            sx={{
              borderRadius: "50%",
              padding: "1rem",
              color: "white",
              backgroundColor: "#000",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#858585",
              },
            }}
            style={{
              width: "1px",
              height: "1px",
            }}
            onClick={handleClose}
          >
            <NavigateBefore />
          </IconButton>

          <Typography sx={{ fontWeight: 400, color: "#fff" }}>
            {currentIndex}/{totalImages}
          </Typography>

          <Box>
            {/* <ShareIcon
              style={{
                fontSize: "20px",
                color: "white",
              }}
            />

            <FavoriteIcon
              style={{
                fontSize: "20px",
                color: "white",
                marginLeft: "1.5rem",
              }}
            /> */}
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        style={{
          backgroundColor: "#000",
          height: "100vh",
          width: "100vw",
          padding: isMd ? " 14vh 2vh" : "20vh 4vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {!isMd && (
          <IconButton
            disableRipple
            sx={{
              borderRadius: "50%",
              padding: isMd ? "1rem" : "2rem",
              color: "white",
              border: "1px solid #fff",
              backgroundColor: "#000",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#858585",
              },
            }}
            style={{
              width: "1px",
              height: "1px",
            }}
            onClick={handlePreviousClick}
          >
            <NavigateBefore />
          </IconButton>
        )}

        <Box
          sx={{
            width: isMd ? "100%" : "80%",
            display: "flex",
            justifyContent: "center",
            gap: "0rem",
          }}
        >
          <Swiper
            slidesPerView={1}
            centeredSlides={false}
            loop={true}
            slidesPerGroupSkip={1}
            navigation={{ nextEl: null, prevEl: null }}
            modules={[Navigation]}
            className="mySwiper"
            ref={sliderRef}
          >
            {[featured, ...propertyImages].map((item, index) => (
              <SwiperSlide key={index}>
                <ImageComponent
                  src={item.raw_image || noimage}
                  hash={item.hash}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {!isMd && (
          <IconButton
            disableRipple
            sx={{
              borderRadius: "50%",
              padding: isMd ? "1rem" : "2rem",
              color: "white",
              border: "1px solid #fff",
              backgroundColor: "#000",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#858585",
              },
            }}
            style={{
              width: "1px",
              height: "1px",
            }}
            onClick={handleNextClick}
          >
            <NavigateNext />
          </IconButton>
        )}
      </Box>
    </Dialog>
  );
};

export default ImagesSlider;