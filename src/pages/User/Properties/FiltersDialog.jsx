import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { styled, useTheme,useMediaQuery } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Box,
  Divider,
  Switch,
  Grid,
} from "@mui/material";
import { amenitiesList, guestDetailsData } from "../../../data/data";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import StarIcon from "@mui/icons-material/Star";
import { fetchFilteredListings } from "../../../data/fetchListings";

// Styled Components
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "none",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-flexContainer": {
    display: "flex",
    flexWrap: "wrap",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props) => <Tab {...props} disableRipple={true} />)(
  ({ theme }) => ({
    textTransform: "none",
    backgroundColor: "#fff",
    marginBlock: "0.5rem",
    border: "1px solid #e8e8e8",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "1rem",
    paddingInline: theme.spacing(3),
    borderRadius: "2rem",
    marginRight: "1.2rem",
    color: "#000",
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
    },
    "&:hover": {
      border: "1px solid",
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 3,
  padding: "15px 0px",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    boxShadow: "0 3px 1px rgba(0,0,0,0.1),",
    border: "1px solid theme.palette.primary.main",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: theme.palette.primary.main,
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
    width: "100%",
    margin:"0",
  },
  "& .MuiPaper-root": {
    borderRadius: "20px",
    overflowY: "auto",
  },
  "& .MuiDialogActions-root": {
    borderTop: "1px solid #ebebeb",
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "& .MuiDialogTitle-root": {
    borderBottom: "1px solid # ebebeb",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  zIndex: 10000,
}));

const FilterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingBlock: theme.spacing(3),
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 400,
  marginBottom: theme.spacing(2.5),
}));

