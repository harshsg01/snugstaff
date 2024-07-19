import React, { useEffect } from "react";
import {
  AccommodationFAQs,
  featuredData,
  findStaffAccommodation,
  findCompanyAccommodation,
} from "../../data/data";
import { useLocation } from "react-router-dom";
import Featured from "../../components/customers/Featured";
import Locations from "../../components/customers/Locations";
import FAQs from "../../components/customers/FAQs";
import { Box } from "@mui/material";
import ContactForm from "../../components/customers/ContactForm";
import Slider from "../../components/common/Slider";
import Heading from "../../components/common/Heading";
import Enquiry from "../../components/customers/Enquiry";
import { useMediaQuery, useTheme } from "@mui/material";
const FindAccommodation = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("sm"));
  const path = location.pathname;
  let data = {};
  let isCompany = false;

  if (path === "/Staff-Accommodation") {
    data = findStaffAccommodation;
  } else {
    data = findCompanyAccommodation;
    isCompany = true;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <Box sx={{ paddingTop: isMd ? "2rem" : "2rem" }}>
      <Heading heading={data.heading} />
      <Box
        sx={{
          display: "flex",
          justifyContent:"center",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          paddingTop: isMd ? 0 : "2rem",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            loading="lazy"
            style={{
              width: isMd ? "20rem" : "40rem",
              height: "35rem",
              objectFit: isCompany ? "cover" : "contain",
            }}
            src={data.img}
            alt="Accommodation"
          />
        </Box>
        <ContactForm />
      </Box>

      <Locations />
      <Featured data={featuredData} />
      <Slider />
      <FAQs data={AccommodationFAQs} />
      <Enquiry />
    </Box>
  );
};

export default FindAccommodation;
