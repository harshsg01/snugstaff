import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ImagesGallery from "./ImageComponents/ImagesGallery";
import ImageSection from "./ImageComponents/ImageSection";
import CalendarCard from "./CalendarCard";
import Reviews from "./Reviews";
import Description from "./Description";
import { fetchoneListing } from "../../data/fetchListings";
// import FetchError from "../../components/common/FetchError";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../utils/LoadingScreen";
import { useSelector } from "react-redux";
import SocialShare from "./SocialShare";
import { useParams } from "react-router-dom";
import { addtoWishList } from "../../data/fetchWishList";
import { useDispatch } from "react-redux";
import { openDialog, setMessage } from "../../store/slices/DialogSlice";
import MessageDialog from "../../components/common/MessageDialog";
import { propertyDetailsApiSample } from "../../data/data";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import noimage from "../../assets/noimage.png";
import RoomIcon from "@mui/icons-material/Room";
import SliderImage from "./ImageComponents/PropertyImageSlider";
import Ameneties from "./Ameneties";
import CookiePopup from "../../components/common/CookiePopup";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import HouseRules from "./Features";
import Features from "./Features";

const TopHeading = ({ savetoWishlist, propertyName, isLoggedIn }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBlock: "1rem",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          {propertyName}
        </Typography>
      </Box>
    </Box>
  );
};

// const MapContent = ({ location }) => {
//   const theme = useTheme();
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
//   });

//   const mapContainerStyle = {
//     height: "500px",
//     width: "100%",
//   };

//   const center = {
//     lat: 53.2281984545667,
//     lng: -0.5406499058933834,
//   };

//   const options = {
//     styles: [
//       {
//         featureType: "all",
//         elementType: "labels",
//         stylers: [{ visibility: "on" }],
//       },
//       {
//         featureType: "landscape",
//         elementType: "geometry",
//         stylers: [{ color: "#f5f5f5" }],
//       },
//       {
//         featureType: "water",
//         elementType: "geometry",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         featureType: "water",
//         elementType: "labels.text.fill",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         featureType: "road",
//         elementType: "geometry",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         featureType: "road",
//         elementType: "geometry.stroke",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         featureType: "road",
//         elementType: "labels.text.fill",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         featureType: "road",
//         elementType: "labels.text.stroke",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         featureType: "poi",
//         elementType: "geometry",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         featureType: "poi",
//         elementType: "labels.text.fill",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         featureType: "poi",
//         elementType: "labels.text.stroke",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         featureType: "administrative",
//         elementType: "geometry.stroke",
//         stylers: [{ color: "#ccc" }],
//       },
//       {
//         featureType: "administrative",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#737373" }],
//       },
//       {
//         featureType: "administrative",
//         elementType: "labels.text.stroke",
//         stylers: [{ color: "#ffffff" }],
//       },
//     ],
//     disableDefaultUI: true,
//   };

//   const [selectedLocation] = useState(center);

//   const blueMarkerIcon = {
//     path: "M12 2C7.27 2 3.5 5.73 3.5 10.5c0 5.25 8.5 13.5 8.5 13.5s8.5-8.25 8.5-13.5C20.5 5.73 16.73 2 12 2zm0 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
//     fillColor: theme.palette.primary.main,
//     fillOpacity: 1,
//     scale: 2,
//     strokeWeight: 1,
//     strokeColor: theme.palette.primary.main,
//   };

//   const renderMap = () => {
//     return (
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={13}
//         options={options}
//       >
//         {/* Marker for the selected location */}
//         <Marker position={selectedLocation} icon={blueMarkerIcon} />
//       </GoogleMap>
//     );
//   };