// Functional Components
const GuestMenu = () => {
  const isMd = useMediaQuery("(max-width:500px)");
  const [stayDetails, setStayDetails] = useState({
    parking: true,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
  });

  const isInitialRender = useRef(true);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const incrementValue = (property) => {
    setStayDetails({
      ...stayDetails,
      [property]: stayDetails[property] + 1,
    });
  };

  const decrementValue = (property) => {
    if (stayDetails[property] === 1) {
      return;
    }
    setStayDetails({
      ...stayDetails,
      [property]: stayDetails[property] - 1,
    });
  };

  useEffect(() => {
    if (!isInitialRender.current) {
      localStorage.setItem("stayDetails", JSON.stringify(stayDetails));
    } else {
      isInitialRender.current = false;
    }
  }, [stayDetails]);

  useEffect(() => {
    const storedStayDetails = localStorage.getItem("stayDetails");

    if (storedStayDetails) {
      setStayDetails(JSON.parse(storedStayDetails));
    } else {
      localStorage.setItem("stayDetails", JSON.stringify(stayDetails));
    }
  }, []);

  return (
    <Box>
      {guestDetailsData.map((data) => {
        const value = stayDetails[data.value];
        return (
          <Box
            key={data.index}
            sx={{
              marginBlock: "0.5rem",
              display: "flex",
              alignItems: "left",
              width: "100%",
              textAlign: "left",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "left",
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: "50px",
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={400}
                  fontSize={isMd ?"1rem" :"1.2rem"}
                >
                  {data.heading}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ marginBottom: "1rem" }}
                  color={"grey"}
                  fontSize={isMd && "14px" }

                >
                  {data.subHeading}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: isMd ?".4rem" :"1rem",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  fontWeight={400}
                  onClick={() => decrementValue(data.value)}
                  color={"grey"}
                  sx={{
                    width: isMd ? "1.8rem" :"2.5rem",
                    height: isMd ? "1.8rem" :"2.5rem",
                    backgroundColor: "#f2f2f2",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Typography>

                <Typography
                  color={"black"}
                  textAlign={"center"}
                  style={{
                    textAlign: "center",
                  }}
                >
                  {value}
                </Typography>

                <Typography
                  color={"grey"}
                  onClick={() => incrementValue(data.value)}
                  sx={{
                    width: isMd ? "1.8rem" :"2.5rem",
                    height: isMd ? "1.8rem" :"2.5rem",
                    backgroundColor: "#f2f2f2",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddIcon fontSize="small" />
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}

      <Divider sx={{ color: "#000", marginBottom: "1.5rem" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          textAlign: "left",
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: "50px",
          marginBottom: "0.5rem",
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={400} fontSize={isMd ? "1rem":"1.2rem"}>
            Parking Required
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ marginBottom: "1rem" }}
            color={"grey"}
            fontSize={isMd && "14px"}
          >
            Choose if you need parking
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Switch
            {...label}
            checked={stayDetails.parking}
            onChange={() =>
              setStayDetails({
                ...stayDetails,
                parking: !stayDetails.parking,
              })
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

const PropertyType = () => {

  const [value, setValue] = React.useState( localStorage.getItem("propertyType") || "Room");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("propertyType", newValue);
  };

  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
    >
      <StyledTab
        style={{ textTransform: "inherit" }}
        value={"Room"}
        label="Room"
      />
      <StyledTab
        style={{ textTransform: "inherit" }}
        value={"Entire home"}
        label="Entire home"
      />
    </StyledTabs>
  );
};

// const RoomType = () => {
//   const storedValue = localStorage.getItem("roomType") || "Any Type";
//   const [values, setValues] = useState([false, false, false, false, false]);
//   const [selectedTabs, setSelectedTabs] = useState([storedValue]);
//   const theme = useTheme();

//   const handleChange = (index, tabValue) => {
//     setValues((prevValues) => {
//       const newValues = [...prevValues];
//       newValues[index] = !newValues[index];
//       return newValues;
//     });

//     setSelectedTabs((prevSelectedTabs) => {
//       const updatedTabs = [...prevSelectedTabs];
//       updatedTabs[index] = tabValue;
//       return updatedTabs;
//     });
//   };

//   useEffect(() => {
//     console.log(selectedTabs);
//   }, [selectedTabs]);

//   return (
//     <StyledTabs value={storedValue} indicatorColor="#000">
//       <StyledTab
//         value="Any Type"
//         style={{
//           textTransform: "inherit",
//           backgroundColor: values[0] ? theme.palette.primary.main : "#fff",
//           color: values[0] ? "#fff" : "#000",
//         }}
//         label="Any Type"
//         onClick={() => handleChange(0, "Any Type")}
//       />
//       <StyledTab
//         value="Flat"
//         style={{
//           textTransform: "inherit",
//           backgroundColor: values[1] ? theme.palette.primary.main : "#fff",
//           color: values[1] ? "#fff" : "#000",
//         }}
//         label="Flat"
//         onClick={() => handleChange(1, "Flat")}
//       />
//       <StyledTab
//         value="Guest House"
//         style={{
//           textTransform: "inherit",
//           backgroundColor: values[2] ? theme.palette.primary.main : "#fff",
//           color: values[2] ? "#fff" : "#000",
//         }}
//         label="Guest House"
//         onClick={() => handleChange(2, "Guest House")}
//       />
//       <StyledTab
//         value="Hotel"
//         style={{
//           textTransform: "inherit",
//           backgroundColor: values[3] ? theme.palette.primary.main : "#fff",
//           color: values[3] ? "#fff" : "#000",
//         }}
//         label="Hotel"
//         onClick={() => handleChange(3, "Hotel")}
//       />
//       <StyledTab
//         value="House"
//         style={{
//           textTransform: "inherit",
//           backgroundColor: values[4] ? theme.palette.primary.main : "#fff",
//           color: values[4] ? "#fff" : "#000",
//         }}
//         label="House"
//         onClick={() => handleChange(4, "House")}
//       />
//     </StyledTabs>
//   );
// };

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const SliderComponent = ({
  heading,
  priceRange,
  setPriceRange,
  sliderRange,
  setSliderRange,
}) => {
  const handlePriceChange = (event, newValue) => {
    setSliderRange(newValue);
    let [minVal, maxVal] = newValue;
    minVal = Math.round((minVal / 100) * 10000);
    maxVal = Math.round((maxVal / 100) * 10000);
    setPriceRange([minVal, maxVal]);
  };

  const handlePriceChangeCommitted = () => {
    setPriceRange(priceRange);
  };

  return (
    <>
      <Typography>{heading}</Typography>
      <Box display={"flex"} padding={"0.5rem"}>
        <AirbnbSlider
          slots={{ Thumb: AirbnbThumbComponent }}
          getAriaLabel={(index) =>
            index === 0 ? "Minimum price" : "Maximum price"
          }
          value={sliderRange}
          onChange={handlePriceChange}
          onChangeCommitted={handlePriceChangeCommitted}
        />
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        {heading === "Price Range" ? (
          <>
            <Typography>£ {priceRange[0]} </Typography>
            <Typography>£ {priceRange[1]} </Typography>
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Typography>{priceRange[0]}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Typography>{priceRange[1]}</Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

const FiltersDialog = ({
  open,
  handleClose,
  priceRange,
  setPriceRange,
  reviewsRange,
  setReviewsRange,
  sliderRange,
  setSliderRange,
  setLoading,
  setListings,
  setError,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery("(max-width:500px)");
  const [displayedItems, setDisplayedItems] = useState(6);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleShowLess = () => {
    setDisplayedItems(6);
  };

  const handleShowMore = () => {
    setDisplayedItems(amenitiesList.length);
  };

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities((prevSelected) =>
        prevSelected.filter((selected) => selected !== amenity)
      );
    } else {  
      setSelectedAmenities((prevSelected) => [...prevSelected, amenity]);
    }
  };

  const handleFilterClick = async () => {
    const stayDetails = JSON.parse(localStorage.getItem("stayDetails"));
    const propertyType = localStorage.getItem("propertyType");
    const { bathrooms, bedrooms, beds, guests, parking } = stayDetails;
    const [price_min, price_max] = priceRange;
    propertyType ? console.log(propertyType) : console.log("No property type");
    handleClose();

    setLoading(true);
    let data = `bathrooms=${bathrooms}&rooms=${bedrooms}&beds=${beds}&guests=${guests}&isParking=${
      parking ? "True" : "False"
    }`;

    if (propertyType) {
      data = data + `&property_type=${propertyType}`;
    }
    if (price_min && price_max) {
      data = data + `&price_min=${price_min}&price_max=${price_max}`;
    }
    if (selectedAmenities.length > 0) {
      data = data + `&ammeneties_offered=${selectedAmenities.join(",")}`;
    }
    try {
      console.log(data);
      const response = await fetchFilteredListings(data);
      console.log(response.results);
      setListings(response.results);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  const handleClearFilters = () => {
    window.location.reload();
    localStorage.removeItem("propertyType");
    handleClose();
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Filters</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          left: 10,
          top: 13,
          color: "#000",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Heading sx={{ fontSize: isMd && "20px"}}>Guests and Rooms</Heading>
        <GuestMenu />

        <Divider />

        <FilterBox>
          <Heading sx={{ fontSize: isMd && "20px"}}>Property Type</Heading>
          <PropertyType />
        </FilterBox>

        <Divider />

        {/* <FilterBox>
          <Heading>Room Type</Heading>
          <RoomType />
        </FilterBox> */}

        <Divider />

        <FilterBox>
          <SliderComponent
            heading={"Price Range"}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sliderRange={sliderRange}
            setSliderRange={setSliderRange}
          />
        </FilterBox>

        <Divider />

        {/* <FilterBox>
          <SliderComponent
            heading={"Ratings"}
            priceRange={reviewsRange}
            setPriceRange={setReviewsRange}
            sliderRange={sliderRange}
            setSliderRange={setSliderRange}
          />
        </FilterBox> */}

        <Divider />

        <FilterBox style={{ paddingBlock: "2rem 0rem" }}>
          <Heading sx={{ fontSize: isMd && "20px"}}>Amenities</Heading>

          <Grid container spacing={2}>
            {amenitiesList.slice(0, displayedItems).map((amenity, index) => (
              <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                 
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                    />
                  }
                  label={
                    <Typography
                      fontFamily={"Inter"}
                      fontSize={isMd ?"14px" :"0.8=9rem"}
                      variant="subtitle1"
                      color={"#000"}
                    >
                      {amenity}
                    </Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>

          {displayedItems < amenitiesList.length && (
            <Typography
              variant="body2"
              style={{
                marginTop: "1.5rem",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleShowMore}
            >
              Show More
            </Typography>
          )}

          {displayedItems === amenitiesList.length && (
            <Typography
              variant="body2"
              style={{
                marginTop: "1.5rem",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleShowLess}
            >
              Show Less
            </Typography>
          )}
        </FilterBox>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            textTransform: "initial",
            color: theme.palette.primary.dark,
            fontSize: "1.1rem",
          }}
          onClick={handleClearFilters}
        >
          Clear All
        </Button>
        <Button
          sx={{
            textTransform: "initial",
            fontSize: isMd ? ".98rem" : "1.1rem",
            padding: isMd ?"0.2rem 1rem" :"0.5rem 1rem",
            borderRadius: "10px",
            backgroundColor: theme.palette.primary.dark,
            color: "#fff",
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
          onClick={handleFilterClick}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default FiltersDialog;
