import React, { useContext, useState } from "react";

import { AddListingContext } from "./Contexts.js"

import { Title, Modal, Content, Button, Input } from "rbx";
import FileBase64 from 'react-file-base64';

import parking from "../assets/icons/local_parking-24px.svg";
import elevator from "../assets/icons/elevator.svg";
import ramp from "../assets/icons/handicapped.png";
import lock from "../assets/icons/lock.png";

//https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129
//When implementing image upload: update "defaultWipListing" in this file and the "useState" declaration of currWipAddListing in the app.js file with the new image fields

const AddListingView = () => {

  const defaultWipListing = { name: null, description: null, street: null, city: null, state: null, country: null, zip: null, geodataType: "Point", latitude: 42.048470, longitude: -87.684790, length: null, width: null, height: null, fromDay: null, fromTime: null, untilDay: null, untilTime: null, hasLock: false, hasParking: false, hasElevator: false, hasRamp: false, image: null, price: null, score: null, numRatings: null};
  const [binaryImage, setBinaryImage] = useState("");
  const { currWipAddListing, updateCurrWipAddListing, addListingViewOpen, toggleAddListingViewOpen, updateAll } = useContext(AddListingContext);

  const [wipAddListing, setWipAddListing] = useState(currWipAddListing)

  

  const getFile = file => {
    setBinaryImage(file.base64);
  };

  return (
    <div>
      <Modal id="addListingView" active={addListingViewOpen}>
        <React.Fragment>
          <Modal.Background style={{ height: "100%", margin: "0%", backgroundColor: "rgba(0, 0, 0, .2)" }}></Modal.Background>

          <Modal.Card style={{ width: "100%", height: "100%", bottom: "-3.5%", borderRadius: "10px", borderColor: "black" }}>
            <Modal.Card.Body>
              <div style={{ fontSize: '24px', color: 'black', position: "fixed", top: "1%", left: "3%" }} onClick={() => { updateCurrWipAddListing(wipAddListing); document.getElementById("addListingView").classList.remove("show"); setTimeout(function () { toggleAddListingViewOpen(false) }, 200); }}>
                &#10005;
              </div> 
              <Content style={{ width: "94%", margin: "auto", paddingTop: "1%", paddingBottom: "2%" }}>
                <Title>Add Listing</Title>
                <div style={{ width: "100%" }}>

                  <Input rounded style={{ width: "94%", marginRight: "2%" }} placeholder="Name of Listing" onChange={(e) => { setWipAddListing({ ...wipAddListing, name: e.target.value }); }}></Input>
                  <br /> <br />

                  <Input rounded style={{ width: "94%", marginRight: "2%" }} placeholder="Description (3-5 sentences)" onChange={(e) => { setWipAddListing({ ...wipAddListing, description: e.target.value }); }}></Input>
                  <br /> <br />

                  <Input rounded style={{ width: "94%", marginRight: "2%" }} placeholder="Street" onChange={(e) => { setWipAddListing({ ...wipAddListing, street: e.target.value }); }}></Input>
                  <br /> <br />

                  <Input rounded style={{ width: "94%", marginRight: "2%" }} placeholder="City" onChange={(e) => { setWipAddListing({ ...wipAddListing, city: e.target.value }); }}></Input>
                  <br /> <br />

                  <Input rounded style={{ width: "94%", marginRight: "2%" }} placeholder="State" onChange={(e) => { setWipAddListing({ ...wipAddListing, state: e.target.value }); }}></Input>
                  <br /> <br />

                  <Input rounded style={{ width: "94%", marginRight: "2%" }} placeholder="Country" onChange={(e) => { setWipAddListing({ ...wipAddListing, country: e.target.value }); }}></Input>
                  <br /> <br />

                  <Input rounded style={{ width: "94%", marginRight: "2%" }} placeholder="Zipcode" onChange={(e) => { setWipAddListing({ ...wipAddListing, zip: e.target.value }); }}></Input>
                  <br /> <br />

                  Size of Space (ft)
                  <br></br>
                  <br></br>

                  <Input rounded style={{ width: "30%", marginRight: "2%" }} placeholder="Width" onChange={(e) => { setWipAddListing({ ...wipAddListing, width: e.target.value }); }}></Input>
                  <Input rounded style={{ width: "30%", marginRight: "2%" }} placeholder="Length" onChange={(e) => { setWipAddListing({ ...wipAddListing, length: e.target.value }); }}></Input>
                  <Input rounded style={{ width: "30%", marginRight: "2%" }} placeholder="Height" onChange={(e) => { setWipAddListing({ ...wipAddListing, height: e.target.value }); }}></Input>
                  <br /> <br />

                  <label for="from" style={{ width: "48%", marginRight: "2%" }}>Available from:</label>
                  <br /> <br />
                  <Input type="date" id="from" rounded style={{ width: "48%", marginRight: "2%" }} onChange={(e) => { setWipAddListing({ ...wipAddListing, fromDay: e.target.value }); }}></Input>
                  <br /> <br />

                  <label for="until" style={{ width: "48%", marginRight: "2%" }}>Available until:</label>
                  <br /> <br />
                  <Input type="date" id="until" rounded style={{ width: "48%", marginRight: "2%" }} onChange={(e) => { setWipAddListing({ ...wipAddListing, untilDay: e.target.value }); }}></Input>
                  <br /> <br />

                  Displayed Price
                  <br></br><br></br>

                  <Input rounded style={{ width: "94%", marginRight: "2%" }} placeholder="Price per day" onChange={(e) => { setWipAddListing({ ...wipAddListing, price: e.target.value }); }}></Input>
                  <br /> <br />

                  <FileBase64 multiple={false} onDone={getFile.bind(this)}/>

                  <Button.Group hasAddons>
                    <Button rounded color={wipAddListing.hasParking ? "info" : "white"} style={{ width: "25%" }} onClick={() => { setWipAddListing({ ...wipAddListing, hasParking: !wipAddListing.hasParking }); }}>
                      <img src={parking} style={{ width: "40%" }}></img>
                    </Button>
                    <Button rounded color={wipAddListing.hasRamp ? "info" : "white"} style={{ width: "25%" }} onClick={() => { setWipAddListing({ ...wipAddListing, hasRamp: !wipAddListing.hasRamp }); }}>
                      <img src={ramp} style={{ width: "40%" }}></img>
                    </Button>
                    <Button rounded color={wipAddListing.hasElevator ? "info" : "white"} style={{ width: "25%" }} onClick={() => { setWipAddListing({ ...wipAddListing, hasElevator: !wipAddListing.hasElevator }); }}>
                      <img src={elevator} style={{ width: "30%" }}></img>
                    </Button>
                    <Button rounded color={wipAddListing.hasLock ? "info" : "white"} style={{ width: "25%" }} onClick={() => { setWipAddListing({ ...wipAddListing, hasLock: !wipAddListing.hasLock }); }}>
                      <img src={lock} style={{ width: "40%" }}></img>
                    </Button>
                  </Button.Group>

                  <br /> <br />

                  <Button rounded style={{ width: "70%", marginLeft:"15%", marginRight:"auto"}}
                    onClick={() => {if(wellFormedObject(wipAddListing)) {
                        wipAddListing.image = binaryImage;
                        updateAll(buildListingObject(wipAddListing));
                        updateCurrWipAddListing(defaultWipListing);
                        document.getElementById("addListingView").classList.remove("show");
                        setTimeout(function () { toggleAddListingViewOpen(false) }, 200); 
                      }
                      else {
                        //we really do not want malformed listings.
                        window.alert("Some required fields were not filled out."); 
                      }
                    }}>
                    <div>
                      Submit for Review
                    </div>
                  </Button>
                  <br></br> <br></br>
                </div>
              </Content>
            </Modal.Card.Body>
          </Modal.Card>

        </React.Fragment>
      </Modal>
    </div>
  );
};

