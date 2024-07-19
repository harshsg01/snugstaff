import React, { useState, useEffect, Suspense } from "react";
import { Box, Button, Snackbar, createTheme,} from "@mui/material";
import LoadingScreen from "../../utils/LoadingScreen";
import { fetchPopularListings } from "../../data/fetchListings";
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
const LazyHero = React.lazy(() => import("../../components/customers/Hero"));
const LazySteps = React.lazy(() => import("../../components/customers/Steps"));
const LazyCategories = React.lazy(() => import("../../components/customers/Categories"));
const LazyCategories2 = React.lazy(() => import("../../components/customers/Categories2"));
const LazyStats = React.lazy(() => import("../../components/customers/Stats"));
const LazyEnquiry = React.lazy(() => import("../../components/customers/Enquiry"));
const LazyListings = React.lazy(() => import("../../components/customers/PopularListings"));



const Home = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [showCookiePopup, setShowCookiePopup] = useState(false);

  const fetchListings = async () => {
    try {
      const response = await fetchPopularListings();
      console.log(response);
      setListings(response.results);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchListings();
    };

    fetchData();

    
  }, []);

  

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <LazyHero />
        <LazySteps />
        <LazyStats />
        {listings && <LazyListings listingsData={listings} />}
        <LazyCategories />
        <LazyCategories2 />
        <LazyEnquiry />
      </Suspense>

      
    </>
  );
};

export default Home;




