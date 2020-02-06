import React, { useState, useEffect, useContext } from "react";

import "./App.css";
import "rbx/index.css";
import "./assets/styles/views.css"
import "./assets/styles/calendar.css";

import filter from "./assets/icons/filter.png";
import add from "./assets/icons/add.png";

import { Button, PageLoader, Column, Icon } from "rbx";

import ListingList from "./components/Listing.js"
import DetailView from "./components/DetailView.js";
import FilterView from "./components/FilterView.js";
import ContactView from "./components/ContactView.js"

import { ListingContext, FilterContext } from "./components/Contexts.js";

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const mongoURL =
  "mongodb+srv://" +
  process.env.MONGO_USERNAME +
  ":" +
  process.env.MONGO_PASSWORD +
  "@ourspace-ppmur.mongodb.net/test?retryWrites=true&w=majority";
let db;
let listings;

MongoClient.connect(mongoURL, async (err, database) => {
  if (err) throw err;
  db = await database.db("OurSpace");

  listings = await db.collection("Listings", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "name",
          "host",
          "description",
          "price",
          "rating",
          "location",
          "size",
          "time",
          "booked",
          "attributes",
          "image"
        ],
        properties: {
          name: {
            bsonType: "string"
          },
          host: {
            bsonType: "objectId"
          },
          description: {
            bsonType: "string"
          },
          price: {
            bsonType: "double"
          },
          rating: {
            bsonType: "object",
            required: ["score", "numRatings"],
            properties: {
              score: {
                bsonType: "double"
              },
              numRatings: {
                bsonType: "int"
              }
            }
          },
          location: {
            bsonType: "object",
            required: ["street", "city", "state", "country", "zip", "geodata"],
            properties: {
              street: {
                bsonType: "string",
                description: "example entry: 1655 Roadhill Road"
              },
              city: {
                bsonType: "string"
              },
              state: {
                bsonType: "string"
              },
              country: {
                bsonType: "string"
              },
              zip: {
                bsonType: "int"
              },
              geodata: {
                bsonType: "object",
                required: ["type", "coordinates"],
                properties: {
                  type: {
                    bsonType: "string"
                  },
                  coordinates: {
                    bsonType: "object",
                    required: ["latitude", "longitude"],
                    properties: {
                      latitude: {
                        bsonType: "double"
                      },
                      longitude: {
                        bsonType: "double"
                      }
                    }
                  }
                }
              }
            }
          },
          size: {
            bsonType: "object",
            required: ["volume", "width", "length", "height"],
            properties: {
              volume: {
                bsonType: "int",
                minimum: 0
              },
              width: {
                bsonType: "int",
                minimum: 0
              },
              length: {
                bsonType: "int",
                minimum: 0
              },
              height: {
                bsonType: "int",
                minimum: 0
              }
            }
          },
          time: {
            bsonType: "date"
          },
          booked: {
            bsonType: "array"
          },
          attributes: {
            bsonType: "object",
            required: ["hasLock", "hasElevator", "hasRamp"],
            properties: {
              hasLock: {
                bsonType: "bool"
              },
              hasElevator: {
                bsonType: "bool"
              },
              hasRamp: {
                bsonType: "bool"
              }
            }
          },
          image: {
            bsonType: "binData"
          }
        }
      }
    }
  });
  await listings.createIndex({ "location.geodata": "2dsphere" });

  const users = await db.collection("Users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "username",
          "password",
          "firstName",
          "lastName",
          "host",
          "bookings",
          "profileImage"
        ],
        properties: {
          username: {
            bsonType: "string"
          },
          password: {
            bsonType: "string"
          },
          firstName: {
            bsonType: "string"
          },
          lastName: {
            bsonType: "string"
          },
          host: {
            bsonType: "object",
            required: ["isHost", "description", "listings"],
            properties: {
              isHost: {
                bsonType: "bool"
              },
              description: {
                bsonType: "string"
              },
              listings: {
                bsonType: "array"
              }
            }
          },
          bookings: {
            bsonType: "array"
          },
          profileImage: {
            bsonType: "binData"
          }
        }
      }
    }
  });
});

const App = () => {

  const [currListing, updateCurrListing] = useState(null);
  const [listingList, updateList] = useState([]);
  
  const [currFilter, updateFilter] = useState({ minDistance: 0, maxDistance: 2147483646, minSize: 0, maxSize: 2147483646, minPrice: 0, maxPrice: 2147483646, minRating: 0, maxRating: 2147483646, filterParking: false, filterRamp: false, filterElevator: false, filterLock: false });
  
  const [contactViewOpen, toggleContactView] = useState(false);
  const [filterViewOpen, toggleFilterViewOpen] = useState(false);

  const [listPerPage, setListPerPage] = useState(10);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    console.log(currFilter)
    const getListingsData = async () => {
      const query = {
        // LOCATION FILTER
        "location.geodata": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [latitude, longitude]
            },
            $maxDistance: currFilter.maxDistance,
            $minDistance: currFilter.minDistance
          }
        },
        // SIZE FILTER
        "size.volume": { $gt: currFilter.minSize, $lt: currFilter.maxSize },
        // PRICE FILTER
        price: { $gt: currFilter.minPrice, $lt: currFilter.maxPrice },
        // RATING FILTER
        "rating.score": { $gt: currFilter.minRating, $lt: currFilter.maxRating }
      };
    
      // ATTRIBUTE FILTERS
      if (currFilter.filterElevator == true) {
        query["attributes.hasElevator"] = true;
      }
      if (currFilter.filterRamp == true) {
        query["attributes.hasRamp"] = true;
      }
      if (currFilter.filterLock == true) {
        query["attributes.hasLock"] = true;
      }
    
      const returnedListings = await listings
        .find(query)
        .limit(currFilter.listingsPerPage)
        .skip(currFilter.listingsPerPage * (currFilter.pageNumber - 1))
        .toArray();
    
      updateList(returnedListings)
    }
    getListingsData();
  }, [currFilter]);

  const updateAll = (newListing) => {
  	/*
        BACKEND: ADD CODE HERE TO SET UP PUSHING NEW LISTINGS TO REMOTE DB
    */
    updateList([newListing].concat(listingList))
  }
  
  if(listingList.length === 0) return (<PageLoader active={true} color="light"></PageLoader>)


  return (
    <ListingContext.Provider value={{ currListing, updateCurrListing, listingList, updateAll, contactViewOpen, toggleContactView }}>
      <div className="App" width="100%" height="100%" opacity="0.99">
        <ListingList />
        <DetailView />
        <ContactView />
        <FilterContext.Provider value={{ currFilter, updateFilter, filterViewOpen, toggleFilterViewOpen }}>
          <FilterView/>
          <BottomBar></BottomBar>
        </FilterContext.Provider>
      </div>
    </ListingContext.Provider>
  );
};

const BottomBar = () => {
  const { toggleFilterViewOpen } = useContext(FilterContext);

  return (
    <div style={{height: "4vh", width: "100%", border:"10px", backgroundColor:"grey", position: "fixed", top: "96vh"}}>
      <Column.Group size="one-half">
        <Button style={{width:"50%", top:"1vh"}} onClick={() => {
          toggleFilterViewOpen(true); setTimeout(function () { document.getElementById("filterView").classList.add("show") }, 0);
        }}>
          <img src={filter} style={{width:"2.5vh"}}/>
        </Button>
        <Button style={{width:"50%", top:"1vh"}}>
          <img src={add} style={{width:"2.5vh"}}/>
        </Button>
      </Column.Group>
    </div>
  )
}

export default App;