function wellFormedObject (wipListingObject) {
  //const defaultWipListing = { name: null, description: null, street: null, city: null, state: null, country: null, zip: null, geodataType: "Point", latitude: null, longitude: null, length: null, width: null, height: null, from: null, until: null, hasLock: false, hasParking: false, hasElevator: false, hasRamp: false, image: null, price: null, score: null, numRatings: null};
  if(wipListingObject.name === null)
    return false;
  if(wipListingObject.description === null)
    return false;
  if(wipListingObject.street === null) //might elaborate on this
    return false;
  if(wipListingObject.city === null)
    return false;
  if(wipListingObject.country === null)
    return false;
  if(wipListingObject.zip === null)
    return false;
  if(wipListingObject.fromDay === null)
    return false;
  if(wipListingObject.untilDay === null)
    return false;
  if(wipListingObject.fromTime === null)
    return false;
  if(wipListingObject.untilTime === null)
    return false;
  if(wipListingObject.width === null)
    return false;
  if(wipListingObject.length === null)
    return false;
  if(wipListingObject.height === null)
    return false;
  if(wipListingObject.price === null)
    return false;
  return true;
}



function buildListingObject(wipListingObject) {
  //as-is, note that this just outright discards some stuff, like the "from when" data
  var untilDate = new Date(wipListingObject.untilDate);
  var outListingObject = {name: wipListingObject.name, host: "Charles Son", description: wipListingObject.description, location: {street: wipListingObject.street, city: wipListingObject.city, state: wipListingObject.state, country: wipListingObject.country, zip: parseInt(wipListingObject.zip), geodata: {type: "Point", coordinates: {longitude: parseFloat(wipListingObject.longitude), latitude: parseFloat(wipListingObject.latitude)}}}, size: {length: parseInt(wipListingObject.length), width: parseInt(wipListingObject.width), height: parseInt(wipListingObject.height)}, time: untilDate, attributes: {hasLock: wipListingObject.hasLock, hasParking: wipListingObject.hasParking, hasElevator: wipListingObject.hasElevator, hasRamp: wipListingObject.hasRamp}, image: wipListingObject.image, price: parseFloat(wipListingObject.price), rating: {score: 5, numRatings: 1}};
  return outListingObject;
}
export default AddListingView;