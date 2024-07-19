import React from "react";
import {
  Box,
  Grid,
  styled,
  Typography,
  Button,
  Divider,
  useTheme,
  css,
  Checkbox,
} from "@mui/material";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { listingsData } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useSelector } from "react-redux";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: "1rem",
  borderRadius: "2rem",
  backgroundColor: "#fff",
  width: "100%",
  zIndex: 2,
  border: `1px solid ${theme.palette.secondary.light}`,
  boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.12)",
  transition: "all 0.5s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.01)",
  },
}));

const StyledImage = styled("img")({
  width: "100%",
  height: "16rem",
  objectFit: "cover",
  borderRadius: "2rem",
});

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

const responsivePadding = css`
  @media (max-width: 600px) {
    padding: 2vw;
  }
`;

const Featured = ({ data }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const dataToShow = data || listingsData;

  const handlePropertySelection = () => {
    // navigate("/property");
  };

  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Box
      padding={{
        xs: "4vw 0.5vw 4vw 0.5vw",
        sm: "4vw 0 4vw 0",
        md: "8vw 0vw 4vw 0vw",
      }}
      css={responsivePadding}
      textAlign="center"
    >
      {dataToShow.showHeading && (
        <>
          <Typography
            variant="h1"
            fontSize={"3rem"}
            textAlign="center"
            marginBottom={{ xs: "2rem", md: "0.5rem" }}
          >
            {dataToShow.heading}
          </Typography>

          <Typography variant="subtitle1" paragraph>
            {dataToShow.subHeading}
          </Typography>
        </>
      )}

      <div className="content grid3 mtop">
        <Grid container spacing={4} padding={"2vw 8vw"}>
          {dataToShow.properties.map((data, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <StyledBox onClick={handlePropertySelection}>
                <StyledImage src={data.image} alt="Property" />

                {data.isRibbon && (
                  <Ribbon>
                    <RibbonIcon>
                      <AutoAwesomeOutlinedIcon />
                    </RibbonIcon>
                    <RibbonText variant="subtitle2">
                      {data.ribbonText}
                    </RibbonText>
                  </Ribbon>
                )}

                <Box
                  paddingBlock={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      textAlign={"left"}
                      variant="h2"
                      marginBlock="0.4rem"
                    >
                      {data.title}
                    </Typography>
                    <Typography
                      textAlign={"left"}
                      variant="subtitle2"
                      sx={{ color: "#6C727F" }}
                    >
                      {data.location}
                    </Typography>
                  </Box>
                  { isLoggedIn && (<Checkbox
                    disableRipple
                    // onClick={() => setChecked(!checked)}
                    icon={<FavoriteBorder sx={{ color: "black" }} />}
                    checkedIcon={
                      <Favorite sx={{ color: theme.palette.primary.main }} />
                    }
                  />)}
                </Box>

                <Divider />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginBlock={1.5}
                  flexWrap="wrap"
                >
                  <Box display="flex" marginTop={"0.5rem"} alignItems="center">
                    <KingBedOutlinedIcon
                      sx={{
                        fontSize: "1.5rem",
                        marginRight: "0.2rem",
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="subtitle2">{data.bed} Beds</Typography>
                  </Box>

                  <Box display="flex" marginTop={"0.5rem"} alignItems="center">
                    <BathtubOutlinedIcon
                      sx={{
                        fontSize: "1.5rem",
                        marginRight: "0.3rem",
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="subtitle2">
                      {data.bath} Bathrooms
                    </Typography>
                  </Box>

                  <Box display="flex" marginTop={"0.5rem"} alignItems="center">
                    <WidgetsOutlinedIcon
                      sx={{
                        fontSize: "1.5rem",
                        marginRight: "0.3rem",
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="subtitle2">Public Parking</Typography>
                  </Box>
                </Box>

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
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="subtitle2">Booking Price</Typography>
                    <Typography
                      variant="subtitle1"
                      display="flex"
                      alignItems="center"
                    >
                      <span
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: "700",
                          fontSize: "1.7rem",
                          marginRight: "0.3rem",
                        }}
                      >
                        £{data.price}
                      </span>
                      / night{" "}
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      paddingY: "0.5rem",
                      paddingX: { xs: "0.5rem", sm: "1.4rem" },
                      color: "#fff",
                      backgroundColor: theme.palette.primary.dark,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    <DescriptionOutlinedIcon
                      sx={{ fontSize: "0.9rem", marginRight: "0.2rem" }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "0.9rem",
                        textTransform: "capitalize",
                        marginRight: "0.2rem",
                      }}
                    >
                      Book Now
                    </Typography>
                  </Button>
                </Box>
              </StyledBox>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default Featured;
