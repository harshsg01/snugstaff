import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./themes/Themes";
import withLazyLoad from "./containers/withLazyLoad";
import Page404 from "./pages/Page404";
import Page500 from "./pages/Page500";
import ErrorBoundary from "./containers/ErrorBoundary";
import { fetchToken } from "./data/fetchToken";
import EmailVerification from "./pages/EmailVerification";
const LazyAuth = withLazyLoad(() => import("./pages/Auth"));
const LazyHome = withLazyLoad(() => import("./pages/User/Home"));
const LazyHosts = withLazyLoad(() => import("./pages/Hosts/Hosts"));
const LazyProperties = withLazyLoad(() =>
  import("./pages/User/Properties/Properties")
);
const LazyProperty = withLazyLoad(() =>
  import("./pages/PropertyDescription/PropertyDescription")
);
const LazyWishlist = withLazyLoad(() => import("./pages/User/Wishlist"));
const LazyCheckout = withLazyLoad(() =>
  import("./pages/User/Checkout/Checkout")
);
const LazyPayment = withLazyLoad(() => import("./pages/User/Payment/Payment"));
const LazyContact = withLazyLoad(() => import("./pages/User/Contact"));
const LazyPrivacy = withLazyLoad(() => import("./pages/Privacy"));
const LazyTerms = withLazyLoad(() => import("./pages/Terms"));
const LazyUserTotalpayment = withLazyLoad(() => import("./pages/User/UserTotalpayment"));
const LazyUserSinglepayment = withLazyLoad(() => import("./pages/User/UserSinglepayment"));
const LazyCancellation = withLazyLoad(() =>
  import("./pages/Cancellationpolicy")
);

const LazyCancellationHost = withLazyLoad(() =>
  import("./pages/HostCancellation")
);
const LazySlider = withLazyLoad(() => import("./components/common/Slider"));
const LazyNotifications = withLazyLoad(() => import("./pages/Notifications"));
const LazyAccount = withLazyLoad(() => import("./pages/Account"));
const LazyProfile = withLazyLoad(() => import("./pages/Profile"));
const LazyBookings = withLazyLoad(() => import("./pages/User/Bookings"));
const LazyPayments = withLazyLoad(() =>
  import("./pages/User/UserReservations")
);
const LazyReservations = withLazyLoad(() =>
  import("./pages/Hosts/Reservations/Reservations")
);
const LazyReservationDetails = withLazyLoad(() =>
  import("./pages/Hosts/Reservations/ReservationDetails")
);
const LazyGlobalPreferences = withLazyLoad(() =>
  import("./pages/GlobalPreferences")
);
const LazyChat = withLazyLoad(() => import("./pages/User/Chat"));

const LazyDashboard = withLazyLoad(() => import("./pages/Hosts/Dashboard"));
const LazyCalendar = withLazyLoad(() => import("./pages/Hosts/ManageCalendar"));
const LazyListings = withLazyLoad(() =>
  import("./pages/Hosts/Listing/Listings")
);
const LazyAddListing = withLazyLoad(() =>
  import("./pages/Hosts/Listing/ListingCreation/AddListing")
);
const LazyListingDetails = withLazyLoad(() =>
  import("./pages/Hosts/Listing/ListingDetails/ListingDetails")
);
const LazyInsights = withLazyLoad(() =>
  import("./pages/Hosts/Insights/Insights")
);
const LazyInbox = withLazyLoad(() => import("./pages/Hosts/Inbox"));
const LazyPayout = withLazyLoad(() => import("./pages/Hosts/Payout"));
const LazyHostTotalpayment = withLazyLoad(() => import("./pages/Hosts/HostTotalpayment"));
const LazyHostSinglepayment = withLazyLoad(() => import("./pages/Hosts/HostSinglepayment"));
const LazyHostSinglesubscriptionpayment = withLazyLoad(() => import("./pages/Hosts/HostSinglesubscriptionpayment"));
const LazyForgotPass = withLazyLoad(() => import("./pages/ForgotPass"));
const LazyHostRoutes = withLazyLoad(() => import("./layout/HostRoutes"));
const LazyAdminRoutes = withLazyLoad(() => import("./layout/AdminRoutes"));
const LazyCommonRoutes = withLazyLoad(() => import("./layout/CommonRoutes"));
const LazyCustomerRoutes = withLazyLoad(() =>
  import("./layout/CustomerRoutes")
);
const LazyFindAccommodation = withLazyLoad(() =>
  import("./pages/User/FindAccommodation")
);

