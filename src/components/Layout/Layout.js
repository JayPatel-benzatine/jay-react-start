
import React from "react";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

const Layout = ({ children, darkMode }) => {

  return (
    <React.Fragment>
      <div
        maxWidth={false}
       
      >
        <Navigation darkMode={darkMode} />

        <div>
          {children}
        </div>
      </div>
      
    <Footer/>
    </React.Fragment>
  );
};

export default Layout;
