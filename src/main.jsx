import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); 

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
    <GoogleOAuthProvider>
      <Elements stripe={stripePromise}>
        <Router>
          <App stripePromise={stripePromise}/>
        </Router>
      </Elements>
    </GoogleOAuthProvider>
  </Provider>
  
  
);
