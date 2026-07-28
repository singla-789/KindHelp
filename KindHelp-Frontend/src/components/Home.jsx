// import React from "react";
// import CTA from "./CTA";
// import About from "./About";
// import Services from "./Services";
// import Blog from "./Blog";
// import ContactUs from "./ContactUs";
// import MeetTheTeam from "./MeetTeam";
// import Footer from "./Footer";

// const Home = () => {
//   return (
//     <>
//       <CTA />
//       <About />
//       <Services />
      
      
//       <Blog id/>
//       <MeetTheTeam />
//       <ContactUs />
//       <Footer />
//     </>
//   );
// };

// export default Home;


import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import CTA from "./CTA";
import About from "./About";
import Services from "./Services";
import Blog from "./Blog";
import ContactUs from "./ContactUs";
import MeetTheTeam from "./MeetTeam";
import Footer from "./Footer";

const Home = () => {
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const scrollTo = params.get("scrollTo");
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [search]);

  return (
    <>
      <CTA />
      <div id="about"><About /></div>
      <div id="services"><Services /></div>
      <div id="blog"><Blog /></div>
      <div id="team"><MeetTheTeam /></div>
      <div id="contact"><ContactUs /></div>
      <div id="footer"><Footer /></div>
    </>
  );
};

export default Home;
