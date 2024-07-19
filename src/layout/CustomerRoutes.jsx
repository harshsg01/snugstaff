import React from 'react'
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet } from 'react-router-dom'
import BackToTop from '../components/common/BackToTop';
import ContactUs from '../components/common/ContactUs';
import CookiePopup from '../components/common/CookiePopup';

const CustomerRoutes = () => {
  return (
    <>
     <Header />
     <Outlet />
     <Footer />
     <ContactUs />
     <BackToTop />
     <CookiePopup/>
    </>
  )
}

export default CustomerRoutes