//   if (loadError) return "Error";
//   if (!isLoaded) return "Loading Maps...";

  // return (
  //   <Box paddingBlock={"2rem 3rem"}>
  //     <>
  //       <Typography
  //         marginBottom={"1rem"}
  //         variant="h6"
  //         sx={{ fontSize: "1.5rem", fontWeight: "500" }}
  //       >
  //         Property Location
  //       </Typography>

  //       <Typography
  //         marginBottom={"2rem"}
  //         variant="subtitle1"
  //         sx={{ fontSize: "1rem", fontFamily: "Inter", fontWeight: "300" }}
  //       >
  //         {/* {`${street_address}, ${city}, ${postcode}`} */}
  //         {location?.street_address}, {location?.city}, {location?.county}, {location?.postcode}
  //       </Typography>
  //     </>

  //     {renderMap()}
  //   </Box>
  // );
// };





mapboxgl.accessToken = 'pk.eyJ1IjoidW5yYXZsZXIiLCJhIjoiY2x0djV3cmw5MWw0czJxcW1iMjVlYXF4OSJ9.vrxGiENu-Me6fysM5J4ELA';

const MapContent = ({ location }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        center: [0, 0], // default center
        zoom: 13, // default zoom
      });

      setMap(newMap);
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []); // Run only once to initialize the map

  useEffect(() => {
    if (map && location) {
      const query = encodeURIComponent(`${location.street_address}, ${location.city}, ${location.county}, ${location.postcode}`);
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          if (data.features && data.features.length > 0) {
            const coordinates = data.features[0].center;
            const lngLat = [coordinates[0], coordinates[1]]; // Format coordinates as [longitude, latitude]
            map.setCenter(lngLat);

            // Remove existing marker if exists
            if (marker) {
              marker.remove();
            }

            // Create new marker
            const newMarker = new mapboxgl.Marker()
              .setLngLat(lngLat)
              .addTo(map)
              .setPopup(new mapboxgl.Popup().setHTML(
                `<h3>${location.street_address}</h3><p>${location.city}, ${location.county}, ${location.postcode}</p>`
              ).addTo(map)); // Open popup immediately
            setMarker(newMarker);
          } else {
            console.error('No coordinates found for the given address');
          }
        })
        .catch(error => {
          console.error('Error fetching coordinates:', error);
        });
    }
  }, [map, location]); // Run whenever map or location changes

  return (
    <Box paddingBlock={"2rem 3rem"}>
      <>
        <Typography
          marginBottom={"1rem"}
          variant="h6"
          sx={{ fontSize: "1.5rem", fontWeight: "500" }}
        >
          Property Location
        </Typography>

        <Typography
          marginBottom={"2rem"}
          variant="subtitle1"
          sx={{ fontSize: "1rem", fontFamily: "Inter", fontWeight: "300" }}
        >
          {location?.street_address}, {location?.city}, {location?.county}, {location?.postcode}
        </Typography>
      </>

      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </Box>
  );
};





