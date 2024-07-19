import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Divider,
  Stack,
  Typography,
  styled,
  useTheme,
  Box,
  Button,
} from "@mui/material";
import ListingDetailsDialog from "./ListingEditDialog";
import { patch } from "../../../../utils/Api";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 500,
  marginBottom: theme.spacing(3),
}));

const BasicColumn = ({ heading, subheading, handleOpen, editType }) => {
  const theme = useTheme();

  return (
    <Stack direction={"column"} spacing={2}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"column"} spacing={0.5}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 400,
            }}
          >
            {heading}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: "0.9rem",
              fontWeight: 300,
              fontFamily: "Inter",
            }}
          >
            {subheading}
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 400,
            textDecoration: "underline",
            color: theme.palette.primary.main,
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
          // onClick={handleOpen}
          onClick={() => {
            handleOpen();
            editType === "amenities" && handleAmenitiesEditClick();
          }}
        >
          Edit
        </Typography>
      </Stack>

      <Divider sx={{ marginBlock: "1.5rem 2rem" }} />
    </Stack>
  );
};

const BasicColumnTinyMCE = ({
  heading,
  id,
  stateValue,
  setStateValue,
  key_name,
}) => {
  const [loading, setLoading] = useState(false);
  const payload = {
    uid: id,
    [key_name]:stateValue
  };


  const handleSaveListing = async () => {
    setLoading(true);
    console.log("payload", payload);
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    const url = "/api/listing/";

    try {
      const res = await patch(url, payload, config);
      console.log("Response:", res);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Stack direction={"column"} paddingBottom={"2rem"} spacing={2}>
      <Stack direction={"column"} spacing={1}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          spacing={0.5}
          alignItems={"center"}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 400,
            }}
          >
            {heading}
          </Typography>

          <Button
            onClick={handleSaveListing}
            sx={{
              backgroundColor: "#439AD4",
              color: "#fff",
              padding: ".2rem .6rem",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#2A7BAF",
              },
            }}
          >
            {loading ? "Saving..." : "save"}
          </Button>
        </Stack>
        <Box>
          <ReactQuill
            value={stateValue}
            onChange={(newContent) => setStateValue(newContent)}
            style={{ height: "300px" }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};



const DetailsTab = ({ listing, setListing }) => {
  const [open, setOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState("amenities");

  const [long_description, setLong_description] = useState(
    listing.long_description
  );
  const [features, setFeatures] = useState(listing.features);
  const [house_rules, setHouse_rules] = useState(listing.house_rules);
  const [cancellation_policy, setCancellation_policy] = useState(
    listing.cancellation_policy
  );

  const handleOpen = (editType) => {
    setCurrentDialog(editType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAmenitiesEditClick = () => {
    handleOpen("amenities");
  };

  const handleEditClick = async () => {
    handleOpen("basic");
  };

  return (
    <Stack paddingTop={2}>
      {/* Listing Basics */}
      <Stack spacing={5}>
        <Heading>Listing Basics</Heading>

        <BasicColumn
          heading={"Listing Name"}
          subheading={
            listing.placeholder_name
              ? listing.placeholder_name
              : "Not Available"
          }
          handleOpen={handleEditClick}
        />

        <BasicColumn
          heading={"Listing Address"}
          subheading={
            listing.listing_location
              ? listing.listing_location
              : "Not Available"
          }
          handleOpen={handleEditClick}
        />
        <BasicColumn
          heading={"Property Type"}
          subheading={
            listing.property_type.type_name
              ? listing.property_type.type_name
              : "Not Available"
          }
          handleOpen={handleEditClick}
        />
        <BasicColumn
          heading={"Room Type"}
          subheading={
            listing.room_type.type_name
              ? listing.room_type.type_name
              : "Not Available"
          }
          handleOpen={handleEditClick}
        />
        <BasicColumn
          heading={"Maximum Guests"}
          subheading={listing.guests ? listing.guests : 0}
          handleOpen={handleEditClick}
        />
        <BasicColumn
          heading={"Bathrooms"}
          subheading={listing.bathrooms ? listing.bathrooms : 0}
          handleOpen={handleEditClick}
        />
        <BasicColumn
          heading={"Rooms"}
          subheading={listing.rooms ? listing.rooms : 0}
          handleOpen={handleEditClick}
        />
        <BasicColumn
          heading={"Beds"}
          subheading={listing.beds ? listing.beds : 0}
          handleOpen={handleEditClick}
        />
        <BasicColumn
          heading={"Parking"}
          subheading={listing.isParking ? "Available" : "Not Available"}
          handleOpen={handleEditClick}
        />
        <BasicColumn
          heading={"Short Description"}
          subheading={
            listing.short_description
              ? listing.short_description
              : "Not Available"
          }
          handleOpen={handleEditClick}
        />

        <BasicColumnTinyMCE
          key_name={"long_description"}
          heading={"Long Description"}
          id={listing.id}
          stateValue={long_description}
          setStateValue={setLong_description}
        />

        <BasicColumn
          heading={"Amenities"}
          subheading={
            listing.ammeneties_offered
              ? listing.ammeneties_offered
                  .map((item) => item.ammenetie_name)
                  .join(", ")
              : "Not Available"
          }
          handleOpen={handleAmenitiesEditClick}
        />
        {/* House Feature */}

        <BasicColumnTinyMCE
          key_name={"house_rules"}
          heading={"House Rules"}
          id={listing.id}
          stateValue={house_rules}
          setStateValue={setHouse_rules}
        />

        {/* house Rules */}

        <BasicColumnTinyMCE
          key_name={"features"}
          heading={"House Features"}
          id={listing.id}
          stateValue={features}
          setStateValue={setFeatures}
        />

        {/* Cancellation policy */}

        <BasicColumnTinyMCE
          key_name="cancellation_policy"
          heading={"Cancellation Policy"}
          id={listing.id}
          stateValue={cancellation_policy}
          setStateValue={setCancellation_policy}
        />
      </Stack>

      <ListingDetailsDialog
        listing={listing}
        setListing={setListing}
        open={open}
        handleClose={handleClose}
        currentDialog={currentDialog}
      />
    </Stack>
  );
};

export default DetailsTab;
