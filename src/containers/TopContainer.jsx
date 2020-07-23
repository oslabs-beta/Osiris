import "../assets/css/TopContainer.css";
import React from "react";
import BuildItem from "../components/BuildItem.jsx";

const TopContainer = (props) => {
  const { items } = props;

  return (
    <div className="topContainer">
      TOP CONTAINER
      {items &&
        items.map((item) => (
          <BuildItem id={item.id} key={item.id} item={item} />
        ))}
    </div>
  );
};

export default TopContainer;
