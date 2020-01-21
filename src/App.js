import React, { useState, useContext, useEffect, Component } from "react";
import "./App.css";
import "rbx/index.css";
import "./assets/styles/DetailView.css"
import ReactLightCalendar from '@lls/react-light-calendar'
import "./assets/styles/calendar.css";

import "./firebase.js"

import parking from "./assets/icons/local_parking-24px.svg";
import elevator from "./assets/icons/elevator.svg";
// import ramp from "./assets/icons/ramp.svg";

import { Card, Image, Column, Title, Modal, Content, PageLoader } from "rbx";

const ListingContext = React.createContext();

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

const DAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTH_LABELS = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

var calcStartDate;
var numOfDays = 3;

// function calculatePrice(numOfDays) {
//   return <div>Hello World!</div>;
// }


class Calendar extends Component {
  constructor(props) {
    super(props);
    // Get initial startDate and endDate
    this.state = {
      startDate: props.startDate,
      endDate: props.endDate
    };
  }

  onChange = (startDate, endDate) => {
    this.setState({ startDate, endDate });
    numOfDays = (endDate-startDate)/86400000;
    // alert(numOfDays);
    // calculatePrice(numOfDays);
  }

  render = () => {
    const { startDate, endDate } = this.state;
    // calcStartDate = startDate;

    return (
      <ReactLightCalendar
        dayLabels={DAY_LABELS}
        monthLabels={MONTH_LABELS}
        onChange={this.onChange}
        startDate={startDate}
        endDate={endDate}
        {...this.props} // Add parent's additionnal props
      />
    );
  };
}

function deg2rad(deg) {
  //thanks to stackexchange for most of the body of this function
  return deg * (Math.PI / 180)
}

function distanceCalculator(coordinates) {
  //thanks to stackexchange for most of the body of this function
  var userLatitude = 42.055984;
  var userLongitude = -87.675171;
  var R = 3958.8; // Radius of the earth in miles
  var dLat = deg2rad(coordinates.latitide - userLatitude);  // deg2rad below
  var dLon = deg2rad(coordinates.longitude - userLongitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coordinates.latitide)) * Math.cos(deg2rad(userLatitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in miles
  d = Math.floor(d);
  var out = d.toString() + " miles"; //modify text here
  return out;
}


const App = () => {

  const [currListing, updateCurrListing] = useState(null);
  const [listingList, updateList] = useState([]);
  const [contactViewOpen, toggleContactView] = useState(false);

  useEffect(() => {
    function getListingsData() {
      fetch('http://localhost:4000/get_listings', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ latitude: 42.055984, longitude: -87.675171, listingsPerPage: 10, pageNumber: 1 })
      })
        .then(response => response.json())
        .then(response => {
          updateList(response.listings);
        });
    }
    getListingsData();
  }, []);

  const updateAll = (newListing) => {
    /* 
        BACKEND: ADD CODE HERE TO SET UP PUSHING NEW LISTINGS TO REMOTE DB
    */
    updateList([newListing].concat(listingList))
  }

  if(listingList.length === 0) return (<PageLoader active={true} color="light"></PageLoader>);


  return (
    <ListingContext.Provider value={{ currListing, updateCurrListing, listingList, updateAll, contactViewOpen, toggleContactView }}>
      <div className="App" width="100%" height="100%">
        <ListingList />
        <DetailView />
        <ContactView />
      </div>
    </ListingContext.Provider>
  );
};

