import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  styled,
  Typography,
  Button,
  Divider,
  useTheme,
  css,
  Checkbox,
  Stack,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { listingsData } from "../../../data/data";
import { useNavigate } from "react-router-dom";
import feat1 from "../../../assets/featured/feat-1.jpg";
import noimage from "../../../assets/noimage.jpg";
import { Favorite, FavoriteBorder, Login } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Blurhash } from "react-blurhash";
import { fetchallListings } from "../../../data/fetchListings";
import LoadingScreen from "../../../utils/LoadingScreen";
import { addItemToWishlist, removeItemToWishlist } from "../../../data/userWishlist";
import NoProperties from "./NoProperties";

const onKnowMore = () =>{
  navigate('./contact')
}

const handleClick = (id) => {
  onClick(id);
}


const StyledBox = styled(Box)(({ theme, donothover }) => ({
  padding: "1rem",
  borderRadius: "2rem",
  backgroundColor: "#fff",
  width: "100%",
  zIndex: 2,
  border: `1px solid ${theme.palette.secondary.light}`,
  boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.12)",
  transition: "all 0.5s ease",
  cursor: "pointer",
  "&:hover": {
    transform: donothover ? "none" : "scale(1.01)",
  },
}));

const Ribbon = styled("div")(({ theme }) => ({
  position: "relative",
  top: "6px",
  right: "0",
  left: "-26px",
  backgroundColor: theme.palette.primary.main,
  transform: "translate(5%, 4%) rotate(0deg)",
  width: "40%",
  height: "35px",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "8px",
  borderRadius: "0.3rem 0.3rem",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
}));

const RibbonIcon = styled("span")({
  fontSize: "1rem",
  color: "white",
});

const RibbonText = styled(Typography)(() => ({
  color: "white",
  marginLeft: "8px",
}));

const responsivePadding = css`
  @media (max-width: 600px) {
    padding: 2vw;
  }
`;


const ImageComponent = ({ src }) => {
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
            src={src}
            onError={(e) => {
              e.target.src = noimage;
            }}
            alt="Property"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </>
    </>
  );
};

const createShimmer = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#ccc', // Placeholder color
      animation: 'shimmer 2s infinite linear',
    }}
  />
);

