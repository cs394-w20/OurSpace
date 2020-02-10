import React, { useState, useEffect, useContext } from "react";

import "./App.css";
import "rbx/index.css";
import "./assets/styles/views.css"
import "./assets/styles/calendar.css";
import "./assets/styles/loading.css";

import filter from "./assets/icons/filter.png";
import add from "./assets/icons/OurSpace.png";
import logoimage from "./assets/icons/logo.png"

import { Button, PageLoader, Column, Icon } from "rbx";
import FileBase64 from 'react-file-base64';

import ListingList from "./components/Listing.js"
import DetailView from "./components/DetailView.js";
import FilterView from "./components/FilterView.js";
import AddListingView from "./components/AddListingView.js";
import ContactView from "./components/ContactView.js"

import { ListingContext, FilterContext, AddListingContext, BookingContext } from "./components/Contexts.js";

const App = () => {

  const [currListing, updateCurrListing] = useState(null);
  const [listingList, updateList] = useState([]);
  
  const [currFilter, updateFilter] = useState({ minDistance: 0, maxDistance: 2147483646, minSize: 0, maxSize: 2147483646, minPrice: 0, maxPrice: 2147483646, minRating: 0, maxRating: 2147483646, filterParking: false, filterRamp: false, filterElevator: false, filterLock: false });  
  const [contactViewOpen, toggleContactView] = useState(false);
  const [filterViewOpen, toggleFilterViewOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const [currWipAddListing, updateCurrWipAddListing] = useState({ name: null, description: null, street: null, city: null, state: null, country: null, zip: null, geodataType: "Point", latitude: null, longitude: null, length: null, width: null, height: null, from: null, until: null, hasLock: false, hasParking: false, hasElevator: false, hasRamp: false, image: null, price: null, score: null, numRatings: null});
  const [addListingViewOpen, toggleAddListingViewOpen] = useState(false);

  const [listPerPage, setListPerPage] = useState(10);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    function getListingsData() {
      fetch('https://rocky-savannah-43190.herokuapp.com/get_listings', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude: 42.055984, longitude: -87.675171, listingsPerPage: listPerPage, pageNumber: pageNum, ...currFilter })
      })
        .then(response => response.json())
        .then(response => {
          updateList(response.listings);
        });
    }
    getListingsData();
  }, [currFilter]);

  const updateAll = (newListing) => {
  	/*
        BACKEND: ADD CODE HERE TO SET UP PUSHING NEW LISTINGS TO REMOTE DB
    */
    updateList([newListing].concat(listingList))
  }


  return (
    <React.Fragment>
      <LogoPage></LogoPage>
    <ListingContext.Provider value={{ currListing, updateCurrListing, listingList, updateAll, contactViewOpen, toggleContactView }}>
      <div className="App" width="100%" height="100%" opacity="0.99">
        <div style={{height:"130px"}}></div> {/* Padding Don't Delete */}
        <ListingList />
        <BookingContext.Provider value={{ startDate, setStartDate, endDate, setEndDate }}>
          <DetailView />
        </BookingContext.Provider>
        <ContactView />
        <AddListingContext.Provider value={{ currWipAddListing, updateCurrWipAddListing, addListingViewOpen, toggleAddListingViewOpen, updateAll }}>
          <AddListingView/>
          <FilterContext.Provider value={{ currFilter, updateFilter, filterViewOpen, toggleFilterViewOpen }}>
            <FilterView/>
            {/* <BottomBar></BottomBar> */}
            <AddListingButton></AddListingButton>
            <TopSearch></TopSearch>
          </FilterContext.Provider>
        </AddListingContext.Provider>
      </div>
    </ListingContext.Provider>
    </React.Fragment>
  );
};


const LogoPage = () => {
  return (
    <React.Fragment>
      <div id="foo" style={{position:"absolute", zIndex:"2"}} onLoad={() => {
          setTimeout(function () {document.getElementById('foo').style.display='none'}, 1300)}}>
        <div style={{width:"388px", height:"260px", backgroundColor:"#041635", marginBottom:"-10px"}}></div>
        <img src={logoimage} style={{width:"388px"}}></img>
        <div class="loading">Loading&#8230;</div>
        <div style={{width:"388px", height:"315px", backgroundColor:"#041635", marginTop:"-10px"}}></div>
      </div>
    </React.Fragment>
  )
}

const TopSearch = () => {
  const { toggleFilterViewOpen } = useContext(FilterContext);
  const { toggleAddListingViewOpen } = useContext(AddListingContext)

  return (
    <div style={{height: "10px", width: "100%", border:"10px", position: "fixed", top: "5vh"}}>
      <input placeholder="Anywhere" style={{width:"80%", height: "50px", border:"1px solid #888888", marginTop:"-10px", borderRadius:"5px"}}></input>
      <Button style={{width:"80px", height:"40px", borderRadius:"20px", marginTop:"10px"}} onClick={() => {
        toggleFilterViewOpen(true); setTimeout(function () { document.getElementById("filterView").classList.add("show") }, 0);
      }}> Filters
      </Button>
    </div>
  )
}

const AddListingButton = () => {
  const { toggleFilterViewOpen } = useContext(FilterContext);
  const { toggleAddListingViewOpen } = useContext(AddListingContext)

  return (
    <div style={{position:"fixed" , top:"750px", left:"300px", opacity:"0.8"}}>
        <img src={add} style={{width:"80%"}}onClick={() => {
        toggleAddListingViewOpen(true); setTimeout(function () { document.getElementById("addListingView").classList.add("show") }, 0);
      }}/>
    </div>
  )
}

export default App;
