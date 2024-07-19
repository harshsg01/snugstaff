import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
  styled,
  Divider
} from "@mui/material";
import image from "../../../assets/3.jpg";
import { useNavigate } from "react-router-dom";
// import FetchError from "../../../components/common/FetchError";
import LoadingScreen from "../../../utils/LoadingScreen";
import AddIcon from "@mui/icons-material/Add";
import { deleteListing, fetchHostListings } from "../../../data/fetchListings";
import noimage from "../../../assets/noimage.jpg";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteConfirmation from "./DeleteConfirmation";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

const NoListings = () => {
  return (
    <Box
      sx={{
        height: "50vh",
        width: "82vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography marginTop={"5rem"} variant="h3" fontSize={"1.8rem"}>
        No Properties Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        Try a different criteria or remove some of your filters
      </Typography>
    </Box>
  );
};

const StyledBox = styled(Grid)(({ theme}) => ({
  padding: "1rem",
  borderRadius: "2rem",
  backgroundColor: "#fff",
  width: "100%",
  zIndex: 2,
  border: `1px solid ${theme.palette.secondary.light}`,
  boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.12)",
  transition: "all 0.5s ease",
  cursor: "pointer",
  
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

const Listings = () => {
  const theme = useTheme();
  const apiUrl = import.meta.env.VITE_API_URL;
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEls, setAnchorEls] = React.useState({});
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const isXl = useMediaQuery(theme.breakpoints.down("xl"));

  

  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  const handleClick = (event, id) => {
    event.stopPropagation();
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (event, id) => {
    event.stopPropagation();
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [id]: null,
    }));
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleOpenDeleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDeleteListing = async () => {
    try {
      const response = await deleteListing(propertyId);
      console.log(response);
      setListings(listings.filter((listing) => listing.id !== propertyId));
      handleCloseDeleteConfirmation();
    } catch (error) {
      console.log("error");
    }
  };

  const handlePropertyClick = (id) => {
    navigate(`/host/listing-details/${id}`);
  };

  const fetchListings = async () => {
    try {
      const response = await fetchHostListings();
      console.log(response);

      if (
        response === "Something went wrong" ||
        response.status === "Something went wrong"
      ) {
        setError(true);
        return;
      }
      setListings(response);
    } catch (error) {
      console.log(error);
      // setListings(hostListingsApiSample);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  const imageUri = (image) => {
    if (image) {
      const newUrl =
        apiUrl + "/" + image.substring(image.indexOf("None/") + "None/".length);
      return newUrl;
    }
  };

  const options = [
    {
      label: "Edit",
      click: (id) => {
        navigate(`/host/listing-details/${id}`);
      },
    },
    {
      label: "Delete",
      click: (id) => {
        handleOpenDeleteConfirmation();
        setPropertyId(id);
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await fetchListings();
    };

    fetchData();
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  return (
    <Stack
      paddingInline={isMd ? 4 : 16}
      paddingTop={isMd ? 2.8 : 2.8}
      paddingBottom={6}
      width={"100vw"}
      minHeight={"100vh"}
      direction="column"
      spacing={4}
    >
      {/* First Stack */}
      <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
        <Typography fontWeight={500} fontSize={isMd ? "1.8rem" : "2rem"}>
          Your Listings
        </Typography>

        {/* Add Listing Button */}
        <Stack
          onClick={() => navigate("/host/add-listing")}
          direction={"row"}
          alignItems={"center"}
          sx={{
            fontSize: "1.5rem",
            backgroundColor: theme.palette.primary.main,
            textTransform: "none",
            paddingBlock: isMd ? "10px" : "10px",
            paddingInline: isMd ? "12px" : "20px",
            height: "fit-content",
            borderRadius: "20px",
            marginRight: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <Typography color={"white"} fontSize={"1rem"} fontWeight={500}>
            Add a Listing
          </Typography>
          <AddIcon
            sx={{ color: "white", marginLeft: 0.5, fontSize: "1.3rem" }}
          />
        </Stack>
      </Stack>

      {/* Second Stack */}
      {listings.length === 0 ? (
        <NoListings />
      ) : (
        
        <Grid container direction={"row"} spacing={2}>
          {listings.map((item) => (
            
            <Grid
              onClick={() => handlePropertyClick(item.id)}
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              key={item.id}
              style={{
                cursor: "pointer",
                marginBottom: 16,
                paddingLeft: 0,
                paddingRight: 20,
              }}
            >
              {/* Image with label */}
              <StyledBox>
              <Box
                height={"20rem"}
                position="relative"
                marginBottom={2}
                onClick={() => handleClick(item.id)}
              >
                {!imageLoaded && (
                  <Skeleton
                    sx={{ borderRadius: "20px", backgroundColor: "f2f2f2" }}
                    variant="rectangular"
                    animation="wave"
                    width={"100%"}
                    height={"100%"}
                  />
                )}

                <img
                  onLoad={handleImageLoad}
                  onClick={() => handleClick(item.id)}
                  src={item.featured_image.raw_image}
                  onError={(e) => {
                    e.target.src = noimage;
                  }}
                  alt="Royal Stays"
                  style={{
                    borderRadius: "20px",
                    display: imageLoaded ? "block" : "none",
                  }}
                  width={"100%"}
                  height={"100%"}
                />

                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, item.id)}
                    sx={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      backgroundColor: "#fff",
                      "&:hover": {
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    <MoreVertIcon sx={{ fontSize: "1.5rem", color: "#000" }} />
                  </IconButton>

                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEls[item.id]}
                    open={Boolean(anchorEls[item.id])}
                    onClose={(event) => handleClose(event, item.id)}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem
                        key={option.label}
                        selected={option.label === "Pyxis"}
                        onClick={(event) => {
                          event.stopPropagation();
                          option.click(item.id);
                          handleClose(event);
                        }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </Box>


                 {(item?.subscription_plan === "commission") && (
                  <Ribbon>
                    <RibbonIcon>
                      <AutoAwesomeOutlinedIcon />
                    </RibbonIcon>
                    <RibbonText variant="subtitle2">Commissioned</RibbonText>
                  </Ribbon>
                )}

                {(item?.subscription_plan === "month") && (
                  <Ribbon>
                    <RibbonIcon>
                      <AutoAwesomeOutlinedIcon />
                    </RibbonIcon>
                    <RibbonText variant="subtitle2">Subscribed</RibbonText>
                  </Ribbon>
                )}

                {(item?.subscription_plan === "None") && (
                  <Ribbon>
                    <RibbonIcon>
                      <AutoAwesomeOutlinedIcon />
                    </RibbonIcon>
                    <RibbonText variant="subtitle2">Pending</RibbonText>
                  </Ribbon>
                )}


                  <Box marginTop={"25px"}>
                    <Typography
                      textAlign={"left"}
                      variant="h2"
                      fontSize={"1.2rem"}
                      marginBlock="0.4rem"
                    >
                      {item.placeholder_name.length > 30
                        ? item.placeholder_name.substring(0, 30) + "..."
                        : item.placeholder_name}
                    </Typography>
                    <Typography
                      textAlign={"left"}
                      variant="subtitle2"
                      sx={{ color: "#6C727F" }}
                    >
                    {item.street_address.slice(0, 30) + "..."}, {item.postcode}
                    </Typography>
                    
                  </Box>

                  <Divider  sx={{ marginBottom: "1rem", marginTop:"1rem" }} />

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
                    <Typography variant="subtitle2">Booking Price</Typography>
                    <Stack
                      spacing={0.5}
                      width={"100%"}
                      direction={isXl ? "column" : "row"}
                    >
                      <Typography
                        display="flex"
                        alignItems="center"
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: "700",
                          fontSize: "1.3rem",
                        }}
                      >
                        {/* {item.currency.currency_sign} */}
                        £
                        {parseFloat(item.pricing).toFixed(2)}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        display="flex"
                        alignItems="center"
                      >
                        per person/night
                      </Typography>
                    </Stack>
                  </Stack>

                  
                </Box>

              </StyledBox>
              

              
            </Grid>
          
          ))}
        </Grid>
      
      )}

      <DeleteConfirmation
        open={openDeleteConfirmation}
        handleDeleteListing={handleDeleteListing}
        handleClose={handleCloseDeleteConfirmation}
      />
    </Stack>
  );
};

export default Listings;
