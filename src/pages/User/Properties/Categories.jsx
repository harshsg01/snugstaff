import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FiltersDialog from "./FiltersDialog";
import { locationFilterData } from "../../../data/data";
import {
  fetchFilteredListings,
  fetchallListings,
} from "../../../data/fetchListings";
import { useMediaQuery } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

const Categories = ({
  setListings,
  setError,
  setLoading,
  priceRange,
  reviewsRange,
  sliderRange,
  setPriceRange,
  setReviewsRange,
  setSliderRange,
  selectedRoomType,
  setSelectedRoomType,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [roomTab, setRoomTab] = useState([]);
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = () => {
    setOpen(true);
  };

  console.log("defgnh",selectedRoomType);

  const handleFilterRoomTypes = async (roomType) => {
    setSelectedRoomType(roomType);
    setLoading(true);
    try {
      const data = `room_type=${roomType}`;
      const response = await fetchFilteredListings(data);
      console.log(response.results);
      setListings(response.results);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearFilter = async () => {
    try {
      setLoading(true)
      setSelectedRoomType("")

      const response = await fetchallListings();
      console.log(response);
      setListings(response.results);
    } catch (error) {
      console.log(error);
      // setListings(listingsApiSample);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
      localStorage.removeItem("roomType");
    }
  };

  useEffect(() => {
    const api = "https://gemmaedens.co.uk/api/room/types/";
    axios
      .get(api)
      .then((response) => {
        setRoomTab(response.data.response);
        console.log("hhehehvehve", response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <Box
      sx={{
        minHeight: "2vh",
        width: isMd ? "100%" : "100%",
        padding: isMd ? "5rem 1rem 0 1rem" : "7.2rem 8vw .3rem 8vw",
        position: "fixed",
        zIndex: 1000,
        top: 0,
        left: 0,
        backgroundColor: "white",
        // boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.12)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          width: isMd ?"72%": "94%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "1rem",
          paddingBlock: ".2rem",
        }}
      >
        {/* {locationFilterData.map((item) => (
            <Box
              key={item.index}
              onClick={() => handleFilterRoomTypes(item.name)}
              sx={{
                width: "15%",
              textAlign: "center",
              paddingBlock: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              borderBottom:
                selectedRoomType === item.name
                  ? "1px solid #000"
                  : "1px solid #fff",
              "&:hover": {
                borderBottom: "1px solid #000",
              },
            }}
          >
           
            <Typography
              textAlign={"center"}
              variant="subtitle2"
              color="black"
              fontWeight={200}
            >
              {item.name}
            </Typography>
          </Box>
        ))} */}

        <Tabs
          variant="scrollable"
          aria-label="scrollable auto tabs example"
          scrollButtons
          allowScrollButtonsMobile
        >
          {roomTab.map((item, index) => (
            <Tab
              key={index}
              label={item.type_name}
              // icon={
              //   <i
              //     style={{ fontSize: "1.5rem", color: "black" }}
              //     className={item.iconClass}
              //   ></i>
              // }
              onClick={() => handleFilterRoomTypes(item.type_name)}
              sx={{
                fontSize:isMd ?"12px" : "14px",
                fontFamily: "Inter",
                textTransform: "capitalize",
                marginRight: isMd ? "0rem" : "7rem",
                color: selectedRoomType === (item.type_name) && "#439AD4",
                borderBottom: selectedRoomType === (item.type_name) && "1px solid  #439AD4"
                // lineHeight: ".9",
              }}
            />
          ))}
        </Tabs>
      </Box>

      {isMd ? (
        <TuneOutlinedIcon
          onClick={handleOpen}
          sx={{
            width: "1.8rem",
            cursor: "pointer",
            height: "2rem",
            fontSize: "1.2rem",
            boxShadow: "0 0 0 0.2px #63615a",
            backgroundColor: "#fff",
            borderRadius: "0.3rem",
            padding: "0.2rem 0.2rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              color: "#fff",
            },
          }}
        />
      ) : (
        <Button
          onClick={handleOpen}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingY: "0.5rem",
            paddingX: { xs: "1rem", sm: "2.4rem" },
            color: "#000",
            backgroundColor: "#fff",
            borderRadius: "0.5rem",
            boxShadow: "0 0 0 0.2px #63615a",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              color: "#fff",
            },
          }}
        >
          <TuneOutlinedIcon
            style={{ fontSize: "1rem", marginRight: isMd ? null : "0.5rem" }}
          />
          <Typography
            sx={{
              fontSize: "1rem",
              textTransform: "capitalize",
            }}
          >
            Filters
          </Typography>
        </Button>
      )}

      {selectedRoomType && (
        <Box
          onClick={handleClearFilter}
          sx={
            isMd
              ? {
                  width: "2rem",
                  height: "2rem",
                  cursor: "pointer",
                  fontSize: "1.4rem",
                  boxShadow: "0 0 0 0.2px #63615a",
                  backgroundColor: "#fff",
                  borderRadius: "0.3rem",
                  padding: "0.2rem",
                  "&:hover": {
                    backgroundColor: "#df4747",
                    color: "#fff",
                  },
                }
              : {
                  width: "10%",
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  gap: ".2rem",
                  justifyContent: "center",
                  paddingY: ".5rem",
                  paddingX: { xs: "0.5rem", sm: "1rem" },
                  color: "#000",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  borderRadius: "0.5rem",
                  boxShadow: "0 0 0 0.2px #63615a",
                  "&:hover": {
                    backgroundColor: "#df4747",
                    color: "#fff",
                  },
                }
          }
        >
          {isMd ? (
            <DeleteForeverIcon />
          ) : (
            <>
              <DeleteForeverIcon style={{ fontSize: "1rem" }} />
              <Typography
                sx={{
                  fontSize: "1rem",
                  textTransform: "capitalize",
                }}
              >
                Clear
              </Typography>
            </>
          )}
        </Box>
      )}

      <FiltersDialog
        open={open}
        handleClose={handleClose}
        priceRange={priceRange}
        reviewsRange={reviewsRange}
        sliderRange={sliderRange}
        setPriceRange={setPriceRange}
        setReviewsRange={setReviewsRange}
        setSliderRange={setSliderRange}
        setLoading={setLoading}
        setListings={setListings}
        setError={setError}
      />
    </Box>
  );
};

export default Categories;