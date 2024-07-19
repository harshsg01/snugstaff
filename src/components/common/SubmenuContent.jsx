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
} from "@mui/material";
import { guestDetailsData, maps } from "../../data/data";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Calendar from "./Calendar";
import TextField from "@mui/material/TextField";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

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

const SearchInput = ({ setActive }) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("Anywhere");
  const { placesService, placePredictions, getPlacePredictions } =
    usePlacesService({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    });

  const handleOnChange = (e) => {
    getPlacePredictions({ input: e.target.value });
    setSelectedPlace(e.target.value);
  };

  console.log(selectedPlace);
  localStorage.setItem("selectedPlace", selectedPlace);

  const handlePlaceSelection = (prediction) => {
    setSelectedPlace(prediction.description);
    setShowResults(false);
    setActive(2);
    localStorage.setItem("placeLocation", prediction.description);
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

  useEffect(() => {
    const placeLocation = localStorage.getItem("placeLocation");
    if (placeLocation) {
      setSelectedPlace(placeLocation);
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <TextField
        style={{
          marginBottom: "2rem",
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
      {showResults && (
        <AutocompleteResults
          placePredictions={placePredictions}
          onSelect={handlePlaceSelection}
        />
      )}
    </div>
  );
};

const MapSubMenu = ({ open, setActive }) => {
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const prevSelectedArea = localStorage.getItem("selectedArea");
    if (prevSelectedArea) {
      setSelectedArea(prevSelectedArea);
    }
  }, []);

  const handleMapSelection = (area, placeLocation) => {
    setSelectedArea(area);
    localStorage.setItem("placeLocation", placeLocation);
    localStorage.setItem("selectedArea", area);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 10001,
        borderRadius: "30px",
        backgroundColor: "white",
        width: "auto",
        height: "auto",
        transform: "translateY(90px)",
        top: 0,
        marginLeft: "10px",
        overflow: "visible",
        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "3rem 2rem 2rem 2rem",
          borderRadius: "30px",
          boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
        }}
      >
        <SearchInput setActive={setActive} />
        <Typography variant="h3" fontWeight={300}>
          Select an Area
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap="20px"
          marginTop="30px"
          sx={{ backgroundColor: "white" }}
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
                width="120px"
                height="120px"
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
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 10001,
        borderRadius: "30px",
        backgroundColor: "white",
        height: "fit-content",
        transform: "translateY(90px)",
        padding: "2rem",
        top: 0,
        left: "38%",
        display: "flex",
        gap: "1rem",
        overflow: "visible",
        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
      }}
    >
      <Calendar setActive={setActive} minimumDays={3} />
    </Box>
  );
};

const GuestMenu = ({ open }) => {
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
    <Box
      sx={{
        position: "absolute",
        zIndex: 10001,
        borderRadius: "30px",
        backgroundColor: "white",
        height: "fit-content",
        transform: "translateY(90px)",
        padding: "2rem",
        top: 0,
        right: "30%",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflow: "visible",
        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
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
    </Box>
  );
};

const SubmenuContent = ({ open, active, setActive }) => {
  return (
    <>
      {active === 1 && <MapSubMenu open={open} setActive={setActive} />}
      {active === 2 && <CalenderSubMenu open={open} setActive={setActive} />}
      {active === 4 && <GuestMenu open={open} />}
    </>
  );
};

export default SubmenuContent;
