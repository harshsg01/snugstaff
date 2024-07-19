import React, { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Switch,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
  createTheme
} from "@mui/material";

import { addDays } from "date-fns";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { guestDetailsData, maps } from "../../data/data";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Calendar from "./Calendar";
import TextField from "@mui/material/TextField";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import SearchIcon from "@mui/icons-material/Search";
import { fetchFilteredListingsLocation } from "../../data/fetchListings";
import { Stack } from "@mui/system";

const Image = styled("img")({
  borderRadius: "20px",
  objectFit: "contain",
  boxShadow: "0px 0px 0px 0.4px rgba(0, 0, 0, 0.4)",
  transition: "border 0.2s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    border: "1px solid #000",
  },
});

const AutocompleteResults = ({ placePredictions, onSelect }) => {
  return (
    <Paper
      elevation={5}
      style={{
        position: "absolute",
        padding: "0.5rem",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 1,
        overflow: "scroll",
        borderRadius: "30px",
        height: "50vh",
      }}
    >
      <List>
        {placePredictions.map((prediction) => (
          <ListItem
            key={prediction.place_id}
            button
            onClick={() => onSelect(prediction)}
          >
            <i
              style={{ marginRight: "1rem", fontSize: "1.5rem" }}
              className="fi fi-rr-marker"
            ></i>
            <ListItemText
              primary={prediction.structured_formatting.main_text}
              secondary={prediction.structured_formatting.secondary_text}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const SearchInput = ({ setActive, setShowInitialScreen }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const locate = useLocation();
  const path = locate.pathname;
  const [placeDetails, setPlaceDetails] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  const { placesService, placePredictions, getPlacePredictions } =
    usePlacesService({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    });

  useEffect(() => {
    const location = localStorage.getItem("location");
    if (location) {
      setSelectedPlace(location);
    }
  }, []);

  const handleOnChange = (e) => {
    getPlacePredictions({ input: e.target.value });
    setSelectedPlace(e.target.value);
  };

  console.log(selectedPlace)
  localStorage.setItem('selectedPlace', selectedPlace)

  const handlePlaceSelection = (prediction) => {
    setSelectedPlace(prediction.description);
    setShowResults(false);
    setActive(2);
    localStorage.setItem("location", prediction.description);
  };

  useEffect(() => {
    if (placePredictions.length > 0) {
      setShowResults(true);
    }

    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => setPlaceDetails(placeDetails)
      );
  }, [placePredictions]);

  const handleSettingDefaults = () => {
    const stayDetails = localStorage.getItem("stayDetails");
    const location = localStorage.getItem("location");
    const selectedDates = localStorage.getItem("selectedDates");

    if (!stayDetails) {
      const stayData = {
        parking: true,
        guests: 4,
        bedrooms: 2,
        beds: 2,
        bathrooms: 2,
      };
      localStorage.setItem("stayDetails", JSON.stringify(stayData));
    }

    if (!location) {
      localStorage.setItem("location", "Anywhere");
    }

    if (!selectedDates) {
      const defaultDates = [
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 2),
          key: "selection",
        },
      ];
      localStorage.setItem("selectedDates", JSON.stringify(defaultDates));
    }
  };

  useEffect(() => {
    handleSettingDefaults();
  }, []);

  const handleSearchClick = async () => {
    const selectedPlace = localStorage.getItem("selectedPlace");
    console.log(selectedPlace)
    setShowInitialScreen(true);

    // navigate("/properties");
    navigate(`/properties?selectedplace=${selectedPlace}`);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        paddingBottom: "1.2rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        style={{
          width: "100%",
        }}
        id="standard-basic"
        label="Search by area or city"
        value={selectedPlace}
        variant="standard"
        InputProps={{
          endAdornment: null,
        }}
        fullWidth
        onChange={handleOnChange}
      />
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          marginTop: "10px",
          paddingBlock: ".4rem",
          paddingInline: ".8rem",
          borderRadius: "50px",
          color: "white",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={handleSearchClick}
      >
        <Typography sx={{fontSize:"16px"}} >Search</Typography>
        {/* <SearchIcon fontSize="14px" /> */}
      </Box>
      {showResults && (
        <AutocompleteResults
          placePredictions={placePredictions}
          onSelect={handlePlaceSelection}
        />
      )}
    </div>
  );
};

