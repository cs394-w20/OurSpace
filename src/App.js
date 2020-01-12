import React, { useState, useContext } from "react";
import "./App.css";
import "rbx/index.css";

import clearX from "./assets/clear-24px.svg"
import parking from "./assets/local_parking-24px.svg";
import elevator from "./assets/elevator.svg";
// import ramp from "./assets/ramp.svg";

import { Card, Image, Column, Button, Media, Title, Modal, Delete, Content } from "rbx";

class Location {
  constructor(street, city, state, country, zip, geodata) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zip = zip;
    this.geodata = geodata;
  }
}

class Geodata {
  constructor(type, coordinates) {
    this.type = type;
    this.coordinates = coordinates;
  }
}

class Coordinates {
  constructor(latitude, longitude) {
    this.latitide = latitude;
    this.longitude = longitude;
  }
}

class Size {
  constructor(length, width, height) {
    this.length = length;
    this.width = width;
    this.height = height;
  }
}

class Attributes {
  constructor(hasLock, hasElevator, hasRamp) {
    this.hasLock = hasLock;
    this.hasElevator = hasElevator;
    this.hasRamp = hasRamp;
  }
}

class Listing {

  constructor(nameString, location, size, time, attributes, image, price) {
    this.nameString = nameString;
    this.location = location;
    this.size = size;
    this.time = time;
    this.attributes = attributes;
    this.image = image;
    this.price = price;
  }
}

const TestData = [new Listing("Old Orchard Apt", new Location("10104 Old Orchard Ct", "Skokie", "IL", "USA", 60076, new Geodata("point", new Coordinates(42.063752, -87.744318))), new Size(10, 15, 6), new Date(2020, 5, 10, 12, 0, 0, 0), new Attributes(false, false, false), "./assets/Images/apt.jpg", 5.00),
  new Listing("The Best Closet", new Location("160 Steeples Blvd", "Indianapolis", "IN", "USA", 46222, new Geodata("point", new Coordinates(39.767587, -86.212728))), new Size(2, 2, 8), new Date(2020, 1, 24, 6, 30, 0, 0), new Attributes(false, false, false), "./assets/Images/closet.jpg", 10.50),
  new Listing("Under The Sink", new Location("1600 Monticello Ave", "Norfolk", "VA", "USA", 23510, new Geodata("point", new Coordinates(36.864039, -76.285274))), new Size(4, 2, 2), new Date(2020, 2, 6, 15, 0, 0, 0), new Attributes(false, false, false), "./assets/Images/underthesink.jpg", 20.75),
  new Listing("Spare Bedroom", new Location("737 Colfax St", "Evanston", "IL", "USA", 60201, new Geodata("point", new Coordinates(42.060989, -87.681330))), new Size(10, 10, 10), new Date(2021, 11, 19, 20, 30, 0, 0), new Attributes(false, false, false), "./assets/Images/sparebedroom.jpg", 7.50),
  new Listing("Cellar", new Location("4065 Dunbarton Cir", "San Ramon", "CA", "USA", 94583, new Geodata("point", new Coordinates(37.757932, -121.952262))), new Size(20, 10, 5), new Date(2020, 1, 1, 0, 0, 0, 0), new Attributes(false, false, false), "./assets/Images/cellar.jpg", 10.00),
  new Listing("TOP QUALITY Cellar by BESTCELLARS", new Location("3187 Reeves Dr", "Melvindale", "MI", "USA", 48122, new Geodata("point", new Coordinates(42.288179, -83.173806))), new Size(50, 50, 5), new Date(2019, 4, 5, 16, 8, 0, 0), new Attributes(false, false, false), "./assets/Images/dingycellar.jpg", 55.99),
  new Listing("Storage Unit", new Location("2850 N Pulaski Rd", "Chicago", "IL", "USA", 60641, new Geodata("point", new Coordinates(41.933241, -87.727606))), new Size(8, 8, 10), new Date(2020, 1, 4, 0, 0, 0, 0), new Attributes(false, false, false), "./assets/Images/storageunit.jpg", 5.00),
  new Listing("Back Room", new Location("5023 Conrad St", "Skokie", "IL", "USA", 60077, new Geodata("point", new Coordinates(42.037937, -87.752990))), new Size(10, 10, 8), new Date(2020, 1, 15, 8, 30, 0, 0), new Attributes(false, false, false), "./assets/Images/storeroom.jpg", 2.00),
  new Listing("Miniature Storage", new Location("2145 Sheridan Rd", "Evanston", "IL", "USA", 60208, new Geodata("point", new Coordinates(42.058053, -87.676167))), new Size(1, 2, 1), new Date(2020, 1, 14, 12, 0, 0, 0), new Attributes(false, false, false), "./assets/Images/mousehole.jpg", 0.50)];

const JSONTestData = JSON.stringify(TestData);

const ListingContext = React.createContext();

function sizeCalculator(sizeObject) {
 
  var volume = sizeObject.length * sizeObject.width * sizeObject.height;
  // console.log(volume);
 
  if(volume > 125) {
    if(volume > 1000) {
      return "Large";
    }
 
    return "Medium";
  }
 
  return "Small";
}

function App() {

  const [currListing, updateCurrListing] = useState(null);
  function updateListing(newListing) {
    updateCurrListing(newListing);
  }

  return (
    <ListingContext.Provider value={{currListing, updateListing}}>
      <div className="App" width="100%" height="100%" opacity="0.99">
        <input z-index="0"></input>
        <DetailView/>
        <ListingList/>
      </div>
    </ListingContext.Provider>
  );
};

