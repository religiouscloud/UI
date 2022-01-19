import React from "react";
import './styles.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="Footer">
      <p className="fop">Copyright ⓒ Religious Cloud Inc. ({year})</p>
    </footer>
  );
}

export default Footer;
