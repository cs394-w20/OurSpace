import React, { useState, useContext } from "react";
import "./App.css";
import "rbx/index.css";
import styles from "./assets/styles/DetailView.css"

import parking from "./assets/icons/local_parking-24px.svg";
import elevator from "./assets/icons/elevator.svg";
// import ramp from "./assets/icons/ramp.svg";

import TestData from "./assets/data/listings.json";
import pushTestData from "./apiCalling.js";

import { Card, Image, Column, Title, Modal, Content } from "rbx";

const ListingContext = React.createContext();

fetch('http://3.15.24.81:4000/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body: ({})
})

function sizeCalculator(sizeObject) {

  var volume = sizeObject.length * sizeObject.width * sizeObject.height;

  if (volume > 125) {
    if (volume > 1000) {
      return "Large";
    }

    return "Medium";
  }

  return "Small";
}

const App = () => {

  const [currListing, updateCurrListing] = useState(null);
  function updateListing(newListing) {
    updateCurrListing(newListing);
  }


  return (
    <ListingContext.Provider value={{ currListing, updateListing }}>
      <div className="App" width="100%" height="100%" opacity="0.99">
        <input z-index="0"></input>
        <DetailView />
        <ListingList />
      </div>
    </ListingContext.Provider>
  );
};

const DetailView = () => {
  const { currListing, updateListing } = useContext(ListingContext);;

  return (
    <div style={{ width: "100%", height: "100%", margin: 0 }}>
      <Modal active={currListing != null} id="dtView">
        {currListing != null ?
        <React.Fragment>
          <Modal.Background style={{ height: "100%", margin: "0px" }}></Modal.Background>

          <Modal.Card style={{ width: "100%", height:"100%", top: "-5%" }}>
            <Modal.Card.Body style={{ width: "100%", padding: "0px", margin: "0px" }}>

              {/* Top exit icon */}
              <div style={{ fontSize: '24px', color: 'white', position: "fixed", top: "1%", left: "3%" }} onClick={() => {document.getElementById("dtView").classList.remove("show"); setTimeout(function(){updateListing(null)}, 200)}}>
                &#10005;
              </div>
              <Image src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" style={{ width: "100%", padding: "0px" }} />

              {/* bottom bar */}
              <div style={{ height: "9%", backgroundColor: 'white', position: "fixed", bottom: "0", width: "100%", boxShadow: "0px -1px #888888" }}>

                <table style={{ width: "100%" }}>
                  <th style={{ width: "58%" }}>
                    <div style={{ fontSize: '14px', textAlign: "left", fontWeight: "normal", margin: "4% 6%" }}>

                      <span style={{ fontSize: "18px", fontWeight: "bold" }}>${currListing ? currListing.price : ""}</span> / NIGHT <br></br>
                      <div style={{ display: 'inline-block' }}>
                        <span style={{ color: 'green' }}>&#9733; 4.37</span>
                        <span style={{ fontSize: "13px", paddingLeft: "2px" }}>(32)</span>
                      </div>

                    </div>
                  </th>
                  <th style={{ width: "42%", textAlign: "left", fontWeight: "normal", fontSize: "15px", padding: "6% 0" }}>
                    <span style={{ backgroundColor: "	#4E2A84", padding: "10px", color: "white", fontWeight: "bold", borderRadius: "3px" }}>Check availability</span>
                  </th>
                </table>

              </div>

              {/* Content */}
              <Content style={{ width: "94%", margin: "auto", paddingTop: "1%", paddingBottom: "2%" }}>
                <Title>{currListing.name}</Title>
                <p>
                  {currListing.description}
                </p>



                {/* <img style={currListing.attributes.hasElevator ? { height: '22px' } : { display: "none" }} src={elevator} />
                <p style={currListing.attributes.hasElevator ? { height: '22px' } : { display: "none" }}>Yes Elevator</p>
                <img style={currListing.attributes.hasParking ? { height: '22px' } : { display: "none" }} src={parking} />
                <p style={currListing.attributes.hasParking ? { height: '22px' } : { display: "none" }}>Yes Parking</p> */}

                <p style={currListing.attributes.hasElevator || currListing.attributes.hasParking ? { height: '24px', fontWeight:"700", marginBottom:"5px" } : { display: "none" }}>Amenities</p>

                <table style={{ width: "100%" }}>
                  <tr style={currListing.attributes.hasElevator ? { height: '22px' } : { display: "none" }}>
                    <th style={{ width: "10%" }}>
                      <img src={elevator}/>
                    </th>
                    <th style={{ width: "90%", textAlign: "left", fontWeight: "normal", fontSize: "15px" }}>
                      <p style={{fontWeight:"500"}}>Elevator</p>
                    </th>
                  </tr>

                  <tr style={currListing.attributes.hasParking ? { height: '22px' } : { display: "none" }}>
                    <th style={{ width: "10%" }}>
                      <img src={parking}/>
                    </th>
                    <th style={{ width: "90%", textAlign: "left", fontWeight: "normal", fontSize: "15px" }}>
                      <p style={{fontWeight:"500"}}>Free parking on premise</p>
                    </th>
                  </tr>
                </table>
                




                <p>
                  Dimensions: {currListing.size.length} x {currListing.size.width} x {currListing.size.height} ft
                </p>
                <p>
                  Available until {(new Date(currListing.time)).toDateString()}
                </p>
              </Content>
            </Modal.Card.Body>
          </Modal.Card>
        </React.Fragment>
        : null}
      </Modal>
    </div>
  );
};

