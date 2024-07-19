import  { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box,  useTheme } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const SliderImage = ({showcases,handleClickOpen,property_images}) => {
  const sliderRef = useRef(null);
  const theme = useTheme();
  const [count, setCount] = useState(1)
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.on("slideChange", () => {
        setCount(sliderRef.current.swiper.realIndex + 1);
      });
    }
  }, [property_images]);
  return (
    <Box
      sx={{ backgroundColor: theme.palette.primary.paper,
      overflow:"hidden" ,position:"relative",
      maxHeight:320
    }}
        
      
    >
      
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000000,
          disableOnInteraction: false,
        }}

        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        ref={sliderRef}

      >
        {(showcases??[]).map((item, index) => (
          
          <SwiperSlide  key={index}>
            <Box
              boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
              overflow={"hidden"}
              onClick={handleClickOpen}
              width={"100%"}
              height={"320px"}
          >
              <img
                src={item.raw_image}
                alt={`rectangle${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit:'cover'
                }}
              />
          
            </Box>
          </SwiperSlide>
        ))}
        
      </Swiper>
      <Box sx={{position:"absolute",top:"0.6rem",right:"1rem",backgroundColor:"#424242",color:"#fff",padding:".2rem 1.2rem",borderRadius:"4px",zIndex:"9999",fontSize:"12px"}}>
                {count}/{showcases.length}

            </Box>
    </Box>
  );
};

export default SliderImage;