const DetailView = () => {
  const { currListing, updateListing } = useContext(ListingContext);

  return (
    <div style={{width: "100%", height: "100%", margin: 0}}>
      <Modal active={currListing != null} closeOnBlur={true} style={{width: "100%", height: "100%", margin: 0}}>
        <Modal.Background style={{height:"100%", margin:"0px", padding:"0px"}}></Modal.Background>


        
        <Modal.Card style={{width:"100%", height:"95%", marginTop:"-18%"}}>
          <Modal.Card.Body style={{width:"100%", padding: "0px", margin:"0px"}}>

            {/* Top exit icon */}
            <div style={{fontSize:'24px', color:'white', position:"fixed", top:"1%", left:"3%"}} onClick={() => updateListing(null)}>
              &#10005;
            </div>
            <Image src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" style={{width:"100%", padding:"0px"}}/>
            

            {/* bottom bar */}
            <div style={{height:"8%", backgroundColor:'white', position:"fixed", bottom:"0", width:"100%", boxShadow:"0px -1px #888888"}}>
              
            <table style={{width:"100%"}}>
                <th style={{width:"58%"}}>
                  <div style={{fontSize:'14px', textAlign:"left", fontWeight:"normal", margin:"4% 6%"}}>
                    
                    <span style={{fontSize:"18px", fontWeight:"bold"}}>${currListing ? currListing.price : ""}</span> / NIGHT <br></br>
                    <div style={{display:'inline-block'}}>
                      <span style={{color:'green'}}>&#9733; 4.37</span>
                      <span style={{fontSize:"13px", paddingLeft:"2px"}}>(32)</span>
                    </div>



                  </div>
                </th>
                <th style={{width:"42%", textAlign:"left", fontWeight:"normal", fontSize:"15px", padding:"6% 0"}}>
                    <span style={{backgroundColor:"	#4E2A84", padding:"10px", color:"white", fontWeight:"bold", borderRadius:"3px"}}>Check availability</span>
                </th>
            </table>

            </div>


            {/* Content */}
            <Content style={{width:"94%", margin:"auto"}}>
              <Title>{currListing ? currListing.nameString : ""}</Title>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                accumsan, metus ultrices eleifend gravida, nulla nunc varius
                lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper
                dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis
                neque.
              </p>
              <Title as="h2">Second level</Title>
              <p>
                Curabitur accumsan turpis pharetra{' '}
                <strong>augue tincidunt</strong> blandit. Quisque condimentum
                maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna
                vel cursus venenatis. Suspendisse potenti. Etiam mattis sem
                rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et
                neque nisl.
              </p>

              <Title as="h2">Second level</Title>
              <p>
                Curabitur accumsan turpis pharetra{' '}
                <strong>augue tincidunt</strong> blandit. Quisque condimentum
                maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna
                vel cursus venenatis. Suspendisse potenti. Etiam mattis sem
                rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et
                neque nisl.
              </p>

              <Title as="h2">Second level</Title>
              <p>
                Curabitur accumsan turpis pharetra{' '}
                <strong>augue tincidunt</strong> blandit. Quisque condimentum
                maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna
                vel cursus venenatis. Suspendisse potenti. Etiam mattis sem
                rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et
                neque nisl.
              </p>
            </Content>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </div>
  );
};

function collapseDetailView() {
  
}

const StorageCard = ({listing}) => {
  const { currListing, updateListing } = useContext(ListingContext);
  
  return (
    <div style={{width:"90%", margin:"Auto", paddingTop: '20px'}} onClick={() => updateListing(listing)}>
      <Card style={{borderRadius:"8px"}}>
      <Card.Image>
        <Image.Container size="4by3">
          <Image src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" style={{borderRadius:"8px"}}/>
        </Image.Container>
      </Card.Image>

      <Card.Content style={{padding:"10px"}}>
        <table style={{width:"100%"}}>
            <th style={{width:"60%"}}>
              <div style={{fontSize:'14px', textAlign:"left", fontWeight:"normal"}}>
                <span style={{textTransform:'uppercase', fontWeight:"500", border:"1px solid black", borderRadius:"4px", padding:'4px', paddingTop:'0px', paddingBottom:'0px'}}>{sizeCalculator(listing.size)}</span>
                <span style={{paddingLeft:"4px"}}>Entire Basement</span>
              </div>
            </th>
            <th style={{width:"40%", textAlign:"right", fontWeight:"normal", fontSize:"15px"}}>
                

                <div style={{display:'inline-block'}}>
                  <span style={{color:'red'}}>&#9733;</span>4.37
                  <span style={{fontSize:"13px", paddingLeft:"2px"}}>(32)</span>
                </div>
            </th>
        </table>

          <div style={{fontSize:'24px', textAlign:"left", width:"100%", lineHeight:'30px'}}>{listing.nameString}
          <div style={{display:'inline-block', float:"right", marginTop:'5px'}}>
            
            <img style={{height:'22px'}} src={elevator}/>
            <img style={{height:'22px'}} src={parking}/>
          </div>
          
          </div>
          

          <table style={{width:"100%", marginTop:'10px'}}>
          <tr>
            <th style={{width:"60%"}}>
              <div style={{fontSize:'20px', textAlign:"left", fontWeight:"normal"}}>
                <span style={{fontWeight:"bold"}}>${listing.price}</span>/night
              </div>
            </th>
            <th style={{width:"40%", textAlign:"right", fontWeight:"normal", fontSize:"15px"}}>
              <div style={{fontSize:'16px', textAlign:"right", float:"right", fontWeight:"normal"}}>5 miles away</div>
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
  var Listings = JSON.parse(JSONTestData);
  var columnIds = [...Array(Listings.length).keys()];

  return (
    <div z-index="0" position="relative">
      <Column.Group multiline> 
        {columnIds.map(i => (
          <Column key={i} size="one-quarter">
            <StorageCard listing={Listings[i]}/>
          </Column>
        ))}
      </Column.Group>
    </div>
  );
};

export default App;