const DetailView = () => {
  const { currListing, updateCurrListing, toggleContactView } = useContext(ListingContext);

  return (
    <div style={{ width: "100%", height: "100%", margin: 0 }}>
      <Modal active={currListing != null} id="dtView">
        {currListing != null ?
          <React.Fragment>
            <Modal.Background style={{ height: "100%", margin: "0px" }}></Modal.Background>

            <Modal.Card style={{ width: "100%", height: "100%", top: "-5%" }}>
              <Modal.Card.Body style={{ width: "100%", padding: "0px", margin: "0px" }}>

                {/* Top exit icon */}
                <div id="dtExit" style={{ fontSize: '24px', color: 'white', position: "fixed", top: "1%", left: "3%" }} onClick={() => { document.getElementById("dtView").classList.remove("show"); setTimeout(function () { updateCurrListing(null) }, 150) }}>
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
                      <span style={{ backgroundColor: "	#4E2A84", padding: "10px", color: "white", fontWeight: "bold", borderRadius: "3px"}}
                            onClick={() => { toggleContactView(true); setTimeout(function () { document.getElementById("ctView").classList.add("show") }, 100); }}
                            >
                        Check availability
                      </span>
                    </th>
                  </table>

                </div>

                {/* Content */}
                <Content style={{ width: "94%", margin: "auto", paddingTop: "1%"}}>
                  <Title style={{marginBottom: "0"}}>{currListing.name}</Title>
                  <div style={{ fontSize: '14px', textAlign: "right", float: "right", fontWeight: "normal", marginTop:"-3px"}}>{distanceCalculator(currListing.location.geodata.coordinates)}</div>
                  <br/>
                  <p style={{marginTop:"2%"}}>
                    {currListing.description}
                  </p>

                  {/* <table style={{ width: "100%" }}>
                    <th style={{ width: "70%" }}>
                        <p>hosted by Charles</p>
                    </th>
                    <th style={{ width: "30%", textAlign: "right", fontWeight: "normal", fontSize: "15px" }}>
                        <Image src="https://media-exp2.licdn.com/dms/image/C4D03AQGlMxrEKues9g/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=6wCiJIZ6fLzoIMPdo7s33G4bmcWEfpKzQhRfKbm6MvY" style={{ width: "100%", padding: "0px", borderRadius: "50%"}} />
                    </th>
                  </table> */}
                  

                  

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

const StorageCard = ({ listing }) => {

  const { updateCurrListing } = useContext(ListingContext);

  return (
    <div style={{ width: "90%", margin: "Auto", paddingTop: '20px' }} onClick={() => { updateCurrListing(listing); setTimeout(function () { document.getElementById("dtView").classList.add("show") }, 0); }}>
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
                <div style={{ fontSize: '16px', textAlign: "right", float: "right", fontWeight: "normal" }}>{distanceCalculator(listing.location.geodata.coordinates)}</div>
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

  const { listingList } = useContext(ListingContext);

  var columnIds = [...Array(listingList.length).keys()];

  return (
    <div>
      <Column.Group multiline>
        {columnIds.map(i => (
          <Column key={i} size="one-quarter">
            <StorageCard listing={listingList[i]} />
          </Column>
        ))}
      </Column.Group>
    </div>
  );
};

const ContactView = () => {

  // FRONTEND: Eventually fetch seller data from currListing.sellar or something

  const { currListing, contactViewOpen, toggleContactView } = useContext(ListingContext);

  return (
    <div>
      <Modal active={contactViewOpen} id="ctView">
        {currListing != null ?
          <React.Fragment>
            <Modal.Background style={{ height: "100%", margin: "0%", backgroundColor:"rgba(255, 255, 255, .4)"}}></Modal.Background>

            <Modal.Card style={{ width: "100%", height: "100%", bottom: "-2%", borderRadius: "10px" }}>
              <Modal.Card.Body>
                <div id="ctExit" style={{width:"100%", fontSize: '24px', color: 'white', position: "fixed", top: "1%", left: "3%" }} onClick={() => { document.getElementById("ctView").classList.remove("show"); setTimeout(function () { toggleContactView(false) }, 150); }}>
                  &#10005;
                </div>
                <br/>

                <div style={{display:"flex", width: "100%"}}>
                  <div style={{width:"60%"}}>
                    <span style={{fontSize: '26px', fontWeight:"700"}}>Hi, I'm Charles</span>
                    <p>Joined in 2020</p>
                  </div>
                  <div style={{width:"40%", marginBottom:"5%"}}>
                    <Image src="https://media-exp2.licdn.com/dms/image/C4D03AQGlMxrEKues9g/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=6wCiJIZ6fLzoIMPdo7s33G4bmcWEfpKzQhRfKbm6MvY" style={{ width: "100%", padding: "0px", borderRadius: "50%"}} />
                  </div>
                </div>
                

                {/* date => date < new Date().getTime() */}
                
                {/* <p>Here is when the room is available</p> */}

                <Calendar disableDates={date => date < new Date().getTime() || date > new Date('2020.02.17').getTime()} timezone="Pacific/Niue" /> {/* UTC or Pacific/Niue or Pacific/Guadalcanal*/}
                <br/>
                <div style={{width: "100%", textAlign:"center", marginTop:"10%"}}>
                  <span style={{ backgroundColor: "	#4E2A84", padding: "10px", color: "white", fontWeight: "bold", borderRadius: "3px"}}
                        onClick={() => {document.getElementById("ctExit").click(); document.getElementById("dtExit").click(); alert('Reservation Created');}}
                  >Make Reservation</span>
                </div>

              </Modal.Card.Body>
            </Modal.Card>
          </React.Fragment>
          : null}
      </Modal>
    </div>
  );
}



export default App;
