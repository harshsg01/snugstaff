import React, { useState, useRef } from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FiltersDialog from "./FiltersDialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { locationFilterData } from "../../data/data";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CategorySlider = () => {
  const theme = useTheme();
  const sliderRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handlePreviousClick = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      const currentIndex = sliderRef.current.swiper.realIndex;
      const prevIndex = currentIndex - 4;

      sliderRef.current.swiper.slideTo(prevIndex);
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      const currentIndex = sliderRef.current.swiper.realIndex;
      const nextIndex = currentIndex + 4;

      sliderRef.current.swiper.slideTo(nextIndex);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    <Box
      sx={{
        minHeight: "25vh",
        width: "100%",
        padding: "16vh 8vw 0vh 8vw",
        position: "fixed",
        zIndex: 1000,
        top: 0,
        left: 0,
        marginBottom: "10vh",
        backgroundColor: "white",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{
            borderRadius: "50%",
            padding: "1rem",
            color: "black",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#fff",
              boxShadow: "0px 0px 12px 1px #ccc",
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

        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <Swiper
            slidesPerView={10}
            centeredSlides={false}
            loop={true}
            slidesPerGroupSkip={4}
            navigation={{ nextEl: null, prevEl: null }}
            modules={[Navigation]}
            className="mySwiper"
            ref={sliderRef}
          >
            {locationFilterData.map((item) => (
              <SwiperSlide key={item.index}>
                <Box
                  sx={{
                    textAlign: "center",
                    marginRight: "0.5rem",
                    paddingBlock: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      borderBottom: "1px solid #000",
                    },
                  }}
                >
                  <i
                    style={{ fontSize: "1.5rem", color: "black" }}
                    className={item.iconClass}
                  ></i>
                  <Typography
                    textAlign={"center"}
                    variant="subtitle2"
                    color="black"
                    fontWeight={200}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <IconButton
          sx={{
            borderRadius: "50%",
            padding: "1rem",
            color: "black",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#fff",
              boxShadow: "0px 0px 12px 1px #ccc",
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
      </Box>

      <Button
       onClick={handleOpen}
        sx={{
          width: "10%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingY: "0.5rem",
          paddingX: { xs: "0.5rem", sm: "1rem" },
          color: "#000",
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          boxShadow: "0 0 0 0.2px #63615a",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            color: "#fff",
          },
        }}
      >
        <TuneOutlinedIcon style={{ fontSize: "1rem", marginRight: "0.5rem" }} />
        <Typography
          sx={{
            fontSize: "1rem",
            textTransform: "capitalize",
          }}
        >
          Filters
        </Typography>
      </Button>

      <FiltersDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

export default CategorySlider;
