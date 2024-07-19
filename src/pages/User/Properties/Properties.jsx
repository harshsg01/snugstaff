import React, { useEffect, useRef, useState } from "react";
import Categories from "./Categories";
import { Box, Typography } from "@mui/material";
import { fetchallListings } from "../../../data/fetchListings";
import { listingsApiSample } from "../../../data/data";
import Featured from "./Featured";
import FetchError from "../../../components/common/FetchError";
import LoadingScreen from "../../../utils/LoadingScreen";
import NoProperties from "./NoProperties";
import { useNavigate, useLocation } from "react-router-dom";
import Featured1 from "./Featured1";

const Listings = ({ listingsData, isPropertpage, selectedPlace }) => {
  const navigate = useNavigate();
  console.log(selectedPlace)

  const handlePropertySelection = (id) => {
    navigate("/property/" + id);
  };

  const headings = {
    isHeading: false,
  };

  return (
    <Box style={{ paddingBlock: "15vh 10vh", paddingInline: "8vw" }}>
      {isPropertpage === true ? (
        <Featured1
        headings={headings}
        onClick={handlePropertySelection}
        naviagtion={true}
        gridData={4}
        data={listingsData}
        selectedPlace={selectedPlace}
      />
      ) : (
        <Featured
        headings={headings}
        onClick={handlePropertySelection}
        naviagtion={true}
        gridData={4}
        data={listingsData}
      />
      )}
    </Box>
  );
};

const Properties = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [reviewsRange, setReviewsRange] = useState([0, 5]);
  const [priceAndSliderRange, setPriceAndSliderRange] = useState([0, 100]);
  const [selectedRoomType, setSelectedRoomType] = useState("");

  const location = useLocation();
  const selectedPlace = new URLSearchParams(location.search).get("selectedplace");

  console.log(selectedPlace)


  const isPropertpage = true;

  const fetchListings = async () => {
    try {
      const response = await fetchallListings();
      console.log(response);
      setListings(response.results);
    } catch (error) {
      console.log(error);
      // setListings(listingsApiSample);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
      localStorage.removeItem("roomType");
    }
  };

  const handleSliderChange = (event, newValue) => {
    setPriceAndSliderRange(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchListings();
    };

    fetchData();
  }, []);

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      <Categories
        setListings={setListings}
        setLoading={setLoading}
        reviewsRange={reviewsRange}
        setReviewsRange={setReviewsRange}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sliderRange={priceAndSliderRange}
        setSliderRange={setPriceAndSliderRange}
        setError={setError}
        setSelectedRoomType={setSelectedRoomType}
        selectedRoomType={selectedRoomType}
        
      />
     {listings && listings.length === 0 ? (
    <NoProperties />
) : (
    <Listings isPropertpage={isPropertpage} listingsData={listings} selectedPlace={selectedPlace}/>
)}  
    </Box>
  );
};

export default Properties;