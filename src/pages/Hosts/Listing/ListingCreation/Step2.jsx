import {
  Button,
  FormControl,
  Stack,
  styled,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  TextField,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import Pricing from "./Pricing";
import {
  fetchallAmeneties,
  fetchallAmenetiesCategories,
} from "../../../../data/fetchEssentials";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
          width: 100%;
          font-family: IBM Plex Sans, sans-serif;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 12px 16px;
          border-radius: 8px;
          color: none;
          background: white;
          border: 1px solid grey;
          box-shadow: 0px 0px 0px grey;
      
          &:focus {
            border-color: ${theme.palette.primary.main};
            box-shadow: 0 0 0 1px ${theme.palette.primary.main};
          }
      
          // Firefox
          &:focus-visible {
            outline: 0;
          }
        `
);

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 400,
  marginBottom: theme.spacing(2),
}));

const Step2 = ({
  onNext,
  onBack,
  ButtonStyles,
  shortDescription,
  setShortDescription,
  longDescription,
  setLongDescription,
  selectedAmenities,
  setSelectedAmenities,
  pricePerNight,
  setPricePerNight,
  amenitiesList,
  setAmenitiesList,
  serviceFees,
  setServiceFees,
  features,
  setFeatures,
  house_rules,
  setHouse_rules,
}) => {
  const [ameneties, setAmeneties] = useState([]);
  const [amenetiesCategories, setAmenetiesCategories] = useState([]);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));


  const isValid =
    shortDescription &&
    longDescription &&
    features &&
    house_rules &&
    selectedAmenities.length > 0 &&
    amenitiesList.length > 0 &&
    pricePerNight &&
    serviceFees;
  // const isValid = true;

  

  const handleAmenityChange = (amenity, id) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities((prevSelected) =>
        prevSelected.filter((selected) => selected !== amenity)
      );
      
    } else {
      setSelectedAmenities((prevSelected) => [...prevSelected, amenity]);
    }

    if (amenitiesList.includes(id)) {
      setAmenitiesList((prev) => prev.filter((item) => item !== id));
    } else {
      setAmenitiesList([...amenitiesList, id]);
    }

    
  };

 

// When setting in session storage
useEffect(() => {
  sessionStorage.setItem("selectedAmenities", JSON.stringify(selectedAmenities));
}, [selectedAmenities]);

useEffect(() => {
  sessionStorage.setItem("amenitiesList", JSON.stringify(amenitiesList));
}, [amenitiesList]);
  

  useEffect(() => {
    sessionStorage.setItem("shortDescription", shortDescription);
    sessionStorage.setItem("longDescription", longDescription);
    sessionStorage.setItem("features", features);
    sessionStorage.setItem("house_rules", house_rules);
    sessionStorage.setItem("pricePerNight", pricePerNight);
    sessionStorage.setItem("serviceFees", serviceFees);
  }, [shortDescription, longDescription, features, house_rules, pricePerNight, serviceFees]);

  

  const fetchAmenetiesCategories = async () => {
    try {
      const response = await fetchallAmenetiesCategories();
      console.log(response);
      setAmenetiesCategories(response);
    } catch {
      console.log(error);
    }
  };

  const handleNext = () => {
    if (!isValid) {
      return;
    }

    onNext();
  };

  useEffect(() => {
    fetchAmenetiesCategories();
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    console.log("hello", house_rules, features);
  };
  return (
    <form>
      <Stack
        spacing={8}
        sx={{ paddingInline: isMd ? 2 : 18, width: "100%", paddingBlock: 6 }}
      >
        {/* Buttons */}
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Button
            style={ButtonStyles}
            variant="contained"
            color="primary"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            style={ButtonStyles}
            disabled={!isValid}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
          </Button>
        </Stack>

        {/* Property Description */}
        <Stack spacing={3}>
          <Heading>Add a Description</Heading>

          <TextField
            sx={{ marginBottom: 2 }}
            fullWidth
            label="Enter a short description"
            id="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />

          <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
            <ReactQuill
              value={longDescription }
              placeholder="Enter a long Description"
              onChange={(newContent) => setLongDescription(newContent)}
              style={{ height: "240px", fontSize: "30px" }}
            />
          </FormControl>
        </Stack>

        <Stack spacing={3}>
          <Heading>Add a House Features</Heading>
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
            <ReactQuill
              value={features }
              placeholder="Enter features"
              onChange={(newContent) => setFeatures(newContent)}
              style={{ height: "240px", fontSize: "30px" }}
            />
          </FormControl>
        </Stack>

        <Stack spacing={3}>
          <Heading>Add a House Rules</Heading>

          <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
            <ReactQuill
              value={house_rules}
              placeholder="Enter House Rules "
              onChange={(newContent) => setHouse_rules(newContent)}
              style={{ height: "240px", fontSize: "30px" }}
            />
          </FormControl>
        </Stack>

        {/* Pricing Setup */}
        <Stack spacing={3}>
          <Pricing
            setPricePerNight={setPricePerNight}
            pricePerNight={pricePerNight}
            Heading={Heading}
            serviceFees={serviceFees}
            setServiceFees={setServiceFees}
          />
        </Stack>

        {/* Amenities */}
        <Stack width={"100%"} spacing={3}>
          <Heading>Select all available ameneties</Heading>

          <Box width={"100%"} container spacing={2}>
            {amenetiesCategories.map((item) => (
              <Accordion
                key={item.id}
                sx={{
                  margin: "1.5rem 0",
                  boxShadow: " 0px 6px 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: theme.shape.borderRadius,
                  "&.MuiAccordion-root::before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>{item.category_name}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid width={"100%"} container spacing={2}>
                    {item.ammeneties.map((item, index) => (
                      <Grid item xs={6} sm={6} md={6} lg={4} key={item.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedAmenities.includes(
                                item.ammenetie_name
                              )}
                              onChange={() =>
                                handleAmenityChange(
                                  item.ammenetie_name,
                                  item.id
                                )
                              }
                            />
                          }
                          label={
                            <Typography
                              fontFamily={"Inter"}
                              fontSize={"0.8=9rem"}
                              variant="subtitle1"
                              color={"#000"}
                            >
                              {item.ammenetie_name}
                            </Typography>
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Stack>

        {/* Buttons */}
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Button
            style={ButtonStyles}
            variant="contained"
            color="primary"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            style={ButtonStyles}
            disabled={!isValid}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default Step2;
