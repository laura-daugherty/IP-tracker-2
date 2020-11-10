import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import L, {Map} from 'leaflet';
import arrow from "./images/icon-arrow.svg"
import icon from "./images/icon-location.svg"
type Res = {
  ip?: string;
  isp?: string;
  location?: {
    city: string;
    postalCode: string;
    region: string;
    timezone: string;
    lat: number;
    lng: number;
  }
};


let mymap: Map
var locIcon = L.icon({
  iconUrl: icon,
});

const getDefaultData = function() {
  const apiKey = "at_TRBYrFOIjsPy2m3153j3tysb2gHeO"
    axios
    .get("https://geo.ipify.org/api/v1", {
      params: {apiKey}
    }) 
    .then((response) => {
      console.log(response)
      mymap = L.map('mapid').setView([response.data.location.lat, response.data.location.lng], 13); 
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibGF1cmFkYXVnaGVydHk2IiwiYSI6ImNrZ3Y1bDNtMzAwYXczMm1oZzB1d2JlbXAifQ._ETkRKDE53zkD46J-Tw-bA'
      }).addTo(mymap);
      L.marker([response.data.location.lat, response.data.location.lng], {icon: locIcon}).addTo(mymap)
      console.log("mymap",mymap)
    }, (error) => {
      console.log("error", error)
    })
  }

getDefaultData()
 
function App() {

  const [ipAddress, setIpAddress] = useState({ 
    ipAddress: ""
  })
  const [ipData, setIpData] = useState({})

  const handleChange = function (event:any) {
    setIpAddress({ ipAddress: event.target.value})
  }

  const lookupIpAddress = function(IpAddress:{ipAddress:string}) {
    const apiKey = "at_TRBYrFOIjsPy2m3153j3tysb2gHeO"
    if (ipAddress.ipAddress === "" && mymap) {
      mymap.remove()
      axios
        .get("https://geo.ipify.org/api/v1", {
          params: {apiKey}
        }) 
        .then((response) => {
          console.log(response)
          setIpData(response.data)
          mymap = L.map('mapid').setView([response.data.location.lat, response.data.location.lng], 13); 
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibGF1cmFkYXVnaGVydHk2IiwiYSI6ImNrZ3Y1bDNtMzAwYXczMm1oZzB1d2JlbXAifQ._ETkRKDE53zkD46J-Tw-bA'
          }).addTo(mymap)
          L.marker([response.data.location.lat, response.data.location.lng], {icon: locIcon}).addTo(mymap)
        }, (error) => {
          console.log("error", error)
        })
    } else {
      mymap.remove()
      axios
        .get("https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1", {
          params: {apiKey}, 
          data: {ipAddress}
        }) 
        .then((response) => {
          console.log(response)
          setIpData(response.data)
          mymap = L.map('mapid').setView([response.data.location.lat, response.data.location.lng], 13); 
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibGF1cmFkYXVnaGVydHk2IiwiYSI6ImNrZ3Y1bDNtMzAwYXczMm1oZzB1d2JlbXAifQ._ETkRKDE53zkD46J-Tw-bA'
          }).addTo(mymap);
          L.marker([response.data.location.lat, response.data.location.lng], {icon: locIcon}).addTo(mymap)
        }, (error) => {
          console.log("error", error)
        })
    }
  }


  const displayAddress = function(ipData: Res) {
    return (ipData?<div className="answer-div">{ipData.ip}</div>:<div className="answer-div"/>)
  }

  const displayLocation = function(ipData: Res) {
    return (ipData && ipData.location?<div className="answer-div">{ipData.location.city}, {ipData.location.region} {ipData.location.postalCode}</div>:<div className="answer-div"/>) 
  }

  const displayTimezone = function(ipData: Res) {
    return (ipData && ipData.location? <div className="answer-div">UTC {ipData.location.timezone}</div>:<div className="answer-div"/>)
  }

  const displayISP = function(ipData: Res) {
    return (ipData?<div className="answer-div">{ipData.isp}</div>:<div className="answer-div"/>)
  }
  
  return (
    <div className="App">
        <header className="app-header">
          <h1>
            IP Address Tracker
          </h1>
        </header>
        <div className="input-div">
          <input
            className="input"
            type="text"
            onChange={handleChange}
            placeholder="Enter IP address here"
          />
          <button onClick={() => lookupIpAddress(ipAddress)}>
            <input className="image-input" type="image" src={arrow} />
          </button>
      </div>
      
      <div className="infoDiv">
        <div className="info-section">
          <h3>
            IP ADDRESS
          </h3>
          <h2>
            {displayAddress(ipData)}
          </h2>
        </div>
        <div className="info-section">
          <h3>
            LOCATION
          </h3>
          <h2>
            {displayLocation(ipData)}
          </h2>
        </div>
        <div className="info-section">
          <h3>
            TIMEZONE
          </h3>
          <h2>
            {displayTimezone(ipData)}
          </h2>
        </div>
        <div className="info-section">
          <h3>
            ISP
          </h3>
          <h2>
            {displayISP(ipData)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;

