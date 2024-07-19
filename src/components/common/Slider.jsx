import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import image from "../../assets/home-3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const Slider = () => {
  const sliderRef = useRef(null);
  const theme = useTheme();

  const customNavigation = {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  };

  return (
    <Box
      position="relative"
      sx={{ backgroundColor: theme.palette.primary.paper }}
      minHeight="100vh"
      padding={"14vh 10vw"}
    >
      <Typography
        variant="h1"
        fontSize={"3rem"}
        textAlign="center"
        marginBottom={{ xs: "0.5rem" }}
      >
        Testimonials
      </Typography>
      
      <Typography
        variant="subtitle1"
        paragraph
        marginBottom={{ xs: "4rem", md: "1.5rem" }}
        textAlign={"center"}
      >
        Reviews from our happy customers and people who trust us.
      </Typography>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={customNavigation}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        ref={sliderRef}
      >
        {[...Array(4)].map((_, index) => (
          <SwiperSlide key={index}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="100%"
              background={theme.palette.primary.light}
              padding="2.5rem 5rem"
              boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
            >
              <img
                src={image}
                alt={`rectangle${index + 1}`}
                style={{
                  width: "auto",
                  maxHeight: "400px",
                  objectFit: "cover",
                  position: "center",
                  borderRadius: "8px",
                }}
              />
              <Box mt={3}>
                <Typography
                  variant="h4"
                  color="textPrimary"
                  fontWeight="bold"
                  fontSize={{ xs: 28, sm: 26, md: 24 }}
                >
                  Taylor Wilson
                </Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontSize={{ xs: 18, sm: 16 }}
                >
                  Product Manager - Static Mania
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontSize={{ xs: 22, sm: 20, md: 18 }}
                >
                  Eget eu massa et consectetur. Mauris donec. Leo a, id sed duis
                  proin sodales. Turpis viverra diam porttitor mattis morbi ac
                  amet. Euismod commodo. We get you customer relationships that
                  last.
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
        <Box
          position="absolute"
          top="50%"
          left="10px"
          transform="translateY(-50%)"
          zIndex="999"
        >
          <IconButton
            sx={{
              borderRadius: "50%",
              padding: "2rem",
              fontSize: "1rem",
              color: "black",
              // backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
            className="swiper-button-prev"
            size="large"
          >
            <NavigateBefore />
          </IconButton>
        </Box>
        <Box
          position="absolute"
          top="50%"
          right="10px"
          transform="translateY(-50%)"
          zIndex="999"
        >
          <IconButton
            sx={{
              borderRadius: "50%",
              padding: "2rem",
              fontSize: "1rem",
              color: "black",
              // backgroundColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="swiper-button-next"
            size="large"
          >
            <NavigateNext sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Swiper>
    </Box>
  );
};

export default Slider;
