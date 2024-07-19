import propImage from "../assets/prop.jpg";
import feat1 from "../assets/featured/feat-1.jpg";
import feat2 from "../assets/featured/feat-2.jpg";
import feat3 from "../assets/featured/feat-3.jpg";
import feat4 from "../assets/featured/feat-4.jpg";
import feat5 from "../assets/featured/feat-5.jpg";
import feat6 from "../assets/featured/feat-6.jpg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import FlakyIcon from "@mui/icons-material/Flaky";
import BallotIcon from "@mui/icons-material/Ballot";
import EmailIcon from "@mui/icons-material/Email";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import city1 from "../assets/popular/city-1.jpg";
import city2 from "../assets/popular/city-2.jpg";
import city3 from "../assets/popular/city-3.jpg";
import city4 from "../assets/popular/city-4.jpg";
import city5 from "../assets/popular/city-5.jpg";
import city6 from "../assets/popular/city-6.jpg";
import findStaffAccommodationImg from "../assets/new/vector-6.jpg";
import findCompanyAccommodationImg from "../assets/new/vector-2.svg";
import map1 from "../assets/maps/uk.jpg";
import map2 from "../assets/maps/london.jpg";
import map3 from "../assets/maps/birmingham.jpg";
import map4 from "../assets/maps/map4.jpg";
import map5 from "../assets/maps/map5.jpg";
import map6 from "../assets/maps/map6.jpg";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import img7 from "../assets/7.jpg";
import image1 from "../assets/featured/feat-1.jpg";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Dashboard from "../assets/maps/icons8-dashboard-60.png";
import Listing from "../assets/maps/icons8-align-right-60.png";
import Inbox from "../assets/maps/icons8-inbox-60.png";
import Insigth from "../assets/maps/icons8-insight-60.png";
import Reservation from "../assets/maps/icons8-reservation-100.png";
const iconStyle = {
  fontSize: "50px",
  color: "#439AD4",
  marginBottom: "10px",
};

export const AuthPropCardData = {
  image: propImage,
  ribbonText: "Most Popular",
  title: "Beverly Springfield",
  location: "2821 Sevilla, Palm Harbor, TX",
  isRibbon: true,
  isHomeCard: false,
  isRealCard: false,
  bed: 4,
  bath: 2,
  price: 450,
};

export const NavMenuItems = [
  {
    id: 101,
    link: "/common/login",
    text: "Log in",
  },
  {
    id: 102,
    link: "/common/signup",
    text: "Sign up",
  },
  {
    id: 106,
    link: "/hosts",
    text: "Become a Snug Host",
  },
  // {
  //   id: 103,
  //   link: "/Staff-Accommodation",
  //   text: "Staff Accommodation",
  // },
  // {
  //   id: 104,
  //   link: "/Company-Accommodation",
  //   text: "Company Accommodation",
  // },
  {
    id: 105,
    link: "/properties",
    text: "Find Properties",
  },
  {
    id: 108,
    link: "/contact",
    text: "Have an Enquiry?",
  },
];

export const NavMenuItemsLoggedin = [
  {
    id: 101,
    link: "/notifications",
    text: "Notifications",
  },
  {
    id: 102,
    link: "/wishlist",
    text: "Wishlist",
  },
  {
    id: 110,
    link: "/account",
    text: "Account",
  },
  // {
  //   id: 103,
  //   link: "/Staff-Accommodation",
  //   text: "Staff Accommodation",
  // },
  // {
  //   id: 104,
  //   link: "/Company-Accommodation",
  //   text: "Company Accommodation",
  // },
  {
    id: 105,
    link: "/properties",
    text: "Find Properties",
  },
  {
    id: 106,
    link: "/hosts",
    text: "Become a Snug Host",
  },
  {
    id: 110,
    link: "/payments",
    text: "Payments",
  },

  {
    id: 108,
    link: "/contact",
    text: "Contact Snugstaff",
  },
  // {
  //   id: 110,
  //   link: "/chat",
  //   text: "All Chat"
  // },
  {
    id: 109,
    link: "/common/login",
    text: "Log out",
  },
];

export const NavMenuItemsLoggedinHosts = [
  {
    id: 101,
    link: "/notifications",
    text: "Notifications",
  },
  {
    id: 102,
    link: "/wishlist",
    text: "Wishlist",
  },
  {
    id: 110,
    link: "/account",
    text: "Account",
  },
  // {
  //   id: 103,
  //   link: "/Staff-Accommodation",
  //   text: "Staff Accommodation",
  // },
  // {
  //   id: 104,
  //   link: "/Company-Accommodation",
  //   text: "Company Accommodation",
  // },
  {
    id: 105,
    link: "/properties",
    text: "Find Properties",
  },
  {
    id: 110,
    link: "/payments",
    text: "Payments",
  },
  {
    id: 108,
    link: "/contact",
    text: "Contact Snugstaff",
  },
  // {
  //   id: 110,
  //   link: "/chat",
  //   text: "All Chat"
  // },
  {
    id: 109,
    link: "/common/login",
    text: "Log out",
  },
];

export const NavMenuItemsHosts = [
  {
    id: 1001,
    link: "/host/reservations",
    text: "Reservations",
  },
  {
    id: 1002,
    link: "/host/payout",
    text: "Payouts",
  },
  {
    id: 1003,
    link: "/host/insights",
    text: "Reviews",
  },
  {
    id: 1004,
    link: "/account",
    text: "Account",
  },
  {
    id: 1005,
    link: "/notifications",
    text: "Notifications",
  },
  {
    id: 1006,
    link: "/host/add-listing",
    text: "Publish a Listing",
  },
  {
    id: 1009,
    link: "/host/payments",
    text: "Payments",
  },
  {
    id: 1007,
    link: "/contact",
    text: "Contact Snugstaff",
  },
  {
    id: 1008,
    link: "/common/login",
    text: "Log out",
  },
];

export const HostNavMenuItems = [
  {
    id: 101,
    link: "/host/dashboard",
    text: "Dashboard",
    icon: Dashboard,
  },
  {
    id: 102,
    link: "/host/listings",
    text: "Listings",
    icon: Listing,
  },
  {
    id: 103,
    link: "/host/reservations",
    text: "Reservations",
    icon: Reservation,
  },
  // {
  //   id: 104,
  //   link: "/host/calendar",
  //   text: "Calendar",
  //   icon: Inbox,
  // },
  // {
  //   id: 105,
  //   link: "/host/insights",
  //   text: "Insights",
  //   icon: Insigth,
  // },
];

export const homePageContent = {
  headline: "Find Snug Accommodation or Become a Snug Host",
  subHeadline:
    "Discover suitable accommodation or showcase your property for business professionals to easily find their ideal stay.",
  bookings: "50k+",
  properties: "10k+",
  buttonContent: "Get a Quote",
};

export const hostPageContent = {
  headline: "Snug Your Properties easily and earn an income",
  subHeadline:
    "Welcome to Snugstaff – your gateway to lucrative opportunities in the world of short-term accommodation.",
  hosts: "50+",
  properties: "2k+",
  buttonContent: "Become a Host",
};

export const homePageStepsContent = {
  heading: "How to Find Accommodation ?",
  subHeading:
    "We are here to help you find your perfect stay and the steps you can follow to get the best recommendations. ",
  headline:
    "A simple and effortless way to find and book the best stay for your staff.",
  subheadline: "",
  buttonText: "Get a Quote",
  buttonLink: "/contact",
  steps: [
    {
      icon: <LocationOnIcon style={iconStyle} />,
      text: "Search by location",
    },
    {
      icon: <CalendarMonthIcon style={iconStyle} />,
      text: "Filter by Dates",
    },
    {
      icon: <FindInPageIcon style={iconStyle} />,
      text: "Find Properties",
    },
    {
      icon: <EmailIcon style={iconStyle} />,
      text: "Send Enquiry",
    },
  ],
};

