import React, { useState, useEffect } from 'react'
import LoadingScreen from '../../utils/LoadingScreen';
import { useParams } from 'react-router-dom';
import { fetchHostMonthlySinglepayment } from '../../data/fetchHostTotalpayment';
import { Stack, Typography, Box, Button } from '@mui/material';

const HostSinglepayment = () => {
  const [singlemonthlypayment, setSinglemonthlypayment] = useState()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { paymentId } = useParams()
  console.log(paymentId)


  const handlehostsinglemonthlypayment = async (paymentId) => {
    try {
        setLoading(true)
      const response = await fetchHostMonthlySinglepayment(paymentId);
      console.log(response);
  
      setSinglemonthlypayment(response);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };
  
  useEffect(() => {
    handlehostsinglemonthlypayment(paymentId);
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
  const invoiceUrl = singlemonthlypayment?.invoice_downloadable;
  if (invoiceUrl) {
      window.open(invoiceUrl, '_blank');
  }
};

const handleInvoiceweb = () => {
  const invoicewebUrl = singlemonthlypayment?.invoice_web;
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
            Booking Id: {singlemonthlypayment?.response?.id}
            </Typography>

            <Typography
            marginBlock={3}
            fontSize={"1rem"}
            variant="subtitle1"
            fontWeight={300}
            marginTop={"-20px"}
            color={"grey"}
            >
            {singlemonthlypayment?.response?.start_date && singlemonthlypayment?.response?.end_date
              ? formatDateRange(singlemonthlypayment?.response?.start_date, singlemonthlypayment?.response?.end_date)
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
                {singlemonthlypayment?.response?.amount_total * 0.000095} {singlemonthlypayment?.response?.currency}
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
                {singlemonthlypayment?.response?.status}
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
                {singlemonthlypayment?.response?.payment_status}
                </Typography>
            </Box>

            
            </Stack>
        </Stack>

      
      <Stack marginTop={2} direction={"row"} spacing={2}>
        
      {singlemonthlypayment?.invoice_downloadable !== null && (
                <Button style={{ background: '#439AD4', color: 'white' }} onClick={handleDownloadInvoice}>
                    Invoice Downloadable
                </Button>
            )}
            
          {singlemonthlypayment?.invoice_web !== null && (
            <Button style={{background:'#439AD4', color:'white'}} onClick={handleInvoiceweb}>Invoice Web</Button>
          )}
          
      </Stack>
    </Box>
  )
}

export default HostSinglepayment;