const MapSubMenu = ({ open, setActive, setShowInitialScreen }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 1000, // Set your custom breakpoint at 1000px
        lg: 1001,
        xl: 1920,
      },
    },
  });
  const isSm = useMediaQuery(customTheme.breakpoints.down("sm"));

  useEffect(() => {
    const prevSelectedArea = localStorage.getItem("selectedArea");
    if (prevSelectedArea) {
      setSelectedArea(prevSelectedArea);
    }
  }, []);

  const handleMapSelection = (area, location) => {
    setSelectedArea(area);
    localStorage.setItem("location", location);
    localStorage.setItem("selectedArea", area);
    setActive(2);
  };

  return (
    <Box
     width={isSm ? "90%" : "65%"}
      sx={{
        position: "absolute",
        zIndex: 10001,
        borderRadius: "30px",
        backgroundColor: "white",
        height: "auto",
        transform: "translateY(90px)",
        top: "-0.48rem",
        left: ".2rem",
        right: "0.2rem",
        overflow: "visible",
        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
        margin: "auto",
      }}
      
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "1.6rem 2rem 2rem 2rem",
          borderRadius: "30px",
          boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
        }}
      >
        <SearchInput setActive={setActive} setShowInitialScreen={setShowInitialScreen} />
        <Typography variant="h3" fontWeight={300}>
          Select an Area
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))"
          gap=".6rem"
          sx={{
            backgroundColor: "white",
            overflowX: "auto",
            display: "flex",
            flexWrap: "nowrap",
            padding: "1.6rem 1rem 1rem 2rem",
            borderRadius: "30px",
            '&::-webkit-scrollbar': {
              display: 'none' // Hide scrollbar
            }
          }}
        >
          {maps.map((item, index) => (
            <Box
              key={index}
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
              }}
              textAlign="center"
              position="relative"
            >
              <Image
                src={item.image}
                alt={`Image ${index}`}
                width="96px"
                height="96px"
                onClick={() => handleMapSelection(index, item.text)}
                sx={{
                  border:
                    selectedArea == index
                      ? "1px solid #000"
                      : "1px solid transparent",
                }}
              />
              <Typography
                variant="body2"
                textAlign="left"
                padding="6px"
                border="1px solid transparent"
                borderRadius="10px"
                transition="border-color 0.3s"
                _hover={{
                  borderColor: "#4CAF50",
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>

      </Box>
    </Box>
  );
};

const CalenderSubMenu = ({ open, setActive }) => {
  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 1000, // Set your custom breakpoint at 1000px
        lg: 1001,
        xl: 1920,
      },
    },
  });
  const isSm = useMediaQuery(customTheme.breakpoints.down("sm"));

  const handleDateselection = () => {
    setActive(4);
  };

  const handleprevclick = () => {
    setActive(1);
  }

  return (
    <Box
     width={isSm ? "90%" : "65%"}
      sx={{
        position: "absolute",
        zIndex: 10001,
        borderRadius: "30px",
        backgroundColor: "white",
        height: "fit-content",
        transform: "translateY(90px)",
        padding: "2rem",
        top: "-.6rem",
        left: "0.2rem",
        right: "0.2rem",
        display: "flex",
        flexDirection:"column",
        gap: "1rem",
        overflow: "visible",
        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
        margin: "auto"
      }}
    >
      <Calendar setActive={setActive} minimumDays={4}  ismobile="true"/>
      <Stack display={"flex"} flexDirection={"row"}>
      <button onClick={handleprevclick}
      style={{width: isSm ? "30%" : "15%", margin:"auto", padding:"10px", 
      borderRadius:"5px", border:"none", color:"white", fontSize:"18px", fontWeight:"500", background:"rgb(15 156 218)"}}
      >Prev</button>

      <button onClick={handleDateselection}
      style={{width: isSm ? "30%" : "15%", margin:"auto", padding:"10px", 
      borderRadius:"5px", border:"none", color:"white", fontSize:"18px", fontWeight:"500", background:"rgb(15 156 218)"}}
      >Next</button>
      </Stack>
    </Box>
  );
};