export const hostPageStepsContent = {
  heading: "How to Become a Host ?",
  subHeading:
    "We are here to help you list your properties and the steps you can take to get the best returns out of it. ",
  headline: "List Your Properties and Select most suitable requests.",
  subheadline:
    "Also, Manage your properties and analyze it via various reports and analytics.",
  buttonText: "Register Now",
  buttonLink: "/hosts",
  steps: [
    {
      icon: <AppRegistrationIcon style={iconStyle} />,
      text: "Register as Host",
    },
    {
      icon: <BallotIcon style={iconStyle} />,
      text: "List Your Properties",
    },
    {
      icon: <FlakyIcon style={iconStyle} />,
      text: "Select Best Request",
    },
    {
      icon: <CurrencyPoundIcon style={iconStyle} />,
      text: "Earn a Passive Income",
    },
  ],
};

export const categoryPageContent = {
  headline: "Making it easier for all.",
  subHeadline:
    "It doesn’t matter if you are an individual worker, a Company or a Student on placement at a hospital, we are here to help you with your stay. Browse our available properties in the location you desire or contact us to help with your requirements.",
};

export const hostcategoryPageContent = {
  headline: "We make it easy for you to list and feature your properties.",
  subHeadline:
    "It doesn't matter whether you are an host or any business person, we are here to help you with your hosting. Also, If you want to feature your properties, we are with you.",
};

export const categoryPageContent2 = {
  headline: "Long-term bookings",
  subHeadline:
    "If you are a company looking for a long-term stay of 4 months+, many of our hosts offer a discount on these types of bookings. If this doesn’t show in their listing, please fill in the enquiry form below and we will find you suitable accommodation and ensure your requirements are met.",
};

export const hostcategoryPageContent2 = {
  headline: "Get Simplified and Enhanced Options for Your Properties.",
  subHeadline:
    "Whether you're a business owner, or a normal host, we're here to streamline your listing needs. If you're looking to list your properties, we've got you covered.",
};

export const homePageStats = {
  headline: "Why Do Customers Choose to Book with us?",
  awards: [
    {
      icon: <MapsHomeWorkIcon sx={{ fontSize: "3rem", color: "#f2f2f2" }} />,
      num: "1",
      name: "Wide Selection of Properties",
      description1:
        "Unlike other platforms, Snugstaff keeps costs low for our hosts which in turn encourages them to list with us.",
      description2:
        "Our booking platform can offer a range of accommodation from studios to 5 bedroom properties.",
      description3:
        "Ensuring customers can find the perfect stay tailored to their preferences, budget and travel needs.",
    },
    {
      icon: <AssignmentIndIcon sx={{ fontSize: "3rem", color: "#f2f2f2" }} />,
      num: "2",
      name: "User-friendly Interface",
      description1:
        "Our platform provides and intuitive and user-friendly interface making it easy for customers to search, compare and book accommodation effortlessly.",
      description2:
        "With advanced search filters and detailed property descriptions, customers can quickly find the ideal place to stay.",
    },
    {
      icon: <FactCheckIcon sx={{ fontSize: "3rem", color: "#f2f2f2" }} />,
      num: "3",
      name: "Transparent Pricing and Policies",
      description1:
        "We prioritise transparency in pricing and policies, ensuring our customers have a clear understanding of costs.",
      description2:
        "Extra charges and cancellation policies as set by our hosts and before our customers request to book.",
      description3:
        "This transparency builds trust and confidence enhancing the overall booking experience.",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: "3rem", color: "#f2f2f2" }} />,
      num: "4",
      name: "Exceptional Customer Support",
      description1:
        "Our dedicated customer support team is available to assist customers at every step of their booking journey",
      description2:
        "Whether they have questions about a property, need assistance with their reservation, or require support during their stay",
      description3:
        "Our team is committed to providing prompt and helpful assistance for customers.",
    },
  ],
};

export const hostPageStats = {
  headline: "Benefits of Becoming a Host on Snugstaff",
  subheading:
    "Whether you’re a seasoned host or just dipping your toes into hosting waters, Snugstaff offers an array of benefits to elevate your hosting experience",
  awards: [
    {
      icon: <MapsHomeWorkIcon sx={{ fontSize: "3rem", color: "#f2f2f2" }} />,
      num: "1",
      name: "Flexible Pricing Models",
      description1: `At Snugstaff, we offer tailored pricing to meet your needs. Opt for the Commission Plan for free advertising, paying only a 10% commission per booking. Take control, maximize earnings, and provide top-notch hospitality.`,
      description2: `Choose the £10/month Subscription Plan for premium features, increased visibility, and direct communication with guests, fostering personalized experiences.`,
      description3: `Opt for the Commission Plan for free advertising, paying only a 10% commission per booking.`,
      description4: `Take control, maximize earnings, and provide top-notch hospitality.`,
    },
    {
      icon: <AssignmentIndIcon sx={{ fontSize: "3rem", color: "#f2f2f2" }} />,
      num: "2",
      name: "Targeted Market",
      description1: `Snugstaff specializes in accommodating contractors and workers for short or long-term stays.`,
      description2: `List your property to reach a targeted audience seeking convenient stays during work assignments.`,
      description3: `Our focus on this niche ensures exposure to a relevant audience, boosting the chances of mid to long-term bookings with repeat custom and maximizing your income.Enjoy fewer turnovers and less hassle, attracting the 'right' guests for your property.`,
    },
    {
      icon: <FactCheckIcon sx={{ fontSize: "3rem", color: "#f2f2f2" }} />,
      num: "3",
      name: "Streamlined Booking Process",
      description1: `Snugstaff makes hosting a breeze. Our user-friendly platform streamlines the booking process for hosts and guests, ensuring a seamless experience.`,
      description2: `Manage listings, update availability, and communicate effortlessly with guests through our intuitive dashboard.`,
      description3: `For increased appeal to long-term bookings, we recommend keeping your calendar open when guests 'Request to book,' providing flexibility to accept extended stays.`,
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: "3rem", color: "#f2f2f2" }} />,
      num: "4",
      name: "Dedicated Support",
      description1: `Snugstaff is your hosting partner, committed to your success.`,
      description2: `Our dedicated support team is ready to assist you with listings, bookings, and technical support.`,
      description3: `You're never alone on your hosting journey – personalized guidance is just a message away. Join our thriving host community, unlock your property's potential, and achieve your hosting goals. Sign up today with Snugstaff for endless hosting possibilities.`,
    },
  ],
};

export const footerItems = [
  {
    heading: "SnugStaff",
    subItems: [
      {
        link: "/",
        text: "About Us",
      },
      {
        link: "/contact",
        text: "Contact Us",
      },
    ],
  },
  {
    heading: "Hosting",
    subItems: [
      {
        link: "/hosts",
        text: "Become a Host",
      },
      {
        link: "/policies/subscriptions",
        text: "Subscription & Commission Policy",
      },
    ],
  },

  {
    heading: "Policies",
    subItems: [
      {
        link: "/privacy",
        text: "Privacy",
      },
      {
        link: "/terms",
        text: "Terms & Conditions",
      },
      // {
      //   link:"/terms",
      //   text:"Terms & Conditions"
      // }
    ],
  },
];

