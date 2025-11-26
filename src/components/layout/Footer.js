import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white p-4 text-center footer-bottom">
      <div className="container">
        <h4>Thank you for visiting. Come Again!</h4>
        <p>&copy; {new Date().getFullYear()} React E-commerce</p>
      </div>
    </footer>
  );
};

export default Footer;
