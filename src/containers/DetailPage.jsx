import "../assets/css/Detailpage.css";
import React from "react";

const detailPage = (props) => {
  return (
    <div className="detailpage">
      DETAIL PAGE
      <div className="image-container">
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/51G4M8lU9FL._AC_SL1000_.jpg"
          alt="Fluffy bunny"
          className="detail-img"
        />
      </div>
      <ul>
        <li>TYPE</li>
        <li>TAGS</li>
        <li>DESCRIPTION</li>
      </ul>
      <div className="button-container">
        <button>Download Code</button>
      </div>
    </div>
  );
};

export default detailPage;
