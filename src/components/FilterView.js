import React, { useContext, useState } from "react";

import { FilterContext } from "./Contexts.js"

import { Title, Modal, Content, Button, Input } from "rbx";

import parking from "../assets/icons/local_parking-24px.svg";
import elevator from "../assets/icons/elevator.svg";
import ramp from "../assets/icons/handicapped.png";
import lock from "../assets/icons/lock.png";

const FilterView = () => {

  const defaultFilter = { minDistance: 0, maxDistance: 2147483646, minSize: 0, maxSize: 2147483646, minPrice: 0, maxPrice: 2147483646, minRating: 0, maxRating: 2147483646, filterParking: false, filterRamp: false, filterElevator: false, filterLock: false };

  const { currFilter, updateFilter, filterViewOpen, toggleFilterViewOpen } = useContext(FilterContext);

  const [maybeFilter, setMaybeFilter] = useState(currFilter)

  return (
    <div>
      <Modal id="filterView" active={filterViewOpen}>
        <React.Fragment>
          <Modal.Background style={{ height: "100%", margin: "0%", backgroundColor: "rgba(0, 0, 0, .2)" }}></Modal.Background>

          <Modal.Card style={{ width: "100%", height: "100%", bottom: "-3.5%", borderRadius: "10px", borderColor: "black" }}>
            <Modal.Card.Body>
              <div style={{ fontSize: '24px', color: 'white', position: "fixed", top: "1%", left: "3%" }} onClick={() => { updateFilter(maybeFilter); document.getElementById("filterView").classList.remove("show"); setTimeout(function () { toggleFilterViewOpen(false) }, 200); }}>
                &#10005;
              </div>
              <Content style={{ width: "94%", margin: "auto", paddingTop: "1%", paddingBottom: "2%" }}>
                <Title>Filter</Title>
                <div style={{ width: "100%" }}>

                  <span style={{fontWeight:"400"}}>Filter by Distance (mi)</span>
                  <br />

                  <Input rounded style={{ width: "48%", marginRight: "2%" }} placeholder="Min" onChange={(e) => { setMaybeFilter({ ...maybeFilter, minDistance: parseInt(e.target.value) }); }}></Input>
                  <Input rounded style={{ width: "48%", marginRight: "2%" }} placeholder="Max" onChange={(e) => { setMaybeFilter({ ...maybeFilter, maxDistance: parseInt(e.target.value) }); }}></Input>
                  <br /> <br />

                  <span style={{fontWeight:"400"}}>Filter by Size</span>
                  <br />

                  <Button.Group hasAddons>
                    <div style={{height:"30px"}}>
                      <Button style={{ width: "33%", border:"none"}} onClick={() => setMaybeFilter({... maybeFilter, maxSize: 125, minSize: 0})} >
                        <span id="smallButton" style={{ fontWeight: "500", border: "1px solid black", borderRadius: "4px", padding: '6px', paddingTop: '3px', paddingBottom: '2px'}}
                        onClick={() => {document.getElementById('smallButton').style.cssText = 'background-color: #041635; color: white; font-weight: 500; border: 1px solid black; border-radius: 4px; padding: 6px; padding-top:4px; padding-bottom:4px';}}>SMALL</span>
                      </Button>
                      <Button style={{ width: "33%", border:"none"}} onClick={() => setMaybeFilter({... maybeFilter, minSize: 126, maxSize: 1000})}>
                      <span id="mediumButton" style={{ fontWeight: "500", border: "1px solid black", borderRadius: "4px", padding: '6px', paddingTop: '3px', paddingBottom: '2px' }}
                      onClick={() => {document.getElementById('mediumButton').style.cssText = 'background-color: #041635; color: white; font-weight: 500; border: 1px solid black; border-radius: 4px; padding: 6px; padding-top:4px; padding-bottom:4px';}}>MEDIUM</span>
                      </Button>
                      <Button style={{ width: "33%", border:"none" }} onClick={() => setMaybeFilter({... maybeFilter, minSize: 1001, maxSize: 2147483646})}>
                      <span id="largeButton" style={{ fontWeight: "500", border: "1px solid black", borderRadius: "4px", padding: '6px', paddingTop: '3px', paddingBottom: '2px' }}
                        onClick={() => {document.getElementById('largeButton').style.cssText = 'background-color: #041635; color: white; font-weight: 500; border: 1px solid black; border-radius: 4px; padding: 6px; padding-top:4px; padding-bottom:4px';}}>LARGE</span>
                      </Button>
                    </div>
                  </Button.Group>

                  <span style={{fontWeight:"400"}}>Filter by Price</span>
                  <br />

                  <Input rounded style={{ width: "48%", marginRight: "2%" }} placeholder="Min ($USD)" onChange={(e) => { setMaybeFilter({ ...maybeFilter, minPrice: parseInt(e.target.value) }); }}></Input>
                  <Input rounded style={{ width: "48%", marginRight: "2%" }} placeholder="Max ($USD)" onChange={(e) => { setMaybeFilter({ ...maybeFilter, maxPrice: parseInt(e.target.value) }); }}></Input>
                  <br /> <br />

                  <span style={{fontWeight:"400"}}>Filter by Rating</span>
                  <br />

                  <Input rounded style={{ width: "48%", marginRight: "2%" }} placeholder="Min (&#9733;)" onChange={(e) => { setMaybeFilter({ ...maybeFilter, minRating: parseInt(e.target.value) }); }}></Input>
                  <Input rounded style={{ width: "48%", marginRight: "2%" }} placeholder="Max (&#9733;)" onChange={(e) => { setMaybeFilter({ ...maybeFilter, maxRating: parseInt(e.target.value) }); }}></Input>
                  <br /> <br />

                  <span style={{fontWeight:"400"}}>Filter by Amenities</span>
                  <br />

                  <Button.Group hasAddons>
                    <Button rounded color={maybeFilter.filterParking ? "info" : "white"} style={{ width: "25%" }} onClick={() => { setMaybeFilter({ ...maybeFilter, filterParking: !maybeFilter.filterParking }); }}>
                      <img src={parking} style={{ width: "40%" }}></img>
                    </Button>
                    <Button rounded color={maybeFilter.filterRamp ? "info" : "white"} style={{ width: "25%" }} onClick={() => { setMaybeFilter({ ...maybeFilter, filterRamp: !maybeFilter.filterRamp }); }}>
                      <img src={ramp} style={{ width: "40%" }}></img>
                    </Button>
                    <Button rounded color={maybeFilter.filterElevator ? "info" : "white"} style={{ width: "25%" }} onClick={() => { setMaybeFilter({ ...maybeFilter, filterElevator: !maybeFilter.filterElevator }); }}>
                      <img src={elevator} style={{ width: "30%" }}></img>
                    </Button>
                    <Button rounded color={maybeFilter.filterLock ? "info" : "white"} style={{ width: "25%" }} onClick={() => { setMaybeFilter({ ...maybeFilter, filerLock: !maybeFilter.filterLock }); }}>
                      <img src={lock} style={{ width: "40%" }}></img>
                    </Button>
                  </Button.Group>

                  <br /> <br />

                  <Button rounded style={{ width: "36%", marginLeft:"32%", marginRight:"32%"}}
                    onClick={() => { updateFilter(maybeFilter); document.getElementById("filterView").classList.remove("show"); setTimeout(function () { toggleFilterViewOpen(false) }, 200); }}>
                    See Results
                  </Button>
                </div>
              </Content>
            </Modal.Card.Body>
          </Modal.Card>

        </React.Fragment>
      </Modal>
    </div>
  );
};

export default FilterView;