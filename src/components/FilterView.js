import React, { useContext } from "react";

import { FilterContext } from "./Contexts.js"

import { Title, Modal, Content, Button } from "rbx";

const FilterView = () => {

  const { currFilter, updateFilter, filterViewOpen, toggleFilterViewOpen } = useContext(FilterContext);

  return (
    <div style={{ width: "100%", height: "100%", margin: 0 }}>
      <Modal id="filterView" active={filterViewOpen}>
        <React.Fragment>
          <Modal.Background style={{ height: "100%", margin: "0px" }}></Modal.Background>

          <Modal.Card style={{ width: "100%", height: "100%" }}>
            <Modal.Card.Body style={{ width: "100%", padding: "0px", margin: "0px" }}>
              <div style={{ fontSize: '24px', color: 'white', position: "fixed", top: "1%", left: "3%" }} onClick={() => { document.getElementById("filterView").classList.remove("show"); setTimeout(function () { toggleFilterViewOpen(false) }, 200); }}>
                &#10005;
              </div>
              <Content style={{ width: "94%", margin: "auto", paddingTop: "1%", paddingBottom: "2%" }}>
                <Title>Filter</Title>
                <div>
                  <label>
                    Keywords:
                  <input type="text" value={currFilter.keywords} onChange={(e) => updateFilter({ ...currFilter, "keywords": e.target.value })} />
                  </label> <br />
                  <label>
                    Min. Rating:
                  <input type="number" value={currFilter.rating} onChange={(e) => updateFilter({ ...currFilter, "rating": e.target.value })} />
                  </label> <br />
                  <label>
                    Max. Price:
                  <input type="number" value={currFilter.price} onChange={(e) => updateFilter({ ...currFilter, "price": e.target.value })} />
                  </label> <br />
                  <label>
                    Max. Distance:
                  <input type="number" value={currFilter.distance} onChange={(e) => updateFilter({ ...currFilter, "distance": e.target.value })} />
                  </label> <br />
                  <label>
                    Amenities:
                    <Button active={(currFilter.parking)} onClick={() => updateFilter({ ...currFilter, "parking": !currFilter.parking })}>Parking</Button>
                    <Button active={(currFilter.ramp)} onClick={() => updateFilter({ ...currFilter, "ramp": !currFilter.ramp })}>Ramp</Button>
                    <Button active={(currFilter.elevator)} onClick={() => updateFilter({ ...currFilter, "elevator": !currFilter.elevator })}>Elevator</Button>
                    <Button active={(currFilter.lock)} onClick={() => updateFilter({ ...currFilter, "lock": !currFilter.lock })}>Lock</Button>
                  </label> <br />
                  <Button onClick={() => { document.getElementById("filterView").classList.remove("show"); setTimeout(function () { toggleFilterViewOpen(false) }, 200); console.log("TODO: ADD CALLBACK FOR FILTER FORM SUBMISSION") }}>
                    Submit
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