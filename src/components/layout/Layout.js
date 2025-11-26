import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  title = "title",
  description = "description",
  className,
  children,
}) => (
  <>
    <Header />
    <div className={`content ${className}`}>{children}</div>
    <Footer />
  </>
);

export default Layout;
