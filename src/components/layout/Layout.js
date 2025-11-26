import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ className, children }) => (
  <>
    <Header />
    <div className={`content ${className}`}>{children}</div>
    <Footer />
  </>
);

export default Layout;