export const list = [
  {
    id: 1,
    cover: propImage,
    name: "Red Carpet Real Estate",
    location: "210 Zirak Road, Canada",
    category: "For Rent",
    price: "$3,700",
    type: "Apartment",
  },
  {
    id: 2,
    cover: propImage,
    name: "Fairmount Properties",
    location: "5698 Zirak Road, NewYork",
    category: "For Sale",
    price: "$9,750",
    type: "Condos",
  },
  {
    id: 3,
    cover: propImage,
    name: "The Real Estate Corner",
    location: "5624 Mooker Market, USA",
    category: "For Rent",
    price: "$5,860",
    type: "Offices",
  },
  {
    id: 4,
    cover: propImage,
    name: "Herringbone Realty",
    location: "5621 Liverpool, London",
    category: "For Sale",
    price: "$7,540",
    type: "Homes & Villas",
  },
  {
    id: 5,
    cover: propImage,
    name: "Brick Lane Realty",
    location: "210 Montreal Road, Canada",
    category: "For Rent",
    price: "$4,850",
    type: "Commercial",
  },
  {
    id: 6,
    cover: propImage,
    name: "Banyon Tree Realty",
    location: "210 Zirak Road, Canada",
    category: "For Sale",
    price: "$2,742",
    type: "Apartment",
  },
];

export const featuredData = {
  showHeading: true,
  heading: "Popular Properties",
  subHeading: `Discover a diverse selection of the most popular properties across different
  neighborhoods and regions, tailored to your unique preferences.`,
  properties: [
    {
      image: feat1,
      ribbonText: "Popular",
      title: "Willow Park Estates",
      location: "1743 Willow Street, Denver, CO",
      isRibbon: true,
      isHomeCard: false,
      isRealCard: true,
      bed: 3,
      bath: 2,
      price: 250,
    },
    {
      image: feat2,
      ribbonText: "Popular",
      title: "Lakeside Retreat",
      location: "6235 Redwood Drive, San Francisco",
      isRibbon: true,
      isHomeCard: false,
      isRealCard: true,
      bed: 6,
      bath: 2,
      price: 320,
    },
    {
      image: feat3,
      ribbonText: "Popular",
      title: "Green Valley Villas",
      location: "890 Pinecrest, Atlanta, GA",
      isRibbon: true,
      isHomeCard: false,
      isRealCard: true,
      bed: 2,
      bath: 2,
      price: 160,
    },
    {
      image: feat4,
      ribbonText: "Popular",
      title: "Oceanview Haven",
      location: "315 Oak Lane, Seattle, WA",
      isRibbon: true,
      isRealCard: true,
      bed: 5,
      bath: 2,
      price: 490,
    },
    {
      image: feat5,
      ribbonText: "Popular",
      title: "Mountain Ridge Estates",
      location: "4518 Magnolia Avenue, LA",
      isRibbon: true,
      isRealCard: true,
      bed: 7,
      bath: 3,
      price: 210,
    },
    {
      image: feat6,
      ribbonText: "Popular",
      title: "Sunset Ridge",
      location: "1075 Elm Street, Chicago, IL",
      isRibbon: true,
      isRealCard: true,
      bed: 3,
      bath: 4,
      price: 330,
    },
  ],
};

export const listingsData = {
  showHeading: false,
  properties: [
    {
      image: feat1,
      ribbonText: "Popular",
      title: "Willow Park Estates",
      location: "1743 Willow Street, Denver, CO",
      isRibbon: false,
      isHomeCard: false,
      isRealCard: true,
      bed: 3,
      bath: 2,
      price: 250,
    },
    {
      image: feat2,
      ribbonText: "Popular",
      title: "Lakeside Retreat",
      location: "6235 Redwood Drive, San Francisco",
      isRibbon: false,
      isHomeCard: false,
      isRealCard: true,
      bed: 6,
      bath: 2,
      price: 320,
    },
    {
      image: feat3,
      ribbonText: "Popular",
      title: "Green Valley Villas",
      location: "890 Pinecrest, Atlanta, GA",
      isRibbon: false,
      isHomeCard: false,
      isRealCard: true,
      bed: 2,
      bath: 2,
      price: 160,
    },
    {
      image: feat4,
      ribbonText: "Popular",
      title: "Oceanview Haven",
      location: "315 Oak Lane, Seattle, WA",
      isRibbon: false,
      isRealCard: true,
      bed: 5,
      bath: 2,
      price: 490,
    },
    {
      image: feat5,
      ribbonText: "Popular",
      title: "Mountain Ridge Estates",
      location: "4518 Magnolia Avenue, LA",
      isRibbon: false,
      isRealCard: true,
      bed: 7,
      bath: 3,
      price: 210,
    },
    {
      image: feat6,
      ribbonText: "Popular",
      title: "Sunset Ridge",
      location: "1075 Elm Street, Chicago, IL",
      isRibbon: false,
      isRealCard: true,
      bed: 3,
      bath: 4,
      price: 330,
    },
  ],
};

export const findStaffAccommodation = {
  heading: `Staff Accommodation`,
  title: `Find Accommodation as an Individual Staff`,
  body: "Explore seamless solutions for your accommodation needs as a Staff. Snugstaff specializes in providing high-quality serviced housing for individuals, ensuring a stress-free experience. With our all-inclusive pricing, you can rest easy, knowing there are no hidden costs. Whether it's a week-long project or a two-year assignment, we've got you covered. Find the perfect worker accommodation in the UK, customized to fit your budget and business requirements. It's that simple.",
  img: findStaffAccommodationImg,
};

export const findCompanyAccommodation = {
  heading: `Company Accommodation`,
  title: `Find Accommodation as an Company House`,
  body: "Discover effortless solutions for your team's accommodation needs. Snugstaff specializes in delivering top-tier serviced housing for large teams, guaranteeing a hassle-free experience. With our all-inclusive pricing, you can unwind, knowing there are no hidden costs. Whether it's a week-long project or a two-year assignment, we've got you covered. Find the ideal worker accommodation in the UK, tailored to meet your budget and business demands. It's that straightforward.",
  img: findCompanyAccommodationImg,
};

export const location = [
  {
    id: 1,
    name: "New Orleans, Louisiana",
    Villas: "12 Villas ",
    Apartments: "10 Apartments",
    Offices: "07 Offices",
    cover: city1,
  },
  {
    id: 2,
    name: "Jersey, United States",
    Villas: "12 Villas ",
    Apartments: "10 Apartments",
    Offices: "07 Offices",
    cover: city2,
  },
  {
    id: 3,
    name: "Liverpool, London",
    Villas: "12 Villas ",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: city3,
  },
  {
    id: 4,
    name: "NewYork, United States",
    Villas: "12 Villas ",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: city4,
  },
  {
    id: 5,
    name: "Montreal, Canada",
    Villas: "12 Villas ",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: city5,
  },
  {
    id: 6,
    name: "California, USA",
    Villas: "12 Villas ",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: city6,
  },
];

export const notificationsData = [
  "1. This is a sample Notification Page used to display the styling and the layout of the notifications page and how it would look like!",
  "2. This is a sample Notification Page used to display the styling and the layout of the notifications page and how it would look like!",
  "3. This is a sample Notification Page used to display the styling and the layout of the notifications page and how it would look like!",
];

export const hostFAQs = {
  headline: "Host FAQs",
  subHeadline:
    "Some of the most frequently asked questions about hosting and listing properties.",
  faqs: [
    {
      question: "What happens if I have an issue with my listing?",
      answer:
        "We strive to provide you with the best possible experience. If you have any issues with your listing, please contact us and we will do our best to resolve them. We are here to help.",
    },
    {
      question: "How do I get started with hosting?",
      answer:
        "You can get started with hosting by simply listing your properties. We are here to help.",
    },
    {
      question: "How much does it cost to host?",
      answer:
        "We don't charge any fees for hosting. We take a fees in every transaction for the hosts to pay. Also, We are here to help.",
    },
    {
      question:
        "What should I do to make the properties to be featured in the home page?",
      answer:
        "You have to fill out a form to make your properties list in the featured sections and we have packages for that section.",
    },
    {
      question: "What is the best way to get started?",
      answer:
        "The best way to get started with hosting is to list your properties by filling out a form that doesn't require much work and you are good to go. ",
    },
  ],
};