const GuestMenu = ({ open, setActive, setShowInitialScreen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [stayDetails, setStayDetails] = useState({
    parking: true,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
  });

  const isInitialRender = useRef(true);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 1000, // Set your custom breakpoint at 1000px
        lg: 1001,
        xl: 1920,
      },
    },
  });
  const isSm = useMediaQuery(customTheme.breakpoints.down("sm"));

  const incrementValue = (property) => {
    setStayDetails({
      ...stayDetails,
      [property]: stayDetails[property] + 1,
    });
  };

  const decrementValue = (property) => {
    if (stayDetails[property] === 0) {
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


  const handleSearchClick = async () => {
    const selectedPlace = localStorage.getItem("selectedPlace");
    console.log(selectedPlace)
    setShowInitialScreen(true);

    // navigate("/properties");
    navigate(`/properties?selectedplace=${selectedPlace}`);
  };


  const handlePrevclick = () => {
    console.log("hd")
    setActive(2);
  }


  

  return (
    <>
    <Box
     width={isSm ? "90%" : "65%"}
      sx={{
        position: "absolute",
        zIndex: 10001,
        borderRadius: "30px",
        backgroundColor: "white",
        // height: "fit-content",
        transform: "translateY(90px)",
        padding: "2rem",
        top: "-.48rem",
        left: ".2rem",
        right: "0.2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        // overflow: "visible",
        height:"480px",
        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
        margin: "auto",
        overflowY: "scroll"
      }}
    >
      

      <Box
        sx={{
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
              fontSize={"1.2rem"}
            >
              Parking
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: "1rem" }}
              color={"grey"}
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
        <Divider sx={{ color: "#000" }} />
      </Box>

      {guestDetailsData.map((data) => {
        const value = stayDetails[data.value];
        return (
          <Box
            key={data.index}
            sx={{
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
                  fontSize={"1.2rem"}
                >
                  {data.heading}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ marginBottom: "1rem" }}
                  color={"grey"}
                >
                  {data.subHeading}
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
                <Typography
                  fontWeight={400}
                  onClick={() => decrementValue(data.value)}
                  color={"grey"}
                  sx={{
                    width: "2.5rem",
                    height: "2.5rem",
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
                    width: "2.5rem",
                    height: "2.5rem",
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
            <Divider sx={{ color: "#000" }} />
          </Box>
        );
      })}


      <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
      

      <Box
        width={isSm ? "25%" : "15%"}
        sx={{ 
          bgcolor: theme.palette.primary.main,
          paddingBlock: ".6rem",
          paddingInline: "1rem",
          borderRadius: "50px",
          color: "white",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          zIndex:"10002",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
        }}
        onClick={handlePrevclick}
      >
        Prev
      </Box>

      <Box
        width={isSm ? "30%" : "20%"}
        sx={{ 
          bgcolor: theme.palette.primary.main,
          paddingBlock: ".6rem",
          paddingInline: "0.8rem",
          borderRadius: "50px",
          color: "white",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          zIndex:"10002",
          float:"right",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
        }}
        onClick={handleSearchClick}
      >
        <Typography sx={{fontSize:"17px"}} >Search</Typography>
        {/* <SearchIcon fontSize="14px" /> */}
      </Box>
      </Stack>
    </Box>
  
        
  
      
      </>
  );
};

const SubmenuMobileContent = ({ open, active, setActive, setShowInitialScreen }) => {
  return (
    <>
      {active === 1 && <MapSubMenu open={open} setActive={setActive}  setShowInitialScreen={setShowInitialScreen}/>}
      {active === 2 && <CalenderSubMenu open={open} setActive={setActive} />}
      {active === 4 && <GuestMenu open={open} setActive={setActive} setShowInitialScreen={setShowInitialScreen} />}
    </>
  );
};

export default SubmenuMobileContent;
