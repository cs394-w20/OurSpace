import React from "react";
import "./App.css";
import "rbx/index.css";

import parking from "./assets/local_parking-24px.svg";
import elevator from "./assets/elevator.svg";
// import ramp from "./assets/ramp.svg";

import { Card, Image, Column } from "rbx";

class Listing {

  constructor(nameStringin, picturein, street, city, state, country, zip, width, length, height, miscin, timein, lat, long, pricein,) {
    this.nameString = nameStringin;
    this.picture = picturein;
    this.location = {"street": street, "city": city, "state": state, "country": country, "zip": zip};
    this.latlong = {"lat": lat, "long": long};
    this.sizes = {"width": width, "length": length, "height": height};
    this.price = pricein;
    this.time = timein;
    this.misc = miscin;
  }
}

const TestData = [new Listing("Old Orchard Apt", "./assets/Images/apt.jpg", "10104 Old Orchard Ct", "Skokie", "IL", "USA", 60076, 10, 15, 6, new Date(2020, 5, 10, 12, 0, 0, 0), null),
new Listing("The Best Closet", "./assets/Images/closet.jpg", "160 Steeples Blvd", "Indianapolis", "IN", "USA", 46222, 2, 2, 8, new Date(2020, 1, 24, 6, 30, 0, 0), null),
  new Listing("Under The Sink", "./assets/Images/underthesink.jpg", "1600 Monticello Ave", "Norfolk", "VA", "USA", 23510, 4, 2, 2, new Date(2020, 2, 6, 15, 0, 0, 0), null),
  new Listing("Spare Bedroom", "./assets/Images/sparebedroom.jpg", "737 Colfax St", "Evanston", "IL", "USA", 60201, 10, 10, 10, new Date(2021, 11, 19, 20, 30, 0, 0), null),
  new Listing("Cellar", "./assets/Images/cellar.jpg", "4065 Dunbarton Cir", "San Ramon", "CA", "USA", 94583, 20, 10, 5, new Date(2020, 1, 1, 0, 0, 0, 0), null),
  new Listing("TOP QUALITY Cellar by BESTCELLARS", "./assets/Images/dingycellar.jpg", "3187 Reeves Dr", "Melvindale", "MI", "USA", 48122, 50, 50, 5, new Date(2019, 4, 5, 16, 8, 0, 0), null),
  new Listing("Storage Unit", "./assets/Images/storageunit.jpg", "2850 N Pulaski Rd", "Chicago", "IL", "USA", 60641, 8, 8, 10, new Date(2020, 1, 4, 0, 0, 0, 0), null),
  new Listing("Back Room", "./assets/Images/storeroom.jpg", "5023 Conrad St", "Skokie", "IL", "USA", 60077, 10, 10, 8, new Date(2020, 1, 15, 8, 30, 0, 0), null),
  new Listing("Miniature Storage", "./assets/Images/mousehole.jpg", "2145 Sheridan Rd", "Evanston", "IL", "USA", 60208, 1, 2, 1, new Date(2020, 1, 14, 12, 0, 0, 0), null)];

const JSONTestData = JSON.stringify(TestData);

function sizeCalculator(sizeObject) {

  var volume = sizeObject.length * sizeObject.width * sizeObject.height;
  console.log(volume);

  if(volume > 125) {
    if(volume > 1000) {
      return "Large";
    }

    return "Medium";
  }

  return "Small";
}
const JSONTestData = JSON.stringify(TestData);

function App() {
  return (
    <div className="App">
      <input></input>
      <ListingList/>
    </div>
  );
};

const StorageCard = ({listing}) => {
  return (
    <div style={{width:"90%", margin:"Auto", paddingTop: '20px'}}>
      <Card style={{borderRadius:"8px"}}>
      <Card.Image>
        <Image.Container size="4by3">
          <Image src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" style={{borderRadius:"8px"}}/>
        </Image.Container>
      </Card.Image>

      <Card.Content style={{padding:"10px"}}>
        <table style={{width:"100%"}}>
          <tr>
            <th style={{width:"60%"}}>
              <div style={{fontSize:'14px', textAlign:"left", fontWeight:"normal"}}>
                <span style={{textTransform:'uppercase', fontWeight:"500", border:"1px solid black", borderRadius:"4px", padding:'4px', paddingTop:'0px', paddingBottom:'0px'}}>{sizeCalculator(listing.sizes)}</span>
                <span style={{paddingLeft:"4px"}}>Entire Basement</span>


              </div>
            </th>
            <th style={{width:"40%", textAlign:"right", fontWeight:"normal", fontSize:"15px"}}>
                

                <div style={{display:'inline-block'}}>
                  <span style={{color:'red'}}>&#9733;</span>4.37
                  <span style={{fontSize:"13px", paddingLeft:"2px"}}>(32)</span>
                </div>
            </th>
          </tr>
        </table>

          <div style={{fontSize:'24px', textAlign:"left", width:"100%", lineHeight:'28px'}}>{listing.nameString}
          <div style={{display:'inline-block', float:"right", marginTop:'5px'}}>
            
            <img style={{height:'22px'}} src={elevator}/>
            <img style={{height:'22px'}} src={parking}/>
          </div>
          
          </div>
          

          <table style={{width:"100%", marginTop:'10px'}}>
          <tr>
            <th style={{width:"60%"}}>
              <div style={{fontSize:'20px', textAlign:"left", fontWeight:"normal"}}>
                <span style={{fontWeight:"bold"}}>$2</span>/night
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
  var PH_databaseFetch = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var Listings = JSON.parse(JSONTestData);
  var columnIds = [...Array(Listings.length).keys()]

  return (
    <Column.Group multiline>
      {columnIds.map(i => (
        <Column key={i} size="one-quarter">
          <StorageCard listing={Listings[i]}/>
        </Column>
      ))}
    </Column.Group>
  );
};

export default App;
