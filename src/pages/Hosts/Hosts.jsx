import React, { useEffect } from "react";
import Hero from "../../components/customers/Hero";
import Steps from "../../components/customers/Steps";
import Stats from "../../components/customers/Stats";
import Categories from "../../components/customers/Categories";
import Categories2 from "../../components/customers/Categories2";
import FAQs from "../../components/customers/FAQs";
import Enquiry from "../../components/customers/Enquiry";
import { useLocation } from "react-router-dom";
import { hostFAQs } from "../../data/data";
// import Pricingtable from "../../components/hosts/Pricingtable";

const Hosts = () => {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  return (
    <>
      <Hero />
      <Stats />
      <Steps />
      {/* <Pricingtable /> */}
      {/* <Categories />
      <Categories2 /> */}
      <FAQs data={hostFAQs} />
      <Enquiry />
    </>
  );
};

export default Hosts;
