import React from "react";
import "./cityInfo.css";

export default function CityInfo(props) {
  return (
    <div className="col city-info">
      <h1>{props.city}</h1>
      <h2>Friday 12:35</h2>
      <img src={props.icon} alt="icon" width="60" />
    </div>
  );
}