export const AccommodationFAQs = {
  headline: "Accommodation FAQs",
  subHeadline:
    "Some of the most frequently asked questions about Accommodation and booking properties.",
  faqs: [
    {
      question: "How do I request accommodation?",
      answer:
        "To request accommodation, simply browse available listings, select your preferred property, and click 'Request Accommodation.' Follow the prompts to complete your request.",
    },
    {
      question: "Is there a fee for submitting an accommodation request?",
      answer:
        "No, submitting an accommodation request is free. You only pay if your request is accepted, and the host confirms your reservation.",
    },
    {
      question: "Can I modify or cancel my accommodation request?",
      answer:
        "Yes, you can modify or cancel your request before it is accepted by the host. Once accepted, any changes or cancellations may be subject to the host's policy.",
    },
    {
      question: "How long does it take for hosts to respond to requests?",
      answer:
        "Hosts typically respond within 24-48 hours. If your request is time-sensitive, consider reaching out to multiple hosts to improve your chances of securing accommodation.",
    },
    {
      question:
        "What information should I include in my accommodation request?",
      answer:
        "Provide a clear and concise description of your accommodation needs, including dates, the number of guests, and any specific requirements. This helps hosts better understand and respond to your request.",
    },
  ],
};

export const contactDetails = {
  address:
    "Unit 19 Stirlin Business Park, 185 Sadler Road, Lincoln, Lincolnshire, England, LN6 3AF ",
  phone1: "+44 3300886787",
  email1: "info@snugstaff.com",
};

export const privacyData = {
  lastUpdated: "October 2023",
  policies: [
    {
      heading: "The type of personal information we collect",
      detail: `Hi, welcome to our privacy policy which applies to our customers. This
      policy sets out how if you are a Snugstaff.com user or visitor to our
      site, we treat your personal information. Last updated on March 01,
      2020.`,
    },
    {
      heading: "Cookies and web analytics",
      detail: `We use cookies to recognize and monitor users, their on-site
      behavior, and their preferences for accessing their website. These
      cookies include the IP and time of visits by visitors. Visitors to
      Snugstaff that do not want cookies put on their browsers should
      configure their browsers to reject cookies before using the Snugstaff
      website.`,
    },
    {
      heading: "When do we need to update this policy?",
      detail: `We will need to update this policy from time to time to ensure that
      it remains up-to-date with the latest legal requirements and any
      improvements to our privacy management practices. When we change the
      policy, we will make sure that we inform you, if any, of such changes.
      A copy of this policy’s latest version will always be available at
      this page.`,
    },
    {
      heading: "Registration",
      detail: `To use our Service you will need to create an account and complete
      the registration process at (Registration).
      At Registration, you will select logon credentials for each user of
      the Service, which may be an employee of the Subscriber or other
      individuals authorised by the Subscriber to use the Service
      (Authorised User). Logon details should only be used by the Authorised
      User to whom they are assigned and cannot be shared with any third
      parties (including another Authorised User). You are solely
      responsible for the confidentiality and use of all logon details for
      your account and those assigned to Authorised Users, as well as for
      any use or misuse of the Service using Subscribers or any Authorised
      Users’ logon details. You shall notify us immediately if you become
      aware of any loss, theft or unauthorised use of any logon details, and
      we reserve the right to delete or change them at any time and for any
      reason. You warrant and represent to us that the details you provide
      to us during Registration are accurate, complete and up-to-date. We
      will hold and treat such information in accordance with the terms of
      our Privacy Policy. If you or your Participants use a mobile
      telephone to access our Service, we may need to send SMS messages.
      You may opt out of this service by replying STOP to the SMS message
      or by contacting us at support@Snugstaff.com.`,
    },
    {
      heading: "Marketing Choices regarding your personal data",
      detail: `Where we have your permission to do so (e.g. if you subscribed to one
        of our email lists or indicated that you are interested in receiving
        deals or information from us), we will send you email marketing
        messages about products and services which we feel may be of interest
        to you. You can ‘opt-out’ of such communications if you would prefer
        not to receive them in the future by using the “unsubscribe” facility
        provided in the communication itself.`,
    },
  ],
};

export const termsData = {
  lastUpdated: "November 2023",
  description: `Your content remains yours, which means that you retain any intellectual
  property rights that you have in your content. For example, you have
  intellectual property rights in the creative content you make, such as
  reviews you write. Or you may have the right to share someone else’s
  creative content if they’ve given you their permission. We need your
  permission if your intellectual property rights restrict our use of your
  content. You provide Google with that permission through this license.`,
  terms: [
    {
      heading: "What’s covered",
      detail: `This license covers your content if that content is protected by
      intellectual property rights.`,
    },
    {
      heading: "What’s not covered",
      detail: `We use cookies to recognize and monitor users, their on-site behavior,
      and their preferences for accessing their website. These cookies include
      the IP and time of visits by visitors. Visitors to Snugstaff that do not
      want cookies put on their browsers should configure their browsers to
      reject cookies before using the Snugstaff website.`,
    },
    {
      heading: "Price Updates",
      detail: `We will need to update this policy from time to time to ensure that it
      remains up-to-date with the latest legal requirements and any
      improvements to our privacy management practices. When we change the
      policy, we will make sure that we inform you, if any, of such changes. A
      copy of this policy’s latest version will always be available at this
      page.`,
    },
    {
      heading: "Refund Policy",
      detail: `But why fast loading is important? According to Neil Patel, 47% of
      people on the internet expect a web page to load in less than 2 seconds.
      Static websites are way faster than dynamic ones. As they don’t have a
      back-end system, there is no time loss due to database connection.
      Instead, the lightweight, pre-rendered HTML files load incredibly fast.
      You may not disclose any information about your order including, but not
      limited to, Order ID, download connection, etc.`,
    },
    {
      heading: "Marketing Choices regarding your personal data",
      detail: `Where we have your permission to do so (e.g. if you subscribed to one
        of our email lists or indicated that you are interested in receiving
        deals or information from us), we will send you email marketing
        messages about products and services which we feel may be of interest
        to you. You can ‘opt-out’ of such communications if you would prefer
        not to receive them in the future by using the “unsubscribe” facility
        provided in the communication itself.`,
    },
  ],
};

export const wishlistItems = [
  { id: 1, name: "Property 1", image: feat1 },
  { id: 2, name: "Property 2", image: feat1 },
  { id: 3, name: "Property 3", image: feat1 },
  { id: 4, name: "Property 4", image: feat1 },
  { id: 5, name: "Property 5", image: feat1 },
  { id: 6, name: "Property 6", image: feat1 },
  { id: 7, name: "Property 7", image: feat1 },
  { id: 8, name: "Property 8", image: feat1 },
];

export const maps = [
  {
    image: map1,
    text: "Anywhere",
  },
  {
    image: map2,
    text: "London",
  },
  {
    image: map3,
    text: "Liverpool",
  },
  {
    image: map4,
    text: "Birmingham",
  },
  {
    image: map5,
    text: "Edinburgh",
  },
  {
    image: map6,
    text: "Manchester",
  },
];

export const guestDetailsData = [
  {
    index: 343,
    heading: "Guests",
    subHeading: "No. of Guests (including you)",
    value: "guests",
  },
  {
    index: 344,
    heading: "Bedrooms",
    subHeading: "Choose if you need parking",
    value: "bedrooms",
  },
  {
    index: 345,
    heading: "Beds",
    subHeading: "No. of Required Beds",
    value: "beds",
  },
  {
    index: 346,
    heading: "Bathrooms",
    subHeading: "No. of Required Bathrooms",
    value: "bathrooms",
  },
];

