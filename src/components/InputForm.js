import React, { useState } from "react";
import "../css/inputForm.css";

const InputForm = () => {
  const [lat1, setLat1] = useState("");
  const [long1, setLong1] = useState("");
  const [lat2, setLat2] = useState("");
  const [long2, setLong2] = useState("");
  const [distance, setDistance] = useState(0);

const calculateDistance = () => {
    let radian = 6371;
    let latDist = ((lat2 - lat1) * Math.PI) / 180;
    let longDist = ((long2 - long1) * Math.PI) / 180;
    let a =
      Math.sin(latDist / 2) * Math.sin(latDist / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(longDist / 2) *
        Math.sin(longDist / 2);

    let c = 2 * Math.asin(Math.sqrt(a));
    let d = radian * c;

    setDistance(d);
  };

  return (
    <>
      <h1>Air Distance Calculator App</h1>

      <div className="container">
        <div class="ui labeled input transparent">
          <div class="ui tag label">Point A</div>
          <input
            type="text"
            placeholder="Latitude"
            onChange={(e) => setLat1(e.target.value)}
          />
          <h3>,</h3>
          <input
            type="text"
            placeholder="Longitude"
            onChange={(e) => setLong1(e.target.value)}
          />
        </div>
        <div class="ui blue button" onClick={(e) => calculateDistance(e)}>
          Calculate
        </div>
        <div class="ui labeled input transparent">
          <div class="ui tag label">Point B</div>
          <input
            type="text"
            placeholder="Latitude"
            onChange={(e) => setLat2(e.target.value)}
          />
          <h3>,</h3>
          <input
            type="text"
            placeholder="Longitude"
            onChange={(e) => setLong2(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2>Distance: {distance.toFixed(2)}km</h2>
      </div>
    </>
  );
};

export default InputForm;
