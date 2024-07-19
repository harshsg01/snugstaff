import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { useTheme } from "@emotion/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import MessageDialog from "../../../components/common/MessageDialog";
import { useDispatch } from "react-redux";
import { openDialog, setMessage } from "../../../store/slices/DialogSlice";

const CheckoutForm = ({ amount }) => {
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch();
  const [ redirect, setRedirect ] = useState(false);

  const GreyBox = styled(Box)({
    backgroundColor: theme.palette.secondary.light,
    padding: "4vh 2vw 1vh 2vw",
    marginBlock: "24px",
    borderRadius: "20px",
  });

  const handlePayment = async (e) => {
    e.preventDefault();

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      console.error(error);
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("Payment Succeeded");
        dispatch(
          setMessage(
            "Congrats! Your Payment is Successful, and your Booking with Snugstaff is confirmed! You'll get a confirmation email having booking details and payment information on your email shortly. Thanks for your Purchase!"
          )
        );
        dispatch(openDialog());
        setRedirect(true);
      } else {
        console.log("Payment Failed");
        dispatch(setMessage("Payment Failed"));
        dispatch(openDialog());
      }
    }
  };

  useEffect(() => {
    fetch("https://gemmaedens.co.uk/api/checkout-token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.id, clientSecret);
        setClientSecret(data.id);
      });
  }, []);

  return (
    <Box>
      <GreyBox>
        <form onSubmit={handlePayment}>
          <CardElement />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      </GreyBox>

      <MessageDialog redirect={redirect} />
    </Box>
  );
};

export default CheckoutForm;