export const hostGuestDetailsData = [
  {
    index: 3431,
    heading: "Guests",
    subHeading: "Maximum number of guests who can stay",
    value: "guests",
  },
  {
    index: 3441,
    heading: "Bedrooms",
    subHeading: "Total number of bedrooms available",
    value: "bedrooms",
  },
  {
    index: 3451,
    heading: "Beds",
    subHeading: "Total number of beds available",
    value: "beds",
  },
  {
    index: 3461,
    heading: "Bathrooms",
    subHeading: "Total number of bathrooms available",
    value: "bathrooms",
  },
];

export const locationFilterData = [
  {
    index: 10,
    name: "House",
    iconClass: "fi fi-tr-house-chimney-user",
  },
  {
    index: 11,
    name: "Hotel",
    iconClass: "fi fi-tr-hotel",
  },
  {
    index: 12,
    name: "Apartments",
    iconClass: "fi fi-tr-apartment",
  },
  {
    index: 13,
    name: "Studios",
    iconClass: "fi fi-tr-bed-alt",
  },
  {
    index: 14,
    name: "Guest Houses",
    iconClass: "fi fi-tr-cabin",
  },
];

export const amenitiesList = [
  "Wifi",
  "Kitchen",
  " Hot tub",
  "Free Parking",
  "Washing Machine",
  "Dryer",
  "Heating",
  "Iron",
  "TV",
  "Workspace",
  "Pool",
  "Test",
  "Gym",
  "EV Charger",
  "Cot",
  "Smoking allowed",
  "King bed",
  "Smoke Alarm",
  "Carbon monooxide alarm",
];

export const charges = [
  {
    name: "14-17th Dec Stay",
    amount: 249.99,
  },
  {
    name: "Service Fees",
    amount: 134.99,
  },
];

export const propertyDetails = {
  location: "Indore, India",
  bedrooms: 4,
  beds: 8,
  bathrooms: 2,
  reviewsNo: 2,
  about: `A new and unique experience of a European-style wooden cottage surrounded by greenery in all directions. Present with modern furnishing, and access to many basic amenities such as hot water, AC, queen size beds+sofa-bed, cupboards, kettles, and more.The natural ambience present is tough to come by in the city.`,
  host: {
    name: "John",
    image: image1,
    time: 7,
  },
  propertyImages: [
    feat1,
    feat2,
    feat3,
    feat4,
    feat5,
    img2,
    feat3,
    propImage,
    feat4,
    feat5,
    city3,
    city6,
    img3,
    propImage,
    feat5,
    feat6,
    img2,
    img4,
    img5,
    img2,
    img1,
    city1,
    feat1,
    propImage,
    feat5,
    img7,
    feat3,
    feat6,
    city3,
    city2,
    img2,
    img4,
    img6,
    city3,
    city2,
    city4,
    img3,
    feat6,
  ],
  amenetiesData: [
    {
      id: 2001,
      icon: "fi fi-tr-wifi",
      text: "Wifi",
    },
    {
      id: 2002,
      icon: "fi fi-tr-swimmer",
      text: "Pool",
    },
    {
      id: 2003,
      icon: "fi fi-tr-air-conditioner",
      text: "Air conditioning",
    },
    {
      id: 2004,
      icon: "fi fi-tr-camera-cctv",
      text: "Security cameras on property",
    },
    {
      id: 2005,
      icon: "fi fi-tr-fire-burner",
      text: "Carbon monoxide alarm",
    },
    {
      id: 2006,
      icon: "fi fi-tr-gas-pump-slash",
      text: "Smoke alarm",
    },
    {
      id: 2007,
      icon: "fi fi-tr-smoking",
      text: "Smoking allowed",
    },
    {
      id: 2008,
      icon: "fi fi-tr-nfc-lock",
      text: "Lock on bedroom door",
    },
    {
      id: 2009,
      icon: "fi fi-tr-paw",
      text: "Pets allowed",
    },
    {
      id: 2010,
      icon: "fi fi-tr-parking-circle",
      text: "Free parking on premises",
    },
  ],
  featuresData: [
    {
      id: 1001,
      title: "Room in a farm stay",
      description: "Your own room in a home, plus access to shared spaces.",
      icon: "fi fi-tr-bed-alt",
    },
    {
      id: 1002,
      title: "Shared common spaces",
      description: "You’ll share parts of the home.",
      icon: "fi fi-tr-house-chimney",
    },
    {
      id: 1003,
      title: "Shared bathroom",
      description: "You’ll share the bathroom with others.",
      icon: "fi fi-tr-shower",
    },
    {
      id: 1004,
      title: "Dive right in",
      description: "This is one of the few places in the area with a pool.",
      icon: "fi fi-tr-swimmer",
    },
  ],
  reviews: [
    {
      review: `Place is better than the pictures shown here. Great place to party
      for group of 12. He have said that whatever you will write here, the Admin and the hosts will like it. Fizz was helpful, as were the helpers on the
      property. Will try to visit again.`,
    },
    {
      review: `Place is better than the pictures shown here. Great place to party
      for group of 12. Fizz was helpful, as were the helpers on the
      property. Will try to visit again.`,
    },
  ],
};

