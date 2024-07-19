import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Skeleton,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
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
  Divider,
  Switch,
  Stack,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import { guestDetailsData } from "../../../../data/data";
import {
  fetchallPropTypes,
  fetchallRoomTypes,
} from "../../../../data/fetchEssentials";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { editListing } from "../../../../data/fetchListings";
import {
  fetchallAmeneties,
  fetchallAmenetiesCategories,
} from "../../../../data/fetchEssentials";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Masonry from "@mui/lab/Masonry";
import EditFeaturedImage from "../ListingCreation/EditFeaturedImage";
import EditImageBox from "../ListingCreation/EditGalleryImage";
import EditShowCaseImages from "../ListingCreation/EditShowcaseImages";

// Styled Components
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
  },
});

const StyledTab = styled((props) => <Tab {...props} disableRipple={true} />)(
  ({ theme }) => ({
    textTransform: "inherit",
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
    width: "600px",
  },
  "& .MuiPaper-root": {
    borderRadius: "20px",
    overflowY: "auto",
  },
  "& .MuiDialogActions-root": {
    borderTop: "1px solid #ebebeb",
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
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

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 400,
  marginBottom: theme.spacing(2),
}));

// Functional Components
const GuestMenu = ({ stayDetails, setStayDetails }) => {
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
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={400} fontSize={"1.2rem"}>
            Parking Required
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
    </Box>
  );
};

