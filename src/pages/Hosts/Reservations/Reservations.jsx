import { Stack, Typography,Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTabs } from "../../../utils/useTabs";
import image from "../../../assets/featured/feat-1.jpg";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
const NoReservations = () => {
  return (
    <Box
      sx={{
        height: "50vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" fontSize={"1.8rem"}>
        No Reservations Found
      </Typography>
      <Typography variant="caption" fontSize={"1rem"} marginBlock={"0.5rem"}>
        There are currently no reservations found for your listings.
      </Typography>
    </Box>
  );
};

const ShowReservations = ({ data }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/host/reservations-details");
  };

  if (!data) {
    return <NoReservations />;
  }
  return (
    <Stack marginTop={1}>
      <Grid container direction={"row"} spacing={2}>
        {data.map((item) => (
          <Grid
            onClick={handleClick}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.id}
            style={{
              cursor: "pointer",
              marginBottom: 14,
              paddingLeft: 0,
              paddingRight: `${isMd ? 0 : 20}`,
              display: `${isMd ? "flex" : null}`,
              flexDirection: `${isMd ? "column" : null}`,
              alignContent: `${isMd ? "center" : null}`,
              alignItems: `${isMd ? "center" : null}`,
            }}
          >
            {/* Image with label */}
            <Box
              height={"250px"}
              width={"80%"}
              position="relative"
              marginBottom={2}
            >
              <img
                src={item.image}
                alt="Royal Stays"
                style={{ borderRadius: "20px" }}
                width={"100%"}
                height={"100%"}
              />
            </Box>

            {/* Heading and Subheading */}
            <Typography fontSize={"1.2rem"} fontWeight={400}>
              28 Jan - 5 Feb
            </Typography>

            <Typography
              variant="subtitle2"
              fontFamily={"Inter"}
              fontWeight={200}
            >
              8 Nights
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

const AllReservations = () => {
  const data = [
    {
      id: 1011,
      image: image,
    },
    {
      id: 1012,
      image: image,
    },
    {
      id: 1013,
      image: image,
    },
    {
      id: 1014,
      image: image,
    },
    {
      id: 1015,
      image: image,
    },
    {
      id: 1016,
      image: image,
    },
  ];
  return <ShowReservations data={data} />;
};

const UpcomingReservations = () => {
  const data = [
    {
      id: 1011,
      image: image,
    },
    {
      id: 1012,
      image: image,
    },
    {
      id: 1013,
      image: image,
    },
    {
      id: 1014,
      image: image,
    },
  ];
  return <ShowReservations data={data} />;
};

const CompletedReservations = () => {
  const data = [
    {
      id: 1011,
      image: image,
    },
    {
      id: 1012,
      image: image,
    },
  ];
  return <ShowReservations data={data} />;
};

const CancelledReservations = () => {
  return <ShowReservations />;
};

const tabs = [
  {
    label: "All",
    content: <AllReservations />,
  },
  {
    label: "Upcoming",
    content: <UpcomingReservations />,
  },
  {
    label: "Completed",
    content: <CompletedReservations />,
  },
  {
    label: "Cancelled",
    content: <CancelledReservations />,
  },
];
import { fetchHostBookings } from "../../../data/fetchBooking";
// import FetchError from "../../../components/common/FetchError";
import LoadingScreen from "../../../utils/LoadingScreen";
import Confirmed from "./Confirmed";
import Requests from "./Requests";
import Completed from "./Completed";
import Cancelled from "./Cancelled";

const tabStyles = {
  fontWeight: 600,
  textTransform: "inherit",
  fontSize: "16px",
  fontFamily: "Inter",
  paddingInline: "0px",
  marginRight: "1.5rem",
};

const Reservations = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    {
      label: "Requests",
      content: <Requests data={bookings.filter((booking) => !booking.is_accepted && !booking.is_cancelled)} />,
    },
    {
      label: "Confirmed",
      content: <Confirmed data={bookings.filter((booking) => booking.is_accepted && !booking.is_cancelled)} />,
    },
    {
      label: "Completed",
      content: <Completed />,
    },
    {
      label: "Cancelled",
      content: <Cancelled data={bookings.filter((booking) => booking.is_cancelled)} />,
    },
  ];

  const { tabsComponent, tabPanelsComponent } = useTabs(tabs, tabStyles);

  const fetchBookings = async () => {
    try {
      const response = await fetchHostBookings();
      setBookings(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (error) {
    // return <FetchError />;
    navigate("/common/login")
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      paddingInline={isMd ? "2rem" : 16}
      paddingTop={isMd ? 6 : 6}
      paddingBottom={6}
      width={"100vw"}
      minHeight={"100vh"}
      direction="column"
      spacing={2}
      sx={{display:'flex',
    
    }}
    >
      <Typography fontWeight={500} fontSize={"2rem"}>
        Reservations
      </Typography>
      {tabsComponent}
   
      {tabPanelsComponent}

    </Stack>
  );
};

export default Reservations;