export const listingsApiSample = [
  {
    id: "7653e675-86cb-458c-a0c0-af6113c16c31",
    placeholder_name: "PROPER LISTING - CONTINENTAL",
    bathrooms: "5",
    rooms: "3",
    beds: "5",
    guests: 5,
    isLuxury: true,
    property_type: {
      id: "0a3efb13-bf61-40f5-9e0e-7153cec1d870",
      updated_at: "2023-12-01T11:40:05.607122Z",
      type_name: "Entire Home",
    },
    pricing: "1499.9700",
    currency: {
      id: "f203bdea-1fd0-4d4f-99a6-d37f29bd21ab",
      updated_at: "2023-11-26T01:30:03.298970Z",
      currency_name: "USD",
      currency_sign: "$",
    },
    featured_image: {
      id: "8ea6e42b-a5d7-47f0-8874-bf46f234225d",
      raw_image: feat1,
      processed_image: feat1,
      hash: "pZLE1ftR9ER.M_D%-p~qV@M{t8aKt7xvs:NGRkofflogjZbIt7-;RjWAaeIUxaWBfls:V[t6s:t7R*WBofaeWCj]",
    },
    average_rating: "0.00",
    property_images: [
      {
        id: "df1dae87-5829-4126-b25f-2ab037ece963",
        raw_image: feat1,
        hash: "pDN1AVE1xuITtRWUM{_N?a%2o}MxNGxas;o#xvnOM{jFWDIVRPo}oeRiWrV@IUxujFozozITS2xuV[tRxuNFkWRi",
        processed_image:
          "https://fushiguro.eu.org//media/listings/processed_c669ec9b-f901-4065-88ff-fb209a40cb7f.webp",
      },
      {
        id: "1672aa1f-4e83-4da1-aedc-b94aa50d9e38",
        raw_image: feat2,
        hash: "pDN1AVE1xuITtRWUM{_N?a%2o}MxNGxas;o#xvnOM{jFWDIVRPo}oeRiWrV@IUxujFozozITS2xuV[tRxuNFkWRi",
        processed_image:
          "https://fushiguro.eu.org//media/listings/processed_d8d629d7-9307-4b24-a8ae-b01d95e36124.webp",
      },
    ],
  },
  {
    id: "b6abc255-d08d-4dcc-95a6-46179b5ef6bc",
    placeholder_name: "SOME AIRBNB LISTING",
    bathrooms: "4",
    rooms: "5",
    beds: "2",
    guests: 3,
    isLuxury: false,
    property_type: {
      id: "0a3efb13-bf61-40f5-9e0e-7153cec1d870",
      updated_at: "2023-12-01T11:40:05.607122Z",
      type_name: "Entire Home",
    },
    pricing: "499.0000",
    currency: {
      id: "9fd3a147-4f8f-40ab-a2b3-bbe768a19afc",
      updated_at: "2023-11-15T00:00:00Z",
      currency_name: "GPB",
      currency_sign: "£",
    },
    average_rating: "3.50",
    featured_image: {
      id: "8ea6e42b-a5d7-47f0-8874-bf46f234225d",
      raw_image: feat1,
      processed_image: feat1,
      hash: "pZLE1ftR9ER.M_D%-p~qV@M{t8aKt7xvs:NGRkofflogjZbIt7-;RjWAaeIUxaWBfls:V[t6s:t7R*WBofaeWCj]",
    },
    property_images: [
      {
        id: "df1dae87-5829-4126-b25f-2ab037ece963",
        processed_image: feat3,
        hash: "pZLE1ftR9ER.M_D%-p~qV@M{t8aKt7xvs:NGRkofflogjZbIt7-;RjWAaeIUxaWBfls:V[t6s:t7R*WBofaeWCj]",
        raw_image:
          "https://fushiguro.eu.org//media/listings/processed_c669ec9b-f901-4065-88ff-fb209a40cb7f.webp",
      },
      {
        id: "8ea6e42b-a5d7-47f0-8874-bf46f234225d",
        raw_image: feat4,
        hash: "pZLE1ftR9ER.M_D%-p~qV@M{t8aKt7xvs:NGRkofflogjZbIt7-;RjWAaeIUxaWBfls:V[t6s:t7R*WBofaeWCj]",
        processed_image:
          "https://fushiguro.eu.org//media/listings/processed_1a284fe1-9332-412d-9635-4fefb3ca124d.webp",
      },
    ],
  },
  {
    id: "af12fa8a-1979-4b7c-a31d-4661d19b62db",
    placeholder_name: "DUH",
    bathrooms: "4",
    rooms: "5",
    beds: "2",
    guests: 3,
    isLuxury: false,
    property_type: {
      id: "0a3efb13-bf61-40f5-9e0e-7153cec1d870",
      updated_at: "2023-12-01T11:40:05.607122Z",
      type_name: "Entire Home",
    },
    pricing: "499.0000",
    currency: {
      id: "9fd3a147-4f8f-40ab-a2b3-bbe768a19afc",
      updated_at: "2023-11-15T00:00:00Z",
      currency_name: "GPB",
      currency_sign: "£",
    },
    average_rating: "4.80",
    featured_image: {
      id: "8ea6e42b-a5d7-47f0-8874-bf46f234225d",
      processed_image: feat1,
      raw_image: feat1,
      hash: "pZLE1ftR9ER.M_D%-p~qV@M{t8aKt7xvs:NGRkofflogjZbIt7-;RjWAaeIUxaWBfls:V[t6s:t7R*WBofaeWCj]",
    },
    property_images: [
      {
        id: "1672aa1f-4e83-4da1-aedc-b94aa50d9e38",
        raw_image: feat5,
        hash: "pZLE1ftR9ER.M_D%-p~qV@M{t8aKt7xvs:NGRkofflogjZbIt7-;RjWAaeIUxaWBfls:V[t6s:t7R*WBofaeWCj]",
        processed_image:
          "https://fushiguro.eu.org//media/listings/processed_d8d629d7-9307-4b24-a8ae-b01d95e36124.webp",
      },
    ],
  },
];