const PropertyType = ({ propertyType, setPropertyType }) => {
  const [propertyTypes, setPropertyTypes] = useState([]);

  const handleChange = (event, newValue) => {
    setPropertyType(newValue);
  };

  const fetchPropertyTypes = async () => {
    try {
      const response = await fetchallPropTypes();
      console.log(response);
      setPropertyTypes(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPropertyTypes();
  }, []);

  return (
    <>
      {propertyTypes && (
        <FormControl sx={{ marginBottom: 5 }} fullWidth variant="outlined">
          <Heading>Property Type</Heading>
          <StyledTabs
            value={propertyType}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            {propertyTypes &&
              propertyTypes.map((propertyType) => (
                <StyledTab
                  key={propertyType.id}
                  label={propertyType.type_name}
                  value={propertyType.id}
                />
              ))}
          </StyledTabs>

          <Divider sx={{ marginTop: 3 }} />
        </FormControl>
      )}
    </>
  );
};

const RoomType = ({ roomType, setRoomType }) => {
  const [roomTypes, setRoomTypes] = useState([]);

  const handleChange = (event, newValue) => {
    setRoomType(newValue);
  };

  const fetchRoomTypes = async () => {
    try {
      const response = await fetchallRoomTypes();
      console.log(response);
      setRoomTypes(response);
    } catch {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return (
    <>
      {roomTypes && (
        <FormControl sx={{ marginBottom: 5 }} fullWidth variant="outlined">
          <Heading>Room Type</Heading>
          <StyledTabs
            value={roomType}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            {roomTypes.map((roomType) => (
              <StyledTab
                key={roomType.id}
                label={roomType.type_name}
                value={roomType.id}
              />
            ))}
          </StyledTabs>

          <Divider sx={{ marginTop: 3 }} />
        </FormControl>
      )}
    </>
  );
};

const ListingEditDialog = ({
  open,
  handleClose,
  listing,
  setListing,
  currentDialog,
  images,
  featured,
  showcase,
  property,
}) => {
  const [existingimage, setExistingimage] = useState(images);

  const handleImageEdit = (index) => {
    // Add your image editing logic here
    console.log(`Editing image at index ${index}`);
    const updatedImages = [...existingimage];
    updatedImages.splice(index, 1); // Remove the image at the specified index
    setExistingimage(updatedImages);
  };

  const ImageComponent = ({ src, index }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = src;
    }, [src]);

    const skeletonWidth = `${imageDimensions.width}px`;
    const skeletonHeight = `${imageDimensions.height}px`;

    return (
      <>
        {!imageLoaded && (
          <Skeleton
            sx={{
              backgroundColor: "f2f2f2",
              marginBottom: "10px",
            }}
            variant="rectangular"
            animation="wave"
            width={skeletonWidth}
            height={skeletonHeight}
          />
        )}

        {imageLoaded && (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              src={`${src}?w=162&auto=format`}
              alt={"property-image"}
              onError={(e) => {
                e.target.src = noimage;
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                display: "block",
                cursor: "pointer",
                transition: "opacity 0.3s ease-in-out",
                opacity: 1,
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = 0.8;
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = 1;
              }}
            />
            <IconButton
              style={{
                position: "absolute",
                top: 15,
                right: 15,
                color: "#fff",
                background: "rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
                transform: "translate(50%, -50%)", // Adjust the position of the icon
                padding: "0",
              }}
              onClick={() => handleImageEdit(index)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </>
    );
  };

  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(listing?.placeholder_name ?? "");
  const [propertyType, setPropertyType] = useState(
    listing?.property_type.id ?? ""
  );

  const [amenetiesCategories, setAmenetiesCategories] = useState([]);
  const fetchAmenetiesCategories = async () => {
    try {
      const response = await fetchallAmenetiesCategories();
      console.log(response);
      setAmenetiesCategories(response);
    } catch {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAmenetiesCategories();
    window.scrollTo(0, 0);
  }, []);

  const [roomType, setRoomType] = useState(listing?.room_type.id ?? "");
  const [address, setAddress] = useState(listing?.listing_location ?? "");
  const [streetAddress, setStreetAddress] = useState(
    listing?.street_address ?? ""
  );
  const [city, setCity] = useState(listing?.city ?? "");
  const [county, setCounty] = useState(listing?.county ?? "");
  const [postCode, setPostCode] = useState(listing?.postcode ?? "");
  const [shortDescription, setShortDescription] = useState(
    listing?.short_description ?? ""
  );
  const [longDescription, setLongDescription] = useState(
    listing?.long_description ?? ""
  );

  // Initialize selectedAmenities based on listing.ameneties_offered
  const initialSelectedAmenities =
    listing?.ammeneties_offered?.map((amenity) => amenity.ammenetie_name) || [];
  const initialSelectedAmenitiesid =
    listing?.ammeneties_offered?.map((amenity) => amenity.id) || [];
  const [selectedAmenities, setSelectedAmenities] = useState(
    initialSelectedAmenities
  );

  const [amenitiesList, setAmenitiesList] = useState(
    initialSelectedAmenitiesid
  );

  const [stayDetails, setStayDetails] = useState({
    parking: listing?.isParking ?? false,
    guests: listing?.guests ?? 0,
    bedrooms: listing?.bedrooms ?? 0,
    beds: listing?.beds ?? 0,
    bathrooms: listing?.bathrooms ?? 0,
  });

  const handleAmenityChange = (amenity, id) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities((prevSelected) =>
        prevSelected.filter((selected) => selected !== amenity)
      );
    } else {
      setSelectedAmenities((prevSelected) => [...prevSelected, amenity]);
    }

    if (amenitiesList?.includes(id)) {
      setAmenitiesList((prevSelected) =>
        prevSelected.filter((selected) => selected !== id)
      );
    } else {
      setAmenitiesList((prevSelected) => [...prevSelected, id]);
    }
  };

  const handleEditClick = async () => {
    try {
      setLoading(true);

      const data = {
        uid: listing.id,
        bathrooms: stayDetails.bathrooms,
        rooms: stayDetails.bedrooms,
        beds: stayDetails.beds,
        guests: stayDetails.guests,
        isParking: stayDetails.parking,
        room_type: roomType,
        property_type: propertyType,
        placeholder_name: name,
        short_description: shortDescription,
        long_description: longDescription,
        listing_location: address,
        street_address: streetAddress,
        city: city,
        county: county,
        postcode: postCode,
        ammeneties_offered: amenitiesList,
      };
      console.log(data);
      const response = await editListing(data);
      console.log(response);
      setListing(response);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
      handleClose();
    }
  };

  return (
    <div>
      {currentDialog === "amenities" && (
        <BootstrapDialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          {/* <DialogTitle id="scroll-dialog-title">Edits</DialogTitle> */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              left: 10,
              top: 16,
              color: "#000",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Stack width={"100%"} spacing={3} style={{ padding: "20px" }}>
            <Heading style={{ textAlign: "center", marginTop: "20px" }}>
              Edit all available ameneties
            </Heading>

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

          <DialogActions>
            <Button
              sx={{
                marginTop: "10px",
                textTransform: "initial",
                fontSize: "1.1rem",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                backgroundColor: theme.palette.primary.dark,
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
              onClick={handleEditClick}
            >
              Apply Changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}

      {currentDialog === "basic" && (
        <BootstrapDialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Edits</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              left: 10,
              top: 16,
              color: "#000",
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent dividers>
            {/* Property Name */}
            <Stack marginBottom={5}>
              <Heading>Property Name</Heading>

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Address"
                />
              </FormControl>
            </Stack>

            {/* Property Address */}
            <Stack marginBottom={5}>
              <Heading>Property Address</Heading>

              <TextField
                sx={{ marginBottom: 3 }}
                fullWidth
                label="Property Address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <TextField
                sx={{ marginBottom: 3 }}
                fullWidth
                label="Street Address"
                id="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />

              <TextField
                sx={{ marginBottom: 3 }}
                fullWidth
                label="City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <TextField
                sx={{ marginBottom: 3 }}
                fullWidth
                label="County"
                id="county"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
              />

              <TextField
                sx={{ marginBottom: 3 }}
                fullWidth
                label="PostCode"
                id="postcode"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
            </Stack>

            {/* Property Type */}
            <PropertyType
              propertyType={propertyType}
              setPropertyType={setPropertyType}
            />

            {/* Room Type */}
            <RoomType roomType={roomType} setRoomType={setRoomType} />

            {/* Guest Stay Details */}
            <Stack marginBottom={3}>
              <Heading>Guests and Rooms</Heading>
              <GuestMenu
                stayDetails={stayDetails}
                setStayDetails={setStayDetails}
              />
              <Divider sx={{ marginTop: 2 }} />
            </Stack>

            {/* Descriptions */}
            <Stack spacing={4}>
              <Heading>Edit Property Descriptions</Heading>

              <FormControl
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
              >
                <InputLabel htmlFor="shortDescription">
                  Edit the short description
                </InputLabel>
                <OutlinedInput
                  id="shortDescription"
                  minRows={3}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  label="shortDescription"
                />
              </FormControl>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button
              sx={{
                textTransform: "initial",
                fontSize: "1.1rem",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                backgroundColor: theme.palette.primary.dark,
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
              onClick={handleEditClick}
            >
              Apply Changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}

      {currentDialog === "image" && (
        <BootstrapDialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Edit Images</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              left: 10,
              top: 16,
              color: "#000",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Masonry rows={3} spacing={1} style={{ padding: "0 20px" }}>
            {featured && <EditFeaturedImage existingimage={existingimage} />}
            {showcase && <EditShowCaseImages existingimage={existingimage} />}
            {property && (
              <EditImageBox
                existingimage={existingimage}
                handleClose={handleClose}
              />
            )}

            {existingimage.length > 0 ? (
              existingimage.map((item, index) => (
                <ImageComponent
                  key={index}
                  index={index}
                  src={item?.raw_image || noimage}
                  hash={item.hash}
                />
              ))
            ) : (
              // Default structure when no existing images
              <DialogContent style={{ maxHeight: "180px" }}>
                {/* Add any other default content or styling here */}
              </DialogContent>
            )}
          </Masonry>
        </BootstrapDialog>
      )}
    </div>
  );
};

export default ListingEditDialog;
