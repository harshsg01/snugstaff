import { Box, Button, Divider, Grid, Typography, createTheme, Stack , Link} from "@mui/material";
import React, {useState} from "react";
import StarIcon from "@mui/icons-material/Star";
import Ameneties from "./Ameneties";
import noimage from "../../assets/noimage.png";
import { useMediaQuery, useTheme } from "@mui/material";
import CalendarCard from "./CalendarCard";

const Description = ({ propertyDetails }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const customTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000, // Set your custom breakpoint at 1000px
        lg: 1280,
        xl: 1920,
      },
    },
  });
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down("md"));
  const {
    street_address,
    city,
    rooms,
    beds,
    bathrooms,
    total_reviews,
    long_description,
    short_description,
    ammeneties_offered,
    postcode,
    listing_bookings,
    features,
    cancellation_policy,
    house_rules
  } = propertyDetails;

  // const features = propertyDetails.features
  //   ? JSON.parse(propertyDetails.features)
  //   : "";

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Function to truncate the content to 30 words
  const truncateContent = (content) => {
    const words = content.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    } else {
      return content;
    }
  };

    // Function to check if the string contains HTML tags
  const containsHTML = (str) => /<[a-z][\s\S]*>/i.test(str);

  // Function to wrap plain text inside <p> tags
  const wrapInPTag = (text) => `<p>${text}</p>`;

  // Render the description
  const renderDescription = (description) => {
    if (!description) return "No description available";
    if (!containsHTML(description)) {
      description = wrapInPTag(description);
    }
    return <Typography dangerouslySetInnerHTML={{ __html: description }} />;
  };
  
  return (
    <Box paddingTop={"2rem"} width={isMd ? "100%" : "60%"}>
      {/* Room Overview */}
      {street_address && (
        <>
          <Box paddingBottom={"1.5rem"} width={"100%"}>
            {street_address && (
              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", fontWeight: "500" }}
              >
                {street_address
                  ? city
                    ? postcode
                      ? `${street_address}, ${city}, ${postcode}`
                      : `${street_address}, ${city} `
                    : street_address
                  : "Location Not Found"}
              </Typography>
            )}

            {rooms && beds && bathrooms && (
              <Typography
                sx={{
                  marginBlock: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: 200,
                  color: "#0202020",
                }}
              >
                {rooms ? rooms : "01"} bedrooms • {beds ? beds : "01"} beds •{" "}
                {bathrooms ? bathrooms : "01"} bathrooms
              </Typography>
            )}

            {total_reviews > 10 && (
              <Box display={"flex"} marginTop={"1rem"} alignItems={"flex-end"}>
                <StarIcon fontSize="small" sx={{ textAlign: "left" }} />
                <Typography
                  onClick={() => {
                    const windowHeight = window.innerHeight;
                    const targetScrollPosition = Math.round(
                      windowHeight * 2.65
                    );
                    window.scrollTo({
                      top: targetScrollPosition,
                      behavior: "smooth",
                    });
                  }}
                  sx={{
                    marginLeft: "0.4rem",
                    textDecoration: "underline",
                    fontSize: "1rem",
                    fontWeight: 200,
                    color: "#0202020",
                    cursor: "pointer",
                  }}
                >
                  {total_reviews ? total_reviews : "0"} Reviews
                </Typography>
              </Box>
            )}
          </Box>
          <Divider sx={{ color: "#000", marginBottom: "1.5rem" }} />
        </>
      )}

      {/* Room Features */}
      {/* {features && (
        <>
          <Box paddingBlock={"1.5rem"}>
            {features.map((item) => {
              return (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  paddingBottom={"1.5rem"}
                  width={"100%"}
                  key={item.id}
                >
                  <Box
                    textAlign={"center"}
                    marginRight={"2rem"}
                    padding={"0.5rem"}
                    sx={{
                      backgroundColor: "#f0f7fc",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className={item.icon}
                      style={{
                        fontSize: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "50%",
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: "0.8rem",
                        fontFamily: "Inter",
                        fontWeight: "200",
                      }}
                    >
                      {item.description
                        ? item.description
                        : "No description available"}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Divider />
        </>
      )} */}

      {/* About Property */}
      {long_description && (
        <Box paddingBlock={"0rem 2rem"}>
          <Typography
            marginBottom={"1.5rem"}
            variant="h6"
            sx={{ fontSize: "1.5rem", fontWeight: "500" }}
          >
            About the property
          </Typography>

          {short_description && (
            <Typography
              sx={{
                marginBlock: "1rem",
                fontSize: "1.1rem",
                fontFamily: "Inter",
                fontWeight: "400",
              }}
            >
              {short_description
                ? short_description
                : "Short Description Not Found"}
            </Typography>
          )}

          <Typography
            variant="subtitle1"
            sx={{ fontSize: "0.5rem", fontFamily: "Inter", fontWeight: "200" }}
          >
            {/* {long_description ? long_description : "No description available"} */}
            {renderDescription(long_description)}
          </Typography>
        </Box>
      )}

      {(ammeneties_offered.length > 0 && !isSmallScreen) && <Divider />}

      {/* Ameneties */}
      {(ammeneties_offered.length > 0 && !isSmallScreen) && (
        <Ameneties amenetiesData={ammeneties_offered} />
      )}

      {(ammeneties_offered.length > 0 && isSmallScreen) && (
        

        
          <Stack
          justifyContent={"space-between"}
          direction={"column"}
          width={"100%"}
          marginBlock={"1rem"}
          spacing={10}
        >
           <CalendarCard listing_bookings={listing_bookings} />
          <Ameneties amenetiesData={ammeneties_offered} />
          
        </Stack>
        
      )}

      <Divider/>

      {features && (
        <>
          <Typography
            marginBottom={"1.5rem"}
            marginTop={"1.5rem"}
            variant="h6"
            sx={{ fontSize: "1.5rem", fontWeight: "500" }}
          >
            Features
          </Typography>
          <Typography
            sx={{
              marginBlock: "1rem",
              fontSize: "1.1rem",
              fontFamily: "Inter",
              fontWeight: "400",
            }}
            dangerouslySetInnerHTML={{ __html: expanded ? features : truncateContent(features) }}
          />
          {features.split(' ').length > 20 && (
            <Link onClick={toggleExpanded} style={{cursor:"pointer", color:"black", fontWeight:"bold", textDecoration:"none", marginBottom: "1rem"}}>
              {expanded ? 'Read less' : 'Read more'}
            </Link>
          )}
        </>
      )}
      

          <Divider/>

         {house_rules && (
            <>
            <Typography
            marginBottom={"1.5rem"}
            marginTop={"1.5rem"}
            variant="h6"
            sx={{ fontSize: "1.5rem", fontWeight: "500" }}
          >
            House Rules
          </Typography>
            <Typography
              sx={{
                marginBlock: "1rem",
                fontSize: "1rem",
                fontFamily: "Inter",
                fontWeight: "400",
              }}
              dangerouslySetInnerHTML={{ __html: expanded ? house_rules : truncateContent(house_rules) }}
            >
            </Typography>

            {house_rules.split(' ').length > 20 && (
            <Link onClick={toggleExpanded} style={{cursor:"pointer", color:"black", fontWeight:"bold", textDecoration:"none", marginBottom: "1rem"}}>
              {expanded ? 'Read less' : 'Read more'}
            </Link>
          )}
            </>
          )}

          {cancellation_policy && (
            <>
            <Typography
            marginBottom={"1.5rem"}
            marginTop={"1.5rem"}
            variant="h6"
            sx={{ fontSize: "1.5rem", fontWeight: "500" }}
          >
            Cancellation Policy
          </Typography>
            <Typography
              sx={{
                marginBlock: "1rem",
                fontSize: "1.1rem",
                fontFamily: "Inter",
                fontWeight: "400",
              }}
              dangerouslySetInnerHTML={{ __html: expanded ? cancellation_policy : truncateContent(cancellation_policy) }}
            >
            </Typography>

            {cancellation_policy.split(' ').length > 20 && (
            <Link onClick={toggleExpanded} style={{cursor:"pointer", color:"black", fontWeight:"bold", textDecoration:"none", marginBottom: "1rem"}}>
              {expanded ? 'Read less' : 'Read more'}
            </Link>
          )}
            </>
          )}

      
    </Box>
  );
};

export default Description;
