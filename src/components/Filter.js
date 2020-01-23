import React, { useState, useContext, useEffect } from "react";
import "rbx/index.css";
import { Button } from "rbx";

import { FilterContext } from "./Contexts.js"

// export class FilterForm extends React.Component {
//   constructor(props) {
//     super(props);
//     //The state we're expecting to see passed in is something like state={{listingList, updateList, filteredList, updateFList, currFilter, updateFilter, filterViewOpen, toggleFilterViewOpen}}
//     //props.listingList should access listingList, then, theoretically.

//     /* Commented out cuz irdk if this would work.
//     this.upstream.listingList = props.listingList;
//     this.upstream.updateList = props.updateList;
//     this.upstream.filteredList = props.filteredList;
//     this.upstream.updateFList = props.updateFList;
//     this.upstream.currFilter = props.currFilter;
//     this.upstream.updateFilter = props.updateFilter;
//     this.upstream.filterViewOpen = props.filterViewOpen;
//     this.upstream.toggleFilterViewOpen = props.toggleFilterViewOpen;
//     */
//     console.log(this.props.upstreamState);

//     this.upstreamState = this.props.upstreamState;
//     this.state = ({ size: this.upstreamState.currFilter.size, price: this.upstreamState.currFilter.price, rating: this.upstreamState.currFilter.rating, ramp: this.upstreamState.currFilter.ramp, elevator: this.upstreamState.currFilter.elevator, parking: this.upstreamState.currFilter.parking, lock: this.upstreamState.currFilter.lock, keywords: this.upstreamState.currFilter.keywords, availability: this.upstreamState.currFilter.availability, distance: this.upstreamState.currFilter.distance});

//     //filter format: 
//     //({ size: null, price: null, rating: null, amenities: null, keywords: null, availability: null, distance: null});

//     this.handleRating = this.handleRating.bind(this);
//     this.handleSize = this.handleSize.bind(this);
//     this.handleSizeButton = this.handleSizeButton.bind(this);
//     this.handleKeywords = this.handleKeywords.bind(this);
//     this.handlePrice = this.handlePrice.bind(this);
//     this.handleParking = this.handleParking.bind(this);
//     this.handleRamp = this.handleRamp.bind(this);
//     this.handleElevator = this.handleElevator.bind(this);
//     this.handleLock = this.handleLock.bind(this);
//     this.handleDistance = this.handleDistance.bind(this);
//     this.handleAvailability = this.handleAvailability.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }


//   handleSize(sizeIn) {
//   	this.setState({size: sizeIn.target.value})
//   }

//   handleSizeButton(sizeIn) {
//   	this.setState({size: sizeIn})
//   }

//   handleRating(ratingIn) {
//   	console.log(ratingIn);
//   	this.setState({rating: ratingIn.target.value})
//   }

//   handlePrice(priceIn) {
//   	this.setState({price: priceIn.target.value})
//   }

//   handleDistance(distanceIn) {
//   	this.setState({distance: distanceIn.target.value})
//   }

//   handleKeywords(keywordsIn) {
//   	this.setState({keywords: keywordsIn.target.value})
//   }

//   handleParking() {
//   	this.setState({parking: (!this.state.parking)})
//   }

//   handleRamp() {
//   	this.setState({ramp: (!this.state.ramp)})
//   }

//   handleElevator() {
//   	this.setState({elevator: (!this.state.elevator)})
//   }

//   handleLock() {
//   	this.setState({lock: (!this.state.lock)})
//   }

//   handleAvailability() {
//   	//TODO?
//   	return;
//   }

//   handleSubmit() {
//     console.log("filter form was submitted");
//     computeFilterList();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Keywords:
//           <input type="text" value={this.state.keywords} onChange={(e) => this.handleKeywords(e)} />
//         </label> <br />
//         <label>
//           Min. Rating:
//           <input type="number" value={this.state.rating} onChange={this.handleRating} />
//         </label> <br />
//         <label>
//           Max. Price:
//           <input type="number" value={this.state.price} onChange={this.handlePrice} />
//         </label> <br />
//         <label>
//           Max. Distance:
//           <input type="number" value={this.state.distance} onChange={this.handleDistance} />
//         </label> <br />
//         <label>
//           Amenities:
//           <Button active={(this.state.parking)} onClick={this.handleParking}>Parking</Button>
//           <Button active={(this.state.ramp)} onClick={this.handleRamp}>Ramp</Button>
//           <Button active={(this.state.elevator)} onClick={this.handleElevator}>Elevator</Button>
//           <Button active={(this.state.lock)} onClick={this.handleLock}>Lock</Button>
//         </label> <br />
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

export const FilterForm = (context) => {
  // const { listingList, updateList, filteredList, updateFList, currFilter, updateFilter, filterViewOpen, toggleFilterViewOpen } = useContext(FilterContext);

  return (
    <FilterContext.Consumer>
      {value =>
        <form>
        <label>
          Keywords:
        <input type="text" value={value.currFilter.keywords} />
        </label> <br />
        <label>
          Min. Rating:
        <input type="number" value={value.currFilter.rating} />
        </label> <br />
        <label>
          Max. Price:
        <input type="number" value={value.currFilter.price} />
        </label> <br />
        <label>
          Max. Distance:
        <input type="number" value={value.currFilter.distance} />
        </label> <br />
        <label>
          Amenities:
        <Button active={(value.currFilter.parking)} onClick={() => {var temp = value.currFilter;
                                                                    temp.parking = !temp.parking;
                                                                    value.updateFilter(temp)}}>Parking</Button>
          <Button active={(value.currFilter.ramp)} onClick={() => {var temp = value.currFilter;
                                                                    temp.ramp = !temp.ramp;
                                                                    value.updateFilter(temp)}}>Ramp</Button>
          <Button active={(value.currFilter.elevator)} onClick={() => {var temp = value.currFilter;
                                                                    temp.elevator = !temp.elevator;
                                                                    value.updateFilter(temp)}}>Elevator</Button>
          <Button active={(value.currFilter.lock)} onClick={() => {var temp = value.currFilter;
                                                                    temp.lock = !temp.lock;
                                                                    value.updateFilter(temp)}}>Lock</Button>
        </label> <br />
        <Button onClick={() => {value.toggleFilterViewOpen(); console.log("TODO: ADD CALLBACK FOR FILTER FORM SUBMISSION")}}>
            Submit
        </Button>
        </form>
      }      
    </FilterContext.Consumer>
  );
}



export function computeFilterList(filter, listingList) {
  return null;
}