function App(stripePromise) {
  const themes = theme();

  // const handleGetNewToken = async () => {
  //   try {
  //     const response = await fetchToken();
  //     console.log(response);
  //     const { access_token } = response;
  //     const { refresh_token } = response;
  //     localStorage.setItem("access_token", access_token);
  //     localStorage.setItem("refresh_token", refresh_token);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // const access_token = localStorage.getItem("access_token");
    // const refresh_token = localStorage.getItem("refresh_token");
    // if (!access_token && refresh_token) {
    //   handleGetNewToken();
    // }

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ThemeProvider theme={themes}>
        <ErrorBoundary>
          <Routes>
            {/* User Pages */}
            <Route path="/" element={<LazyCustomerRoutes />}>
              <Route index element={<LazyHome />} />
              <Route path="hosts" element={<LazyHosts />} />
              <Route path="host" element={<LazyHosts />} />
              <Route path="properties" element={<LazyProperties />} />
              <Route path="property/:propertyId" element={<LazyProperty />} />
              <Route path="checkout/:propertyId" element={<LazyCheckout />} />

              <Route path="wishlist" element={<LazyWishlist />} />
              <Route path="notifications" element={<LazyNotifications />} />
              <Route path="account" element={<LazyAccount />} />
              <Route path="profile" element={<LazyProfile />} />
              <Route path="bookings" element={<LazyBookings />} />
              <Route path="userreservations" element={<LazyPayments />} />
              <Route
                path="global-preferences"
                element={<LazyGlobalPreferences />}
              />

              <Route path="contact" element={<LazyContact />} />
              <Route path="payments" element={<LazyUserTotalpayment />} />
              <Route path="payment/:paymentId" element={<LazyUserSinglepayment />} />
              <Route path="privacy" element={<LazyPrivacy />} />
              <Route path="terms" element={<LazyTerms />} />
              <Route path="cancellation" element={<LazyCancellation />} />
              <Route
                path="/policies/subscriptions"
                element={<LazyCancellationHost />}
              />
              <Route
                path="Staff-Accommodation"
                element={<LazyFindAccommodation />}
              />
              <Route
                path="Company-Accommodation"
                element={<LazyFindAccommodation />}
              />
              <Route path="chat" element={<LazyChat />} />
            </Route>

            {/* Common Pages */}
            <Route path="/common/*" element={<LazyCommonRoutes />}>
              <Route path="login" element={<LazyAuth />} />
              <Route path="signup" element={<LazyAuth />} />
              <Route path="slider" element={<LazySlider />} />
              <Route
                path="forgot-password/:uuid/:token"
                element={<LazyForgotPass />}
              />
              <Route
                path="payment"
                element={<LazyPayment stripePromise={stripePromise} />}
              />
            </Route>

            {/* Host Pages */}
            <Route path="/host/*" element={<LazyHostRoutes />}>
              <Route path="dashboard" element={<LazyDashboard />} />
              <Route path="calendar" element={<LazyCalendar />} />
              <Route path="listings" element={<LazyListings />} />
              <Route path="add-listing" element={<LazyAddListing />} />

              <Route
                path="listing-details/:propertyId"
                element={<LazyListingDetails />}
              />
              <Route path="reservations" element={<LazyReservations />} />
              <Route
                path="reservations-details/:bookingId"
                element={<LazyReservationDetails />}
              />
              <Route path="inbox" element={<LazyInbox />} />
              <Route path="payout" element={<LazyPayout />} />
              <Route path="payments" element={<LazyHostTotalpayment />} />
              <Route path="paymentmonthly/:paymentId" element={<LazyHostSinglepayment />} />
              <Route path="paymentsubscription/:paymentId" element={<LazyHostSinglesubscriptionpayment />} />
              <Route path="insights" element={<LazyInsights />} />
            </Route>

            {/* Admin Pages */}
            <Route path="/admin/*" element={<LazyAdminRoutes />} />

            {/* Page 404 */}
            <Route path="*" element={<Page404 />} />

            {/* Page 500 */}
            <Route path="/error" element={<Page500 />} />

            {/* Email Verification Page */}
            <Route
              path="/api/auth/verify/:uid/:token"
              element={<EmailVerification />}
            />
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}

export default App;

// Add the Share Functionality in Property Description
// Add the Save Functionality in Property Description
// Make the UI of Calendar a little better
// Add the Infinite Loader in Properties, Reviews
// Add the Transitions in Header/FAQs
// Customize the Maps
// Add the True instead of true in the Filtration
// Refactor Filtration\
// Use the pound symbol in place of the euro symbol
// Add Dynamic Loading of Home Page/Accomodation/Content Management
// Add the Accessibility of the App - Physically Challenged People
// Add Live Pop-Up Noifications
// Correct the minimum 3 days of a booking typo
// Modify Global Context Processor - Notifications Websocket(Admin)
// Make Email Templates
// Add the Responsiveness
