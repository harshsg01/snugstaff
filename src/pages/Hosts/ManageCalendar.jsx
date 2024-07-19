import React, { useState ,useEffect} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
 
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cancel from "../../assets/maps/icons8-cancel-60.png"
import LoadingScreen from "../../utils/LoadingScreen";
import { fetchHostBookings} from "../../data/fetchBooking";
import FetchError from "../../components/common/FetchError";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);


const ManageCalendar = () => {
  const theme = useTheme();
  const [selectData, setSelectData] = useState(null);
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchBookings = async () => {
    try {
      const response = await fetchHostBookings();
      setBooking(response);
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

  if (loading) {
    return <LoadingScreen />;
  }
  }, []);

  if (error) {
    return <FetchError />;
  }


  


  const scheduleData = [
    {
      Id: 1,
      name: "Herry Jon",
      Location: "Space Center USA",
      StartTime: "2024-03-04T04:00:00.000Z",
      EndTime: "2024-03-06T05:30:00.000Z",
      CategoryColor: "#1aaa55",
    },
    {
      Id: 2,
      name: "Jhon Deo",
      Location: "Space Center USA",
      StartTime: "2024-03-08T04:00:00.000Z",
      EndTime: "2024-03-11T05:30:00.000Z",
      CategoryColor: "#1aaa55",
    },
  ];

  const [events, setEvents] = useState(
    scheduleData.map((event) => ({
      start: new Date(event.StartTime),
      end: new Date(event.EndTime),
      name: event.name,
      id: event.Id,
      location: event.Location,
    }))
  );

  const handleSelectableData = (event) => {
    console.log("Selected event:", event);
    setSelectData(event);
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "#439AD4",
      },
    };
  };

  const CustomEventComponent = ({ event }) => {
    return (
      <div>
        <p>{event.name}</p>
        <p>{event.location}</p>
      </div>
    );
  };

  const isRoomBookedOnDate = (date) => {
    return events.some((event) => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      const checkDate = moment(date);
      return checkDate.isBetween(eventStart, eventEnd, "day", "[]");
    });
  };

  const dayPropGetter = (date) => {
    if (isRoomBookedOnDate(date)) {
      return {
        style: {
          backgroundColor: "#439AD4",
        },
      };
    } else {
      return {
        style: {
          backgroundColor: "#FFFFFF",
        },
      };
    }
  };

  return (
    <Box width={"100vw"} minHeight={"100vh"} sx={{width:'100%', padding: isMd || selectData ? " 0rem ":" 0 12rem",display:"flex",flexDirection: isMd ? "column":"row", justifyContent:"center",justifyItems:"center",}}>
      <Box sx={{ width: selectData && !isMd ? "76%" : "100%",}}>
        <Calendar
          views={["week", "month"]}
          defaultDate={moment().toDate()}
          defaultView="month"
          events={events}
          localizer={localizer}
          selectable
          resizable
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEventComponent,
          }}
          onSelectEvent={handleSelectableData}
          dayPropGetter={dayPropGetter}
          style={{ height: "90vh", width: "", padding: "1rem" }}
        />
      </Box>

      {selectData && (

      <Box  sx={{ width: isMd ?"100%" :"24%", border: "1px solid #0000001f",padding: isMd && !isSm ? "1rem 6rem":".4rem 1rem"}}>

        <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography sx={{ fontSize: "32px"}}>
                Reservation Details
                </Typography>
                <Typography onClick={()=>setSelectData(null)} sx={{width:"2.4rem",height:"2.4rem",cursor:"pointer"}}>
              <img src={Cancel} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </Typography>
            </Box>
              <Box sx={{width:"100%",height:"14rem",paddingTop:".2rem"}}>
            
              <img src="	https://gemmaedens.co.uk/media/listings/processed_Bathroom1.jpeg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography sx={{ fontSize: "24px"}}>
                Room in
                </Typography>
                <Typography>
                Cannough Palace House
                </Typography>
            </Box> 

            <Divider sx={{padding:".2rem 0"}}/>


            <Typography sx={{ fontSize: "24px", paddingTop:".2rem"}}>
            Guest Details
          </Typography>
          <Box sx={{display:"flex",flexDirection:"column"}}>
            <Box sx={{display:"flex",justifyContent:"space-between" ,padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                Guest Name
                </Typography>
                <Typography>
                  Tusar Singh
                </Typography>
            </Box>

            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
               Email
                </Typography>
                <Typography>
                admin@unravler.eu.org
                </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                Booked Dates
                </Typography>
                <Typography>
                Dec 14 - Dec 14
                </Typography>
            </Box>
            </Box>
            <Divider sx={{padding:".4rem 0"}}/>

            <Typography sx={{ fontSize: "24px", paddingTop:".2rem"}}>
            Stay Requirements
          </Typography>
          <Box sx={{display:"flex",flexDirection:"column"}}>
            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                Expected Guests
                </Typography>
                <Typography>
               4
                </Typography>
            </Box>

            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                Bedrooms Required
                </Typography>
                <Typography>
               2
                </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                Beds Required
                </Typography>
                <Typography>
               3
                </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                Bathrooms Required
                </Typography>
                <Typography>
               4
                </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                Parking Needed
                </Typography>
                <Typography>
              No
                </Typography>
            </Box>
            </Box>
            <Divider sx={{paddingTop:".6rem"}}/>

            <Typography sx={{ fontSize: "24px", paddingTop:".2rem"}}>
            Your Earnings
          </Typography>
          <Box sx={{display:"flex",flexDirection:"column"}}>
          <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                0 Nights Charges
                </Typography>
                <Typography>
                £ 0
                </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                Cleaning Fee
                </Typography>
                <Typography>
                £ 80
                </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                Snugstaff Charges
                </Typography>
                <Typography>
                £ 10
                </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between",padding:".1rem 0", alignItems:"center"}}>
                <Typography>
                You will get
                </Typography>
                <Typography>
                £ -90
                </Typography>
            </Box>

            
            </Box>

    </Box>

      )}
    </Box>

  );
};

export default ManageCalendar;