const StorageCard = ({ listing }) => {

  const { currListing, updateListing } = useContext(ListingContext);

  return (
    <div style={{ width: "90%", margin: "Auto", paddingTop: '20px' }} onClick={() => {updateListing(listing); setTimeout(function(){ document.getElementById("dtView").classList.add("show") }, 0);}}>
      <Card style={{ borderRadius: "8px" }}>
        <Card.Image>
          <Image.Container size="4by3">
            <Image src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" style={{ borderRadius: "8px" }} />
          </Image.Container>
        </Card.Image>

        <Card.Content style={{ padding: "10px" }}>
          <table style={{ width: "100%" }}>
            <th style={{ width: "60%" }}>
              <div style={{ fontSize: '14px', textAlign: "left", fontWeight: "normal" }}>
                <span style={{ textTransform: 'uppercase', fontWeight: "500", border: "1px solid black", borderRadius: "4px", padding: '4px', paddingTop: '0px', paddingBottom: '0px' }}>{sizeCalculator(listing.size)}</span>
              </div>
            </th>
            <th style={{ width: "40%", textAlign: "right", fontWeight: "normal", fontSize: "15px" }}>


              <div style={{ display: 'inline-block' }}>
                <span style={{ color: 'red' }}>&#9733;</span>{listing.rating.score}
                  <span style={{ fontSize: "13px", paddingLeft: "2px" }}>({listing.rating.numRatings})</span>
              </div>
            </th>
          </table>

          <div style={{ fontSize: '24px', textAlign: "left", width: "100%", lineHeight: '30px' }}>{listing.name}
            <div style={{ display: 'inline-block', float: "right", marginTop: '5px' }}>

              <img style={listing.attributes.hasElevator ? { height: '22px' } : { display: "none" }} src={elevator} />
              <img style={listing.attributes.hasParking ? { height: '22px' } : { display: "none" }} src={parking} />
            </div>

          </div>

          <table style={{ width: "100%", marginTop: '10px' }}>
            <tr>
              <th style={{ width: "60%" }}>
                <div style={{ fontSize: '20px', textAlign: "left", fontWeight: "normal" }}>
                  <span style={{ fontWeight: "bold" }}>${listing.price}</span>/night
              </div>
              </th>
              <th style={{ width: "40%", textAlign: "right", fontWeight: "normal", fontSize: "15px" }}>
                <div style={{ fontSize: '16px', textAlign: "right", float: "right", fontWeight: "normal" }}>5 miles away</div>
                <br></br>
              </th>
            </tr>
          </table>

        </Card.Content>
      </Card>
    </div>
  );
};

const ListingList = () => {

  const [listings, setListings] = useState([]);

  function getListingsData () {
    fetch('http://localhost:4000/get_listings', {
      method: 'POST',
      headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
      body: JSON.stringify({latitude:42.055984, longitude:-87.675171, listingsPerPage:10, pageNumber:1})
    })
    .then(response => response.json())
    .then(response => {
      setListings(response.listings);
    })
  }

  var columnIds = [...Array(listings.length).keys()];

  if (listings.length === 0){
    getListingsData();
  }
  return (
    <div>
      <Column.Group multiline>
        {columnIds.map(i => (
          <Column key={i} size="one-quarter">
            <StorageCard listing={listings[i]} />
          </Column>
        ))}
      </Column.Group>
    </div>
  );
};

export default App;
