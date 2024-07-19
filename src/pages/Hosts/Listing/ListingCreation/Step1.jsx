import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  Tab,
  Tabs,
  styled,
  Typography,
  Divider,
  Box,
  Switch,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import React, { useRef, useState, useEffect } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { hostGuestDetailsData } from "../../../../data/data";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  fetchallPropTypes,
  fetchallRoomTypes,
} from "../../../../data/fetchEssentials";
import TextField from "@mui/material/TextField";

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
  ({ theme }) => {
    const isMd = useMediaQuery(theme.breakpoints.down("sm"));

    return {
      textTransform: "inherit",
      backgroundColor: "#fff",
      marginBlock: "0.5rem",
      border: "1px solid #e8e8e8",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: isMd ? "0.6rem" : "1rem", // Adjust font size based on isMd
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
    };
  }
);

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 400,
  marginBottom: theme.spacing(2),
}));

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
    } catch {
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
          <Heading>Property Category</Heading>
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
      sessionStorage.setItem("stayDetails", JSON.stringify(stayDetails));
    } else {
      isInitialRender.current = false;
    }
  }, [stayDetails]);

  useEffect(() => {
    const storedStayDetails = "";

    if (storedStayDetails) {
      setStayDetails(JSON.parse(storedStayDetails));
    } else {
      localStorage.setItem("stayDetails", JSON.stringify(stayDetails));
    }
  }, []);

  return (
    <Box>
      {hostGuestDetailsData.map((data) => {
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
          <Typography variant="subtitle1" fontWeight={400} fontSize={"1.2rem"}>
            Parking Available
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ marginBottom: "1rem" }}
            color={"grey"}
          >
            Choose if you have parking available
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

const Step1 = ({
  onNext,
  onBack,
  ButtonStyles,
  stayDetails,
  setStayDetails,
  name,
  setName,
  propertyType,
  setPropertyType,
  roomType,
  setRoomType,
  address,
  setAddress,
  streetAddress,
  setStreetAddress,
  city,
  setCity,
  county,
  setCounty,
  postCode,
  setPostCode,
}) => {
  const isValid =
    name &&
    propertyType &&
    roomType &&
    address &&
    stayDetails &&
    streetAddress &&
    city &&
    county &&
    postCode;

  // const isValid = true;

  const handleNext = () => {
    if (!isValid) {
      return;
    }

    console.log(name, propertyType, roomType, address, stayDetails);
    onNext();
  };

  useEffect(() => {
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("propertyType", propertyType);
    sessionStorage.setItem("roomType", roomType);
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("streetAddress", streetAddress);
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("city", city);
    sessionStorage.setItem("postCode", postCode);
    sessionStorage.setItem("county", county);
  }, [name, propertyType, roomType, address, streetAddress, city, county, postCode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <form>
      <Stack
        spacing={5}
        sx={{ paddingInline: isMd ? 2 : 18, width: "100%", paddingBlock: 6 }}
      >
        {/* Buttons */}
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Button
            style={ButtonStyles}
            disabled
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

        {/* Property Name */}
        <Stack spacing={3}>
          <Heading>Property Name</Heading>

          <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
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
        <Stack spacing={3}>
          <Heading>Add Address</Heading>
          <TextField
            sx={{ marginBottom: 2 }}
            fullWidth
            label="Property/House Number"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={isValid && !address}
          />

          <TextField
            sx={{ marginBottom: 2 }}
            fullWidth
            label="Street Address"
            id="streetAddress"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            error={isValid && !streetAddress}
          />

          <TextField
            sx={{ marginBottom: 2 }}
            fullWidth
            label="City"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={isValid && !city}
          />

          <TextField
            sx={{ marginBottom: 2 }}
            fullWidth
            label="County"
            id="county"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            error={isValid && !county}
          />

          <TextField
            sx={{ marginBottom: 2 }}
            fullWidth
            label="Postcode"
            id="postcode"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
            error={isValid && !postCode}
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
        <Stack spacing={3}>
          <Heading>Guest Stay Details</Heading>

          <GuestMenu
            stayDetails={stayDetails}
            setStayDetails={setStayDetails}
          />
        </Stack>

        {/* Buttons */}
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Button
            style={ButtonStyles}
            disabled
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

export default Step1;