const Featured1 = ({ headings, gridData, onClick, donothover, selectedPlace }) => {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.down('xl'));
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState({});
  const [next, setNext] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countitem, setCountitem] = useState(0);
  const navigate = useNavigate();

  console.log(selectedPlace)

  const fetchListings = async () => {
    console.log(selectedPlace)
    try {
      let response;
      if (selectedPlace) {
        response = await fetchallListings(currentPage, selectedPlace); // Pass selectedPlace if not empty
        setData([...response.results]);
      } else {
        response = await fetchallListings(currentPage);
        setData((prevData) => [...prevData, ...response.results]);
      }
      console.log(response)
      
      setNext(response?.next);
      setCountitem(response?.count);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      localStorage.removeItem('roomType');
    }
};
  

  



  useEffect(() => {
    const fetchData = async () => {
      await fetchListings();
    };

    fetchData();
  }, [currentPage, selectedPlace]); 



  const handleScroll = () => {
    const contentDiv = document.querySelector(".content.grid3.mtop");
    const contentBottom = contentDiv.offsetTop + contentDiv.offsetHeight;

    const windowBottom =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;

    const windowOffset = window.pageYOffset;

    // Check if the user has scrolled to the bottom of the content div
    if (windowBottom + windowOffset >= contentBottom - 100) {
      // Load more data when near the bottom
      if ((next!==null)) {
        // Increase currentPage and fetch new data
        setCurrentPage(next);
      }
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [next]); // Add next as a dependency to re-run the effect when next changes

  if (error) {
    // Handle error
  }

  if (loading) {
    return <LoadingScreen />;
  }

  const dataToShow = data || [];

  const handleClick = (id) => {
    onClick(id);
  };


    console.log(checked);




  const handleWishlist = async (data, e) => {
    e.stopPropagation();
    setChecked((prevChecked) => ({
      ...prevChecked,
      [data.id]: !prevChecked[data.id],
    }));
    const id = data.id;
  
    if (checked[id] !== true) {
      console.log("add");
      try {
        const response = await addItemToWishlist(id);
        console.log(response, "Item added to wishlist");
      } catch (error) {
        console.log(error);
        setError(error);
      }
    } else {
      console.log("remove");

      try {
        const response = await removeItemToWishlist(id);
        console.log(response, "Item removed from wishlist");
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
  };
  


  return (
    <Box
      padding={{
        xs: "4vw 0.5vw 4vw 0.5vw",
        sm: "4vw 0 4vw 0",
        md: "0vw 0vw 4vw 0vw",
        lg: "0vw 0vw 0vw 0vw",
      }}
      css={responsivePadding}
      textAlign="center"
    >
      {headings && headings.isHeading && (
        <Stack marginBottom={"5rem"}>
          <Typography
            variant="h1"
            fontSize={"3rem"}
            textAlign="center"
            marginBottom={{ xs: "2rem", md: "0.5rem" }}
          >
            {headings.heading}
          </Typography>

          {headings.subHeading && (
            <Typography variant="subtitle1" paragraph>
              {headings.subHeading}
            </Typography>
          )}
        </Stack>
      )}

      {dataToShow.length === 0 ? (
        <Typography variant="body1" style={{height:'150px', fontWeight:'bold', fontSize:'28px', margin:'auto'}}>No Properties Found</Typography>
      ) : (
        <div className="content grid3 mtop" onScroll={handleScroll}>
        {selectedPlace && (
          <Typography variant="body1" style={{fontWeight:'500', fontSize:'25px', margin:'20px auto'}}>Listing For: {selectedPlace}</Typography>
        )}
        <Grid container spacing={4}>
          {dataToShow.map((data, index) => (
            <Grid
              // onClick={() => handleClick(data.id)}
              item
              xs={12}
              sm={6}
              md={6}
              lg={gridData}
              key={data.id || index}
            >
              <StyledBox donothover={donothover}>
                <Box
                  sx={{
                    width: "100%",
                    height: "17rem",
                    borderRadius: "2rem",
                    overflow: "hidden",
                  }}
                >
                  {data.featured_image.raw_image ? (
                    <ImageComponent
                    src={data.featured_image.raw_image || noimage}
                    hash={data.featured_image.hash}
                    loading="eager"
                  />
                  ) : (
                    createShimmer()
                  )}
                </Box>

                

                <Box
                  paddingBlock={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      textAlign={"left"}
                      variant="h2"
                      fontSize={"1.2rem"}
                      marginBlock="0.4rem"
                    >
                      {data.placeholder_name.length > 30
                        ? data.placeholder_name.substring(0, 30) + "..."
                        : data.placeholder_name}
                    </Typography>
                    <Typography
                      textAlign={"left"}
                      variant="subtitle2"
                      sx={{ color: "#6C727F" }}
                    >
                      {data.property_type.type_name} | {data?.city}
                    </Typography>
                    
                  </Box>

                  {isLoggedIn && (
                    <Checkbox
                      disableRipple

                      checked={checked[data.id] || false}
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   setChecked((prevChecked) => ({
                      //     ...prevChecked,
                      //     [data.id]: !prevChecked[data.id],
                      //   }));
                      // }}
                      onClick={(e) => handleWishlist(data, e)}
                      icon={<FavoriteBorder sx={{ color: "black" }} />}
                      checkedIcon={
                        <Favorite sx={{ color: theme.palette.primary.main }} />
                      }
                    />
                  )}
                </Box>

                <Divider />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginBlock={1.5}
                  flexWrap="wrap"
                >
                  <Box display="flex" marginTop={"0.5rem"} alignItems="center">
                    <KingBedOutlinedIcon
                      sx={{
                        fontSize: "1.5rem",
                        marginRight: "0.2rem",
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="subtitle2">
                      {data.beds} Beds
                    </Typography>
                  </Box>

                  <Box display="flex" marginTop={"0.5rem"} alignItems="center">
                    <BathtubOutlinedIcon
                      sx={{
                        fontSize: "1.5rem",
                        marginRight: "0.3rem",
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="subtitle2">
                      {data.bathrooms} Bathrooms
                    </Typography>
                  </Box>

                  <Box display="flex" marginTop={"0.5rem"} alignItems="center">
                    <WidgetsOutlinedIcon
                      sx={{
                        fontSize: "1.5rem",
                        marginRight: "0.3rem",
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="subtitle2">Public Parking</Typography>
                  </Box>
                </Box>

                {/* <Box
                  display="flex"
                  justifyContent="space-between"
                  marginBlock={1.5}
                  flexWrap="wrap"
                >
                  <Typography
                    variant="subtitle1"
                    fontFamily={"Inter"}
                    fontSize={"0.8rem"}
                    fontWeight={300}
                  >
                    *A minimum of 2 persons rate will be applied
                  </Typography>
                </Box> */}

                <Divider sx={{ marginBottom: "1rem" }} />

                <Box
                  p={1.3}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  backgroundColor={theme.palette.primary.paper}
                  sx={{
                    borderRadius: "1.5rem",
                  }}
                >
                  <Stack
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    width="100%"
                    spacing={1}
                  >
                    {/* <Typography variant="subtitle2">Booking Price</Typography> */}
                    <Stack
                      spacing={0.5}
                      width={"100%"}
                      direction={isXl ? "column" : "row"}
                    >
                      {/* <Typography
                        display="flex"
                        alignItems="center"
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: "700",
                          fontSize: "1.3rem",
                        }}
                      >
                        {data.currency.currency_sign}
                        {parseFloat(data.pricing).toFixed(2)}
                      </Typography> */}

                      {/* <Typography
                        variant="subtitle1"
                        display="flex"
                        alignItems="center"
                      >
                        per person/night
                      </Typography> */}
                    </Stack>
                  </Stack>

                  <Button
                    sx={{
                      paddingY: "1rem", // Increase padding for larger button
                      paddingX: "1rem", // Increase padding for larger button
                      width: "3500px", // Adjust width to fit content
                      height: "50px",
                      color: "#fff",
                      backgroundColor: theme.palette.primary.dark,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                      marginRight: "0.5rem", // Add margin to separate the buttons
                    }}
                    onClick={onKnowMore}
                  >
                    <DescriptionOutlinedIcon
                      sx={{ fontSize: "1.1rem", marginRight: "0.5rem"}}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        textTransform: "capitalize",
                        marginRight: "0.5rem",
                      }}
                    >
                      Book now
                    </Typography>
                  </Button>
                  
                  <Button
                    sx={{
                      paddingY: "1rem", // Increase padding for larger button
                      paddingX: "1rem", // Increase padding for larger button
                      width: "3500px", // Adjust width to fit content
                      height: "50px",
                      color: "#fff",
                      backgroundColor: theme.palette.primary.dark,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    <DescriptionOutlinedIcon
                      sx={{ fontSize: "1.1rem", marginRight: "0.5rem" }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        textTransform: "capitalize",
                        marginRight: "0.5rem",
                      }}
                      onClick={() => handleClick(data.id)}
                    >
                      Know More
                    </Typography>
                  </Button>
                </Box>
              </StyledBox>
            </Grid>
          ))}
        </Grid>
      </div>
      )}
    </Box>
  );
};

export default Featured1;