export const propertyDetailsApiSample = {
  id: "b6abc255-d08d-4dcc-95a6-46179b5ef6bc",
  ammeneties_offered: [
    {
      id: "12ef8c9d-baba-4ab5-8ac1-f5d93b130302",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-wifi",
      ammenetie_name: "Wifi",
    },
    {
      id: "99438a9254-916e-4994-9423-5be0d4ae07f2",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-swimmer",
      ammenetie_name: "Pool",
    },
    {
      id: "998a329254-916e-4994-9423-5be0d4ae07f2",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-air-conditioner",
      ammenetie_name: "Air conditioning",
    },
    {
      id: "998a79254-916e-4994-9423-5be0d4ae07f2",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-camera-cctv",
      ammenetie_name: "Security cameras on property",
    },
    {
      id: "998a19254-916e-4994-9423-5be0d4ae07f2",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-fire-burner",
      ammenetie_name: "Carbon monoxide alarm",
    },
    {
      id: "99880-9a9254-916e-4994-9423-5be0d4ae07f2",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-gas-pump-slash",
      ammenetie_name: "Smoke alarm",
    },
    {
      id: "998a92324254-916e-4994-9423-5be0d4ae07f2",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-smoking",
      ammenetie_name: "Smoking allowed",
    },
    {
      id: "998a956254-916e-4994-9423-5be0d4ae07f2",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-nfc-lock",
      ammenetie_name: "Lock on bedroom door",
    },
    {
      id: "998a925904-916e-4994-9423-5be0d4ae07f2",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-paw",
      ammenetie_name: "Pets allowed",
    },
    {
      id: "998a3229254-916e-4994-9423-5be0d4ae07f2",
      updated_at: "2023-11-17T00:00:00Z",
      icon: "fi fi-tr-parking-circle",
      ammenetie_name: "Free parking on premises",
    },
  ],
  creator: {
    id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
    first_name: "Rahul",
    image: feat1,
    date_joined: [
      {
        day: 15,
      },
      {
        month: 11,
      },
      {
        year: 2023,
      },
    ],
    last_name: "Malhotra",
    profile: null,
    username: "unravler",
    email: "admin@unravler.eu.org",
    user_type: "Admin",
    is_team_head: true,
    is_active: true,
  },
  room_type: {
    id: "486a8145-6eaf-4df0-8db9-62989375be67",
    type_name: "Suit",
  },
  property_images: [
    {
      id: "8ea6efh42b-a5d7-47f0-8874-bf46f234225d",
      raw_image: feat2,
      hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
      processed_image: feat2,
    },
    {
      id: "8ea6ey42b-a5647d7-47f0-8874-bf46f234225d",
      hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
      raw_image: feat3,
      processed_image: feat3,
    },
    {
      id: "8ea6e42b-a5d565247-47f0-8874-bf46f234225d",
      hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
      raw_image: feat4,
      processed_image: feat4,
    },
    {
      id: "8ea624j7je42b-a5d7-47f0-8874-bf46f234225d",
      hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
      raw_image: feat5,
      processed_image: feat5,
    },
    {
      id: "8ea624e42676b-a5d7-47f0-8874-bf46f234225d",
      raw_image: feat6,
      processed_image: feat6,
    },
    {
      id: "8ea624e426767b-a5d7-47f0-8874-bf46f234225d",
      raw_image: city2,
      processed_image: city2,
    },
    {
      id: "8ea624e42b-a67675d7-47f0-8874-bf46f234225d",
      raw_image: propImage,
      processed_image: propImage,
    },
    {
      id: "8ea624e42b-a5dj767j77-47f0-8874-bf46f234225d",
      raw_image: city4,
      processed_image: city4,
    },
    {
      id: "8ea624e42b-a5d7u67u7-47f0-8874-bf46f234225d",
      raw_image: img3,
      processed_image: img3,
    },
    {
      id: "8ea624e42b-a5d7j677j-47f0-8874-bf46f234225d",
      raw_image: feat6,
      processed_image: feat6,
    },
    {
      id: "8ea624e42b-a5d7i678-47f0-8874-bf46f234225d",
      raw_image: feat1,
      processed_image: feat1,
    },
    {
      id: "8ea624e42b-a5d7877-47f0-8874-bf46f234225d",
      raw_image: city1,
      processed_image: city1,
    },
    {
      id: "8ea624e42b-a58fd7-47f0-8874-bf46f234225d",
      raw_image: img7,
      processed_image: img7,
    },
    {
      id: "8ea624e42b-a5d7-rt8847f0-8874-bf46f234225d",
      raw_image: city5,
      processed_image: city5,
    },
    {
      id: "8ea624e42b-a5d7-4779p87f0-8874-bf46f234225d",
      raw_image: city3,
      processed_image: city4,
    },
    {
      id: "8ea624e42b-a5s6duy56d7-47f0-8874-bf46f234225d",
      raw_image: city2,
      processed_image: city2,
    },
    {
      id: "8ea624e42b-a5d7-478i6787f0-8874-bf46f234225d",
      raw_image: img1,
      processed_image: img1,
    },
    {
      id: "8ea624e42b-a5d7-47f0-8874-bf46f234225d",
      raw_image: city3,
      processed_image: city3,
    },
    {
      id: "8ea624e42b-a5678id7-47f0-8874-bf46f234225d",
      raw_image: img2,
      processed_image: img2,
    },
    {
      id: "8ea624e42b-a5d7-47678if0-8874-bf46f234225d",
      raw_image: city2,
      processed_image: city2,
    },
    {
      id: "8ea624e42b-a5d7-47567857fgf0-8874-bf46f234225d",
      raw_image: img4,
      processed_image: img4,
    },
    {
      id: "8ea624e42b-a5d7-4745646hjtf0-8874-bf46f234225d",
      raw_image: feat3,
      processed_image: feat3,
    },
  ],
  featured_image: {
    id: "8ea6e42b-a5d7-47f0-8874-bf46f234225d",
    hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
    raw_image: feat1,
    processed_image: feat1,
  },
  property_type: {
    id: "0a3efb13-bf61-40f5-9e0e-7153cec1d870",
    updated_at: "2023-12-01T11:40:05.607122Z",
    type_name: "Entire Home",
  },
  currency: {
    id: "9fd3a147-4f8f-40ab-a2b3-bbe768a19afc",
    updated_at: "2023-11-15T00:00:00Z",
    currency_name: "GPB",
    currency_sign: "£",
  },
  listing_reviews: [
    {
      id: "401b7ddc-df24-4e32-a53c-7948c1289ad4",
      creator: {
        id: "5c1c8c05-f114-4e52-9eef-80d9f8384248",
        first_name: "Anshuman",
        last_name: "Parmar",
        image: null,
        username: "anshumansp16",
        email: "anshumansp16@gmail.com",
        user_type: "Member",
        is_team_head: false,
        is_active: true,
        date_joined: [
          {
            day: 23,
          },
          {
            month: 11,
          },
          {
            year: 2023,
          },
        ],
      },
      ratings: "3.7",
      created_at: "2023-12-12T20:21:05.240146Z",
      updated_at: "2023-12-12T20:21:05.240162Z",
      title: "Nice Listing",
      review:
        "Place is better than the pictures shown here. Great place to party for group of 12. He have said that whatever you will write here, the Admin and the hosts will like it. Fizz was helpful, as were the helpers on the property. Will try to visit again, as Fizz was helpful, as were the helpers on the property. I will surely try to visit again.",
      value: "3.1",
      location: "3.9",
      comfort: "4.7",
      amenities: "4.6",
      cleanliness: "2.0",
      listing: "b6abc255-d08d-4dcc-95a6-46179b5ef6bc",
    },
    {
      id: "d1301ea7-556e-4eab-9421-0439e6c44534",
      creator: {
        id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
        first_name: "PERU",
        last_name: "CODER",
        image: "/media/users/Moons_and_Mountains.jpg",
        username: "unravler",
        email: "admin@unravler.eu.org",
        user_type: "Admin",
        is_team_head: true,
        is_active: true,
        date_joined: [
          {
            day: 15,
          },
          {
            month: 11,
          },
          {
            year: 2023,
          },
        ],
      },
      ratings: "3.7",
      created_at: "2023-12-05T19:25:32.325389Z",
      updated_at: "2023-12-06T04:45:00.072748Z",
      title: "DINGGG",
      review:
        "Place is better than the pictures shown here. Great place to party for group of 12. He have said that whatever you will write here, the Admin and the hosts will like it.",
      value: "2.1",
      location: "4.5",
      comfort: "2.4",
      amenities: "5.0",
      cleanliness: "4.7",
      listing: "b6abc255-d08d-4dcc-95a6-46179b5ef6bc",
    },
  ],
  listing_bookings: [
    {
      id: "b91dc617-0c7d-461b-9e11-2faae69c514b",
      booked_users: [
        {
          id: "fd0c8690-14c4-43ff-8954-a4537dfa90d3",
          created_at: "2023-11-20T00:45:37.581681Z",
          updated_at: "2023-11-20T13:59:25.313100Z",
          name: "nullCrex Unravler",
          email: "admin@unravler.eu.org",
        },
        {
          id: "afc7dc83-2141-4630-b2b3-83565eb930b8",
          created_at: "2023-11-20T14:18:03.132804Z",
          updated_at: "2023-11-20T14:18:03.167273Z",
          name: "nullCrex",
          email: "nulcrexer@gmail.com",
        },
      ],
      booking_user: {
        id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
        first_name: "PERU",
        last_name: "CODER",
        profile: null,
        username: "unravler",
        email: "admin@unravler.eu.org",
        user_type: "Admin",
        is_team_head: true,
        is_active: true,
      },
      booked_listing: {
        id: "b6abc255-d08d-4dcc-95a6-46179b5ef6bc",
        placeholder_name: "Modern Places",
        ammeneties_offered: [
          {
            id: "12ef8c9d-baba-4ab5-8ac1-f5d93b130302",
            updated_at: "2023-11-17T00:00:00Z",
            ammenetie_name: "SWIMMING",
          },
          {
            id: "998a9254-916e-4994-9423-5be0d4ae07f2",
            updated_at: "2023-11-17T00:00:00Z",
            ammenetie_name: "PARK",
          },
        ],
        bathrooms: "4",
        rooms: "5",
        beds: "2",
        guests: 3,
        isLuxury: false,
        property_type: {
          id: "0a3efb13-bf61-40f5-9e0e-7153cec1d870",
          updated_at: "2023-12-01T11:40:05.607122Z",
          type_name: "Entire Home",
        },
        pricing: "499.0000",
        currency: {
          id: "9fd3a147-4f8f-40ab-a2b3-bbe768a19afc",
          updated_at: "2023-11-15T00:00:00Z",
          currency_name: "GPB",
          currency_sign: "£",
        },
        average_rating: "3.50",
        property_images: [
          {
            id: "df1dae87-5829-4126-b25f-2ab037ece963",
            raw_image:
              "https://awake-quail-externally.ngrok-free.app/media/listings/c669ec9b-f901-4065-88ff-fb209a40cb7f.webp",
            processed_image:
              "https://awake-quail-externally.ngrok-free.app/media/listings/processed_c669ec9b-f901-4065-88ff-fb209a40cb7f.webp",
          },
          {
            id: "8ea6e42b-a5d7-47f0-8874-bf46f234225d",
            raw_image:
              "https://awake-quail-externally.ngrok-free.app/media/listings/1a284fe1-9332-412d-9635-4fefb3ca124d.webp",
            processed_image:
              "https://awake-quail-externally.ngrok-free.app/media/listings/processed_1a284fe1-9332-412d-9635-4fefb3ca124d.webp",
          },
        ],
        featured_image: "8ea6e42b-a5d7-47f0-8874-bf46f234225d",
      },
      created_at: "2023-11-25T18:16:48.718399Z",
      updated_at: "2023-12-01T11:19:37.770953Z",
      booking_start: "2023-11-25T18:16:29Z",
      booking_end: "2023-11-15T18:16:38Z",
      is_accepted: true,
      booking_currency: "f203bdea-1fd0-4d4f-99a6-d37f29bd21ab",
      payment: "1bb5f1b5-f6d9-4bf3-bfc5-ea014f1a0686",
    },
  ],
  listing_location: [
    {
      address: "Indore, India",
    },
  ],
  updated_at: "2023-12-03T22:30:53.542894Z",
  bathrooms: "4",
  rooms: "5",
  beds: "2",
  guests: 3,
  isLuxury: false,
  isParking: false,
  placeholder_name: "Modern Places",
  pricing: "499.0000",
  average_rating: "3.50",
  total_reviews: 2,
  short_description: "DUH short_description",
  long_description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  stats: {
    avg_rating: 3.5,
    total_reviews: 7,
    avg_clean_rating: 0.96,
    avg_location_rating: 1.2,
    avg_comfort_rating: 1.01,
    avg_amenities_rating: 1.37,
  },
  features:
    '[{"id": 1001, "title": "Room in a farm stay", "description": "Your own room in a home, plus access to shared spaces.", "icon": "fi fi-tr-bed-alt"}, {"id": 1002, "title": "Shared common spaces", "description": "You\\u2019ll share parts of the home.", "icon": "fi fi-tr-house-chimney"}, {"id": 1003, "title": "Shared bathroom", "description": "You\\u2019ll share the bathroom with others.", "icon": "fi fi-tr-shower"}, {"id": 1004, "title": "Dive right in", "description": "This is one of the few places in the area with a pool.", "icon": "fi fi-tr-swimmer"}]',
};

