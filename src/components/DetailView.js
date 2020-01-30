import React, { useContext } from "react";

import parking from "../assets/icons/local_parking-24px.svg";
import elevator from "../assets/icons/elevator.svg";

import { distanceCalculator } from "./helpers.js";
import { ListingContext } from "./Contexts.js"

import { Image, Title, Modal, Content } from "rbx";

const DetailView = () => {
    const { currListing, updateCurrListing, toggleContactView } = useContext(ListingContext);
  
    return (
      <div style={{ width: "100%", height: "100%", margin: 0 }}>
        <Modal id="dtView" active={currListing != null}>
          {currListing != null ?
            <React.Fragment>
              <Modal.Background style={{ height: "100%", margin: "0px" }}></Modal.Background>
  
              <Modal.Card style={{ width: "100%", height: "100%", top: "-5%" }}>
                <Modal.Card.Body style={{ width: "100%", padding: "0px", margin: "0px" }}>
  
                  {/* Top exit icon */}
                  <div id="dtExit" style={{ fontSize: '24px', color: 'white', position: "fixed", top: "1%", left: "3%" }} onClick={() => { document.getElementById("dtView").classList.remove("show"); setTimeout(function () { updateCurrListing(null) }, 150) }}>
                    &#10005;
                  </div>
                  <Image alt="Picture of the storage spaace" src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" style={{ width: "100%", padding: "0px" }} />
  
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
                        <span style={{ backgroundColor: "	#4E2A84", padding: "10px", color: "white", fontWeight: "bold", borderRadius: "3px" }}
                          onClick={() => { toggleContactView(true); setTimeout(function () { document.getElementById("ctView").classList.add("show") }, 100); }}
                        >
                          Check availability
                        </span>
                      </th>
                    </table>
  
                  </div>
  
                  {/* Content */}
                  <Content style={{ width: "94%", margin: "auto", paddingTop: "1%" }}>
                    <Title style={{ marginBottom: "0" }}>{currListing.name}</Title>
                    <div style={{ fontSize: '14px', textAlign: "right", float: "right", fontWeight: "normal", marginTop: "-3px" }}>{distanceCalculator({"latitude": 42.057923, "longitude": -87.675918}, currListing.location.geodata.coordinates)}</div>
                    <br />
                    <p style={{ marginTop: "2%" }}>
                      {currListing.description}
                    </p>
  
                    <p style={currListing.attributes.hasElevator || currListing.attributes.hasParking ? { height: '24px', fontWeight: "700", marginBottom: "5px" } : { display: "none" }}>Amenities</p>
  
                    <table style={{ width: "100%" }}>
                      <tr style={currListing.attributes.hasElevator ? { height: '22px' } : { display: "none" }}>
                        <th style={{ width: "10%" }}>
                          <img src={elevator} />
                        </th>
                        <th style={{ width: "90%", textAlign: "left", fontWeight: "normal", fontSize: "15px" }}>
                          <p style={{ fontWeight: "500" }}>Elevator</p>
                        </th>
                      </tr>
  
                      <tr style={currListing.attributes.hasParking ? { height: '22px' } : { display: "none" }}>
                        <th style={{ width: "10%" }}>
                          <img src={parking} />
                        </th>
                        <th style={{ width: "90%", textAlign: "left", fontWeight: "normal", fontSize: "15px" }}>
                          <p style={{ fontWeight: "500" }}>Free parking on premise</p>
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

  export default DetailView;