import {
  Box,
  Button,
  Divider,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

const StyledBox = styled(Box)(() => ({
  padding: "1rem",
  borderRadius: "2rem",
  backgroundColor: "#fff",
  width: "55%",
  zIndex: 2,
  marginBottom: "2.5rem",
}));

const StyledImage = styled("img")(() => ({
  width: "100%",
  borderRadius: "2rem",
}));

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

const RibbonIcon = styled("span")(({ theme }) => ({
  fontSize: "1rem",
  color: "white",
}));

const RibbonText = styled(Typography)(() => ({
  color: "white",
  marginLeft: "8px",
}));

const PropCard = ({ data }) => {
  const theme = useTheme();
  const { isRealCard } = data;

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    border: `1px solid #E7E5F9`,
    padding: theme.spacing(1.2),
    "&:hover": {
      backgroundColor: isRealCard ? theme.palette.primary.main : "inherit",
      "& .MuiSvgIcon-root": {
        color: isRealCard ? "#fff" : "none",
      },
    },
  }));

  return (
    <StyledBox>
      <StyledImage src={data.image} alt="styledProperty" srcset="" />

      {data.isRibbon && (
        <Ribbon>
          <RibbonIcon>
            <AutoAwesomeOutlinedIcon />
          </RibbonIcon>
          <RibbonText variant="subtitle2">{data.ribbonText}</RibbonText>
        </Ribbon>
      )}

      <Box
        paddingBlock={1}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography variant="h2" marginBlock={"0.4rem"}>
            {data.title}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: "#6C727F",
            }}
          >
            {data.location}
          </Typography>
        </Box>

        <CustomBox>
          <FavoriteBorderIcon
            sx={{
              fontSize: "1.3rem",
              "&.MuiSvgIcon-root": { color: theme.palette.primary.main },
            }}
          />
        </CustomBox>
      </Box>

      <Divider />

      <Box display={"flex"} justifyContent={"space-between"} marginBlock={1.5}>
        <Box display={"flex"} alignItems={"center"}>
          <KingBedOutlinedIcon
            sx={{
              fontSize: "1.5rem",
              marginRight: "0.3rem",
              color: theme.palette.primary.main,
            }}
          />
          <Typography variant="subtitle2">{data.bed} Beds</Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <BathtubOutlinedIcon
            sx={{
              fontSize: "1.5rem",
              marginRight: "0.3rem",
              color: theme.palette.primary.main,
            }}
          />
          <Typography variant="subtitle2">{data.bath} Bathrooms</Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
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

      {!data.isHomeCard && (
        <Box
          p={1.3}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          backgroundColor={theme.palette.primary.paper}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Typography variant="subtitle2">Booking Price</Typography>
            <Typography
              variant="subtitle1"
              display={"flex"}
              alignItems={"center"}
            >
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "700",
                  fontSize: "1.9rem",
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
              paddingX: "1.4rem",
              color: "#fff",
              cursor: isRealCard ? "pointer" : "inherit",
              backgroundColor: theme.palette.primary.dark,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            disableRipple={true}
            disableFocusRipple={true}
          >
            <DescriptionOutlinedIcon
              sx={{
                fontSize: "0.9rem",
                marginRight: "0.2rem",
              }}
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
      )}
    </StyledBox>
  );
};

export default PropCard;