import React from 'react'
import { useState, useEffect } from 'react'
import { Divider, Stack, Typography, Box} from '@mui/material';
import { fetchHostTotalpayment } from '../../data/fetchHostTotalpayment';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../utils/LoadingScreen';

const UserTotalpayment = () => {
    const [monthlypayment, setMonthlypayment] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const handlehostmonthlypayment = async () => {
        try {
            setLoading(true)
          const response = await fetchHostTotalpayment();
          console.log(response);

        setMonthlypayment(response);
        } catch (error) {
          console.log(error);
          setError(error);
        } finally {
          setLoading(false);
          window.scrollTo(0, 0);
        }
      };

    useEffect(() => {
        handlehostmonthlypayment();
    }, []);

    if (loading) {
        return <LoadingScreen />;
      }
    
      if (error) {
        // return <FetchError />;
        navigate("/common/login")
      }



    const formatDateRange = (bookingStart, bookingEnd) => {
        // const options = { day: "numeric", month: "short" };
    
        // const startDate = new Date(bookingStart);
        // const endDate = new Date(bookingEnd);
    
        // const startFormatted = startDate.toLocaleDateString("en-US", options);
        // const endFormatted = endDate.toLocaleDateString("en-US", options);
        console.log(bookingStart, bookingEnd)
        return `${bookingStart} - ${bookingEnd}`;
    };

    const handlepayment = (paymentId) => {
        navigate("/payment/" + paymentId)
    }


  return (
    <>
    <Box sx={{ width: " 65%", margin: "50px auto" }}>
      {/* Main Heading */}
      <Typography marginBottom={5} variant="h1" fontWeight={500}>
        Overall Payment Records
      </Typography>

      {monthlypayment?.payment_info_serializer?.map((item) => (
        <>
        <Stack onClick={() => handlepayment(item?.id)} style={{cursor: "pointer"}}>
            <Typography
            marginBlock={3}
            fontSize={"1.2rem"}
            variant="subtitle1"
            fontWeight={600}
            >
            Booking Id: {item?.id}
            </Typography>

            <Typography
            marginBlock={3}
            fontSize={"1rem"}
            variant="subtitle1"
            fontWeight={300}
            marginTop={"-20px"}
            color={"grey"}
            >
            {item?.start_date && item?.end_date
              ? formatDateRange(item?.start_date, item?.end_date)
              : ""}
            </Typography>

            <Stack spacing={4} sx={{ marginBottom: "2rem" }} direction={"column"}>
            <Box
                sx={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
                }}
            >
                <Typography fontSize={"1.1rem"}>Total Amount</Typography>

                <Typography
                fontFamily={"Inter"}
                variant="subtitle2"
                fontSize={"1rem"}
                fontWeight={300}
                style={{ textTransform: "uppercase" }}
                >
                {(item?.amount_total / 100).toFixed(1)} {item?.currency}
                </Typography>
            </Box>

            <Box
                sx={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
                }}
            >
                <Typography fontSize={"1.1rem"}>Status</Typography>

                <Typography
                fontFamily={"Inter"}
                variant="subtitle2"
                fontSize={"1rem"}
                fontWeight={300}
                >
                {item?.status}
                </Typography>
            </Box>

            <Box
                sx={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
                }}
            >
                <Typography fontSize={"1.1rem"}>Payment Status</Typography>

                <Typography
                fontFamily={"Inter"}
                variant="subtitle2"
                fontSize={"1rem"}
                fontWeight={300}
                >
                {item?.payment_status}
                </Typography>
            </Box>

            
            </Stack>
        </Stack>

        <Divider></Divider>
        </>
      ))}
      
    </Box>
    </>
  )
}

export default UserTotalpayment
