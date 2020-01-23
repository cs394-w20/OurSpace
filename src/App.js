import React, { useState, useEffect } from "react";

import "./App.css";
import "rbx/index.css";
import "./assets/styles/views.css"
import "./assets/styles/calendar.css";

import ListingList from "./components/Listing.js"
import DetailView from "./components/DetailView.js";
import FilterView from "./components/FilterView.js";
import ContactView from "./components/ContactView.js"

import { ListingContext, FilterContext } from "./components/Contexts.js";

import { Button } from "rbx";

const App = () => {

  const [currListing, updateCurrListing] = useState(null);
  const [filteredList, updateFList] = useState([]);
  const [currFilter, updateFilter] = useState({ size: null, price: null, rating: null, ramp: false, elevator: false, parking: false, lock: false, keywords: null, availability: null, distance: null });
  const [filterViewOpen, toggleFilterViewOpen] = useState(false);
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


  return (
    <ListingContext.Provider value={{ currListing, updateCurrListing, listingList, updateAll, contactViewOpen, toggleContactView }}>
      <div className="App" width="100%" height="100%" opacity="0.99">
        <Button z-index="0" onClick={() => {toggleFilterViewOpen(true); setTimeout(function () { document.getElementById("filterView").classList.add("show") }, 0);}}>Set Filter</Button>
        <FilterContext.Provider value={{ listingList, updateList, filteredList, updateFList, currFilter, updateFilter, filterViewOpen, toggleFilterViewOpen }}>
          {filterViewOpen && (<FilterView />)}
        </FilterContext.Provider>
        <ListingList />
        <DetailView />
        <ContactView />
      </div>
    </ListingContext.Provider>
  );
};

export default App;