const PropertyDescription = () => {
  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000, // Set your custom breakpoint at 1000px
        lg: 1280,
        xl: 1920,
      },
    },
  });
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down("md"));
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSocialShare, setOpenSocialShare] = useState(false);
  const { propertyId } = useParams();
  const dispatch = useDispatch();
  const handleOpen = () => setOpenSocialShare(true);
  const handleClose = () => setOpenSocialShare(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoggedIn } = useSelector((state) => state.auth);


  



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const savetoWishlist = async () => {
    try {
      const data = {
        username: localStorage.getItem("username"),
        patch_type: "add",
        items: [propertyId],
      };
      const response = await addtoWishList(data);
      console.log(response);
      dispatch(setMessage(response));
      if (response) {
        dispatch(openDialog());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchListing = async () => {
    try {
      const data = {
        id: propertyId,
      };
      const response = await fetchoneListing(data);

      if (response.status === "something went wrong.") {
        setError(true);
        return;
      }

      setListing(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      // setListing(propertyDetailsApiSample);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container style={{ paddingBlock: "1vh 8vh" ,paddingInline:"0"}}>
      <TopHeading
        savetoWishlist={savetoWishlist}
        isLoggedIn={isLoggedIn}
        propertyName={listing.placeholder_name}
      />
     
      {
        isMd ? 

        <SliderImage 
    
        showcases={
          listing.showcased_images.length > 2
            ? listing.showcased_images
            : listing.property_images
        }
        handleClickOpen={handleClickOpen}
        property_images = {listing.property_images}
        />
        :
        (
          <ImageSection
       
          images={listing.property_images}
          featured={listing.featured_image}
          showcases={
            listing.showcased_images.length > 2
              ? listing.showcased_images
              : listing.property_images
          }
          handleClickOpen={handleClickOpen}
        />
        )
      }
     

      {/* Share and the Save Button */}
      <Box
        paddingTop={"1.5rem"}
        display="flex"
        justifyContent="flex-end"
        flexWrap="wrap"
      >
        <Button
          sx={{
            padding: "0.5rem",
            borderRadius: "0.5rem",
            transition: "background 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#f2f2f2",
            },
          }}
          onClick={handleOpen}
        >
          <ShareIcon
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
            Share
          </Typography>
        </Button>

        {isLoggedIn && (
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
        )}
      </Box>

      <SocialShare open={openSocialShare} handleClose={handleClose} />

      {/* Property Details */}
      <Stack paddingInline={"16px"}>
        {isSmallScreen ? (
          <Stack
          justifyContent={"space-between"}
          direction={"column"}
          width={"100%"}
          marginBlock={"1rem"}
          spacing={10}
        >
           <Description propertyDetails={listing} />
           
          {/* <CalendarCard listing_bookings={listing.listing_bookings} /> */}
          {/* <Ameneties style={{marginTop:'100px'}} amenetiesData={listing?.ammeneties_offered} /> */}
          
        </Stack>
        ) : (
          <Stack
          justifyContent={"space-between"}
          direction={"row"}
          width={"100%"}
          marginBlock={"1rem"}
          spacing={10}
        >
          <CalendarCard listing_bookings={listing.listing_bookings} />
          <Description propertyDetails={listing} />
        </Stack>
        )}

        <Divider />
          

        {listing.listing_reviews && (
          <Reviews reviews={listing.listing_reviews} stats={listing.stats} />
        )}

        <Divider />

        {listing.street_address && (
          <MapContent location={listing} />
        )}

        <Divider />

        {/* Host Details */}
        {listing.creator && (
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            paddingBlock={"2rem"}
            width={"100%"}
            marginTop={"100px"}
          >
            <Box marginRight={"2rem"}>
              {/* <img
                src={listing.creator.image || noimage}
                alt="hostprofile"
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                }}
                onError={(e) => {
                  e.target.src = noimage;
                }}
              /> */}
              {listing.subscription_plan === "month" ? (
                <img
                  src={listing.creator.image || noimage}
                  alt="hostprofile"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                  }}
                  onError={(e) => {
                    e.target.src = noimage;
                  }}
                />
              ) : (
                <img
                  src={noimage}
                  alt="noimage"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Box>

            <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.2rem", fontWeight: "600" }}
            >
              Hosted by{" "}
              {listing.subscription_plan === "month"
                ? listing.creator.first_name
                  ? listing.creator.first_name
                  : listing.creator.username
                : "Private"}
            </Typography>


              <Typography
                variant="caption"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Inter",
                  fontWeight: "200",
                }}
              >
                Hosting Since{" "}
                {listing.creator.date_joined[2]
                  ? listing.creator.date_joined[2].year
                  : "2023"}
              </Typography>
            </Box>
          </Box>
        )}

        <Divider />
      </Stack>

      <ImagesGallery
        savetoWishlist={savetoWishlist}
        propertyImages={listing.property_images}
        showcases={listing.showcased_images}
        featured={listing.featured_image}
        open={open}
        handleCloseGallery={handleClickClose}
      />

      <MessageDialog />

      
    </Container>
  );
};

export default PropertyDescription;
