
import React, {useState, useEffect} from 'react'
import { fetchHostSubscriptionSinglepayment } from '../../data/fetchHostTotalpayment';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../../utils/LoadingScreen';
import { Stack, Typography, Box, Button } from '@mui/material';

const UserSinglepayment = () => {
  const [singlesubscriptionpayment, setSinglesubscriptionpayment] = useState()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { paymentId } = useParams()


  const handlehostsinglesubscriptionpayment = async (paymentId) => {
      try {
          setLoading(true)
        const response = await fetchHostSubscriptionSinglepayment(paymentId);
        console.log(response);
    
        setSinglesubscriptionpayment(response);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    
    useEffect(() => {
      handlehostsinglesubscriptionpayment(paymentId);
    }, [paymentId]);
    
    if (loading) {
      return <LoadingScreen />;
    }
    
    if (error) {
      // return <FetchError />;
      navigate("/common/login")
    }


    const formatDateRange = (bookingStart, bookingEnd) => {
      const options = { day: "numeric", month: "short" };
  
      const startDate = new Date(bookingStart);
      const endDate = new Date(bookingEnd);
  
      const startFormatted = startDate.toLocaleDateString("en-US", options);
      const endFormatted = endDate.toLocaleDateString("en-US", options);
  
      return `${startFormatted} - ${endFormatted}`;
  };

  

  const handleDownloadInvoice = () => {
    const invoiceUrl = singlesubscriptionpayment?.invoice_downloadable;
    if (invoiceUrl) {
        window.open(invoiceUrl, '_blank');
    }
};

const handleInvoiceweb = () => {
    const invoicewebUrl = singlesubscriptionpayment?.invoice_web;
    if (invoicewebUrl) {
        window.open(invoicewebUrl, '_blank');
    }
}

  


  return (
      <Box sx={{ width: " 65%", margin:'50px auto' }}>
      {/* Main Heading */}
      <Typography marginBottom={2} variant="h1" fontWeight={500}>
        Payment Details
      </Typography>

          <Stack>
            <Typography
            marginBlock={3}
            fontSize={"1.2rem"}
            variant="subtitle1"
            fontWeight={600}
            >
            Booking Id: {singlesubscriptionpayment?.response?.id}
            </Typography>

            <Typography
            marginBlock={3}
            fontSize={"1rem"}
            variant="subtitle1"
            fontWeight={300}
            marginTop={"-20px"}
            color={"grey"}
            >
            {singlesubscriptionpayment?.response?.start_date && singlesubscriptionpayment?.response?.end_date
              ? formatDateRange(singlesubscriptionpayment?.response?.start_date, singlesubscriptionpayment?.response?.end_date)
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
                >
                {singlesubscriptionpayment?.response?.amount_total * 0.000095} {singlesubscriptionpayment?.response?.currency}
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
                {singlesubscriptionpayment?.response?.status}
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
                {singlesubscriptionpayment?.response?.payment_status}
                </Typography>
            </Box>

            
            </Stack>
        </Stack>

      
      <Stack marginTop={2} direction={"row"} spacing={2}>
        
            {(singlesubscriptionpayment?.invoice_downloadable !== null) && (
                <Button style={{ background: '#439AD4', color: 'white' }} onClick={handleDownloadInvoice}>
                    Invoice Downloadable
                </Button>
            )}
            
          {(singlesubscriptionpayment?.invoice_web !== null) && (
            <Button style={{background:'#439AD4', color:'white'}} onClick={handleInvoiceweb}>Invoice Web</Button>
          )}
          
      </Stack>
    </Box>
  )
}

export default UserSinglepayment
