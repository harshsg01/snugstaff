import React from "react";
import Header from "../components/hosts/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import ContactUs from "../components/common/ContactUs";
import BackToTop from "../components/common/BackToTop";
import CookiePopup from "../components/common/CookiePopup";

const HostRoutes = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ContactUs />
      <BackToTop />
      <CookiePopup/>
    </>
  );
};

export default HostRoutes;
