import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const LazyFeatured = React.lazy(() =>
  import("../../pages/User/Properties/Featured")
);


const PopularListings = React.memo(({ listingsData }) => {
  const navigate = useNavigate();

  const handlePropertySelection = (id) => {
    navigate("/property/" + id);
  };

  const headings = {
    isHeading: true,
    heading: "Our Popular Properties"
  };

  return (
    <Box style={{ paddingBlock: "15vh 10vh", paddingInline: "8vw", }}>
      <LazyFeatured
        headings={headings}
        onClick={handlePropertySelection}
        naviagtion={true}
        gridData={4}
        data={listingsData}
      />
    </Box>
  );
});

export default PopularListings;