export const enquiryDialogMessages = {
  successMessage:
    "Your enquiry has been sent to the admin. Please wait for a few days to get back to you.",
  emptyErrorMessage:
    "Some fields are missing. Please complete them and then submit the form.",
  normalErrorMessage: "Something went wrong. Please try again.",
};

const accountIconStyles = {
  fontSize: "2rem",
  color: "black",
};

export const accountItems = [
  {
    id: 966,
    icon: <BadgeOutlinedIcon sx={accountIconStyles} />,
    text: "Personal Info",
    subtext: "Update details and customize your personal preferences.",
    link: "/profile",
  },
  {
    id: 967,
    icon: <BookmarkAddedOutlinedIcon sx={accountIconStyles} />,
    text: "Wishlist",
    subtext: "Manage and organise your desired items with your wishlist.",
    link: "/wishlist",
  },
  {
    id: 971,
    icon: <BeenhereOutlinedIcon sx={accountIconStyles} />,
    text: "Bookings",
    subtext: "View and manage your historical and upcoming bookings.",
    link: "/bookings",
  },
  // {
  //   id: 972,
  //   icon: <PaymentsOutlinedIcon sx={accountIconStyles} />,
  //   text: "Payments",
  //   subtext: "Review and manage your payment methods and details.",
  //   link: "/profile"
  // },
  {
    id: 968,
    icon: <NotificationsNoneOutlinedIcon sx={accountIconStyles} />,
    text: "Notifications",
    subtext: "View all the on-site notifications and get updates.",
    link: "/notifications",
  },
  // {
  //   id: 969,
  //   icon: <PrivacyTipOutlinedIcon sx={accountIconStyles} />,
  //   text: "Privacy Needs",
  //   subtext: "Set and customize your privacy and security preferences.",
  //   link: "/privacy-needs"
  // },
  // {
  //   id: 970,
  //   icon: <LanguageOutlinedIcon sx={accountIconStyles} />,
  //   text: "Global Preferences",
  //   subtext: "Adjust your region and other settings for a global experience.",
  //   link: "/global-preferences",
  // },
];

export const policies = [
  "No smoking inside the premises.",
  "Pets are not allowed.",
  "Quiet hours are from 10:00 PM to 6:00 AM.",
  "Check-in time is after 3:00 PM.",
  "Check-out time is before 11:00 AM.",
  "Guests must provide a valid ID upon check-in.",
  "No parties or events allowed.",
  "Damages to the property will be charged.",
  "Lost keys will incur a replacement fee.",
  "Guests are responsible for their belongings.",
];

export const cancellationPolicy = [
  "Cancellations made 7 days or more before check-in date will receive a full refund.",
  "Cancellations made between 3 and 6 days before check-in date will receive a 50% refund.",
  "Cancellations made less than 3 days before check-in date are non-refundable.",
  "Changes to the reservation date are subject to availability and may incur additional fees.",
  "No-shows will be charged the full amount of the reservation.",
  "Refunds will be processed within 7-14 business days.",
  "Guests are responsible for any transaction fees associated with refunds.",
  "In case of unforeseen circumstances or emergencies, exceptions to the cancellation policy may be considered on a case-by-case basis.",
  "Guests must communicate any changes or cancellations through the provided contact information.",
  "Failure to adhere to the cancellation policy may result in additional charges or penalties.",
];

export const messagesData = [
  {
    receiver: {
      id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
      username: "unravler",
    },
    id: "0472037e-b1f2-44fd-9efv8c-a37da74c191c",
    timestamp: "2024-01-10T07:28:59.466564Z",
    message: "This is a sample message. How are you?",
  },
  {
    receiver: {
      id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
      username: "disastrous",
    },
    id: "0472037e-b1f2-44fd-9efv8c-a37da74c191ckjk",
    timestamp: "2024-01-10T07:28:59.466564Z",
    message: "This is a sample reply message. How are you doing madame?",
  },
  {
    receiver: {
      id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
      username: "unravler",
    },
    id: "0472037e-b1f2-44fd-9efv8c-a37dafsv74c191ckjk",
    timestamp: "2024-01-10T07:28:59.466564Z",
    message: "This is a sample message. How are you?",
  },
  {
    receiver: {
      id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
      username: "disastrous",
    },
    id: "0472037e-b1f2-44fd-9efv8c-a37da7sdf4c191ckjk",
    timestamp: "2024-01-10T07:28:59.466564Z",
    message: "This is a sample reply message. How are you doing madame?",
  },
  {
    receiver: {
      id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
      username: "unravler",
    },
    id: "0472037e-b1f2-44fsdfdd-9efv8c-a37da74c191ckjk",
    timestamp: "2024-01-10T07:28:59.466564Z",
    message: "This is a sample message. How are you?",
  },
  {
    receiver: {
      id: "0472037e-b1f2-44fd-9e8c-a37da74c191c",
      username: "disastrous",
    },
    id: "0472037e-b1f2-44fd-9efv8c-a37da74c191ckjzdfk",
    timestamp: "2024-01-10T07:28:59.466564Z",
    message: "This is a sample reply message. How are you doing madame?",
  },
];

export const DashboardImportantItems = [
  {
    id: 1,
    icon: <EventAvailableIcon />,
    title: "Create a Listing",
    subtitle: "Add a listing for your place",
    actionText: "start",
    link: "/host/add-listing",
  },
  {
    id: 2,
    icon: <EventAvailableIcon />,
    title: "View your Listings",
    subtitle: "Take a look to your listings",
    actionText: "start",
    link: "/host/listings",
  },
  {
    id: 3,
    icon: <EventAvailableIcon />,
    title: "View All Bookings",
    subtitle: "Review all the available bookings",
    actionText: "start",
    link: "/host/reservations",
  },
  {
    id: 4,
    icon: <EventAvailableIcon />,
    title: "Your Profile",
    subtitle: "View your account settings and profile",
    actionText: "start",
    link: "/account",
  },
  {
    id: 5,
    icon: <EventAvailableIcon />,
    title: "Chat with Admin",
    subtitle: "Resolve your queries or any issue",
    actionText: "start",
    link: "/account",
  },
  {
    id: 6,
    title: "Contact Snugstaff",
    icon: <EventAvailableIcon />,
    subtitle: "Create a listing for your place",
    actionText: "start",
    link: "/contact",
  },
];
