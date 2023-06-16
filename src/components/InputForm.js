import React, { useState } from "react";
import "../css/inputForm.css";
import Address from "../apis/Address";

const InputForm = () => {
  const [lat1, setLat1] = useState("");
  const [long1, setLong1] = useState("");
  const [lat2, setLat2] = useState("");
  const [long2, setLong2] = useState("");
  const [distance, setDistance] = useState(0);
  const [fullAddress, setFullAddress] = useState("");
  const [addressLat, setAddressLat] = useState("");
  const [addressLon, setAddressLon] = useState("");

  const calculateDistance = () => {
    setFullAddress("")
    setAddressLat("")
    setAddressLon("")
    
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

  const addressConversion = async () => {
    const res = await Address.get(`${fullAddress}&format=json`);
    // console.log(res.data[0].lat, res.data[0].lon)
    setAddressLat(res.data[0].lat);
    setAddressLon(res.data[0].lon);
  };

  const calculateAddressCoordinates = () => {
    let addressEdit = [];
   
    for (let letter of fullAddress) {
      if (letter === " ") {
        addressEdit.push("%20");
      } else if (letter === ",") {
        addressEdit.push("%2C");
      } else {
        addressEdit.push(letter);
      }
    }
    setFullAddress(addressEdit.join(" "));
    addressConversion();
  };

  return (
    <>
      <h1>Air Distance Calculator App</h1>

      <div className="container">
        <div className="ui labeled input transparent">
          <div className="ui tag label">Point A</div>
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
        <div className="ui blue button" onClick={(e) => calculateDistance(e)}>
          Calculate
        </div>
        <div className="ui labeled input transparent">
          <div className="ui tag label">Point B</div>
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
      <br/>
      <div>
        <h2>Distance: {distance.toFixed(2)}km</h2>
      </div>
      <br/><br/>
      <div>
        <h3>Or Don't know Coordinates? Enter an address below to get the coordinates</h3>
      </div>
      <br></br>
      <br></br>

      <div className="container2">
        <div className="ui labeled input">
          <div className="ui tag label">Address</div>
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setFullAddress(e.target.value)}
          />
        </div>
        <div
          className="ui blue button"
          onClick={(e) => calculateAddressCoordinates(e)}
        >
          Get Coordinates
        </div>
        <h2>{addressLat}, {addressLon}</h2>
      </div>

      
    </>
  );
};

export default InputForm;
