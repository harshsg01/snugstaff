import { Button, Box, Stack, styled, Typography, Checkbox, useMediaQuery, useTheme, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Featured from "../../../User/Properties/Featured";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CreateIcon from "@mui/icons-material/Create";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HostMessageDialog from "./HostMessageDialog";
import { Link, useNavigate } from "react-router-dom";


const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  textAlign: "left",
}));

const nextStepsData = [
  {
    icon: <PostAddIcon />,
    headline: "Submit your documents ",
    description:
      "Go to the Listing Editing Page and submit your required property complaince documents.",
  },
  {
    icon: <CreateIcon />,
    headline: "Adjust your Settings",
    description:
      "Set house rules, a cancellation policy, choose how many guests can book, and more.",
  },
  {
    icon: <EmojiPeopleIcon />,
    headline: "Prepare for your Guests",
    description:
      "Clean up the House, keep things organised to make your place comfortable.",
  },
];

const NextSteps = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  

  return (
    <Stack
      width={isMd ? "100%" : "50%"}
      direction={"column"}
      spacing={5}
      justifyContent={"center"}
    >
      <Heading>What to do Next?</Heading>

      <Stack direction={"column"} spacing={4}>
        {nextStepsData.map((data, index) => (
          <Stack direction={"row"} spacing={2} key={index}>
            <Box paddingTop={0.6}>{data.icon}</Box>

            <Stack direction={"column"} spacing={0.5}>
              <Typography
                variant="h6"
                sx={{ fontSize: "1.3rem", fontWeight: "500" }}
              >
                {data.headline}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.9rem",
                  fontFamily: "Inter",
                  fontWeight: "300",
                }}
              >
                {data.description}
              </Typography>

              
            </Stack>
          </Stack>
        ))}

              
      </Stack>
      
      
      
    </Stack>
  );
};

const PropertyCard = ({ images, name, stayDetails, pricePerNight }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const onClick = () => {
    console.log("Clicked");
  };

  const propertyDetails = [
    {
      id: 1,
      placeholder_name: name,
      bathrooms: stayDetails.bathrooms,
      rooms: stayDetails.bedrooms,
      beds: stayDetails.beds,
      guests: stayDetails.guests,
      isLuxury: false,
      property_type: {
        id: "0a3efb13-bf61-40f5-9e0e-7153cec1d870",
        updated_at: "2023-12-01T11:40:05.607122Z",
        type_name: "Entire Home",
      },
      pricing: pricePerNight,
      currency: {
        id: "f203bdea-1fd0-4d4f-99a6-d37f29bd21ab",
        updated_at: "2023-11-26T01:30:03.298970Z",
        currency_name: "GBP",
        currency_sign: "£",
      },
      featured_image: {
        id: "8ea6e42b-a5d7-47f0-8874-bf46f234225d",
        raw_image: images[0],
        hash: "pZLE1ftR9ER.M_D%-p~qV@M{t8aKt7xvs:NGRkofflogjZbIt7-;RjWAaeIUxaWBfls:V[t6s:t7R*WBofaeWCj]",
      },
      average_rating: "0.00",
      property_images: [
        {
          id: "df1dae87-5829-4126-b25f-2ab037ece963",
          raw_image: images[0],
          hash: "pDN1AVE1xuITtRWUM{_N?a%2o}MxNGxas;o#xvnOM{jFWDIVRPo}oeRiWrV@IUxujFozozITS2xuV[tRxuNFkWRi",
        },
      ],
    },
  ];

  return (
  
    <Box width={isMd ? "100%" : "50%"} style={{margin:"auto"}} >
      <Featured
        onClick={onClick}
        gridData={12}
        data={propertyDetails}
        donothover={1}
      />
    </Box>

    
  );
};

const Step5 = ({
  onBack,
  ButtonStyles,
  handlePublishProperty,
  images,
  name,
  propertyType,
  stayDetails,
  pricePerNight,
  message,
  open,
  handleClose,
  completed,
}) => { 
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(false);
  const subscriptionType = sessionStorage.getItem("subscriptionType");

  useEffect(() => {
    // Update localStorage when isTermsChecked changes
    sessionStorage.setItem("isTermsChecked", JSON.stringify(isTermsChecked));
  }, [isTermsChecked]);

  const handleCheckboxChange = (event) => {
    setIsTermsChecked(event.target.checked);
  };

  const handleSecondCheckboxChange = (event) => {
    setIsSecondCheckboxChecked(event.target.checked);
  };

  const canSubmit = isTermsChecked && isSecondCheckboxChecked;

  // Conditionally set padding based on isMd
  const paddingInline = isMd ? 2 : 8;
  const paddingBlock = isMd ? 2 : 6;

  return (
    <Stack
      spacing={10}
      sx={{ paddingInline, width: "100%", paddingBlock }}
    >
      {/* Heading */}
      <Stack direction={"column"}>
        <Typography
          variant="h1"
          fontSize={"2.5rem"}
          textAlign={"center"}
          marginBottom={{ xs: "2rem", md: "0.5rem" }}
        >
          Almost Ready to Submit to Publish!
        </Typography>

        <Typography
          variant="subtitle1"
          textAlign={"center"}
          color={"GrayText"}
          paragraph
        >
          Here is a preview of your listing at first glance. After you submit to
          publish, please follow the "What to do next?" Steps. Once these have
          been completed, our admin will approve your listing to go Live.
        </Typography>
      </Stack>

      {/* Featured */}
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingLeft={1}
        spacing={6}
        direction={isMd ? "column" : "row"}
        width={"100%"}
      >
        <PropertyCard
          images={images}
          name={name}
          propertyType={propertyType}
          stayDetails={stayDetails}
          pricePerNight={pricePerNight}
        />
        <NextSteps />
      </Stack>

      <Grid container direction="row" alignItems="center" spacing={2} width={isMd ? "100%" : "50%"} >
        {subscriptionType === "commission" && (
          <Grid item>
            <Stack direction="row" alignItems="center">
              <Checkbox
                checked={isTermsChecked}
                onChange={handleCheckboxChange}
              />
              <Typography variant="body1">
                Click this to acknowledge that if your listing has trademark or watermark on your images. Your Property will not be approved.
              </Typography>
            </Stack>
          </Grid>
        )}
        <Grid item>
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={isSecondCheckboxChecked}
              onChange={handleSecondCheckboxChange}
            />
            <Typography variant="body1">
              I agree to the <Link to="/policies/subscriptions" target="_blank">Subscription Policy</Link>
            </Typography>
          </Stack>
        </Grid>
      </Grid>

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
          variant="contained"
          color="primary"
          onClick={handlePublishProperty}
          disabled={!canSubmit && subscriptionType !== "month"} // Disable if both checkboxes are not checked and subscriptionType is not "month"
        >
          Submit
        </Button>
      </Stack>

      <HostMessageDialog
        message={message}
        open={open}
        handleClose={handleClose}
        completed={completed}
      />
    </Stack>
  );
};



export default Step5;





