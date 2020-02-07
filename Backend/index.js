const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./auth.js");
const app = express();
app.listen(process.env.PORT || 4000);
console.log(process.env.PORT)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(cookieParser());

const dotenv = require("dotenv");
dotenv.config();

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

  users = await db.collection("Users", {
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

app.post("/test_test", async (req, res) => {
  console.log("RECEIVED!!!");
  res.send("received")
});

//UNFINISHED -- need to finish all the filters
app.post("/get_listings", async (req, res) => {
  console.log('received listing request')
  const query = {
    // LOCATION FILTER
    "location.geodata": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [req.body.latitude, req.body.longitude]
        },
        $maxDistance: req.body.maxDistance,
        $minDistance: req.body.minDistance
      }
    },
    // SIZE FILTER
    "size.volume": { $gt: req.body.minSize, $lt: req.body.maxSize },
    // PRICE FILTER
    price: { $gt: req.body.minPrice, $lt: req.body.maxPrice },
    // RATING FILTER
    "rating.score": { $gt: req.body.minRating, $lt: req.body.maxRating }
  };

  // ATTRIBUTE FILTERS
  if (req.body.filterElevator == true) {
    query["attributes.hasElevator"] = true;
  }
  if (req.body.filterRamp == true) {
    query["attributes.hasRamp"] = true;
  }
  if (req.body.filterLock == true) {
    query["attributes.hasLock"] = true;
  }

  const returnedListings = await listings
    .find(query)
    .limit(req.body.listingsPerPage)
    .skip(req.body.listingsPerPage * (req.body.pageNumber - 1))
    .toArray();

  return res.send({ listings: returnedListings });
});

//UNIFINISHED -- instead of having frontend send in an entire json object, just have them individually send everything you want.
app.post("/post_listing", auth, async (req, res) => {
  let newListing = req.body.newListing;

  newListing.size.volume =
    newListing.size.width * newListing.size.height * newListing.size.length;
  newListing.host = ObjectId(req.user._id);
  newListing.booked = [];

  let listingId;

  await listings.insertOne(newListing, (err, listing) => {
    if (err) return res.status(400);
    listingId = listing._id;
  });
  await users.update(
    { _id: ObjectId(req.user._id) },
    { "host.isHost": true, $push: { "host.listings": ObjectId(listingId) } }
  );
  return res.status(200).send({ status: "success" });
});

// UNFINISHED -- what happens if a listing that someone has booked is deleted?
app.get("/delete_listing", auth, async (req, res) => {
  await listings.deleteOne({ _id: ObjectId(req.body.id) }, (err, listing) => {
    if (err) return res.status(400);
  });
  return res.status(200);
});

// UNFINISHED -- still need to add the booking to the user profile too.
app.post("/book_listing", auth, async (req, res) => [
  await listings.update(
    { _id: ObjectId(req.body.listingId) },
    {
      $push: {
        booked: { startTime: req.body.startTime, endTime: req.body.endTime }
      }
    }
  )
]);

app.post("/login", async (req, res) => {
  const user = await users.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send({ error: "Username not found" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ error: "Wrong password" });
  }

  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return res.status(200).cookie("token", token);
});

app.post("/add_user", async (req, res) => {
  const userAlreadyExists = await users.findOne({
    username: req.body.username
  });
  if (userAlreadyExists) {
    return res.status(400).send({ error: "User Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    username: req.body.username,
    password: hashPass,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    host: {
      isHost: false,
      description: req.body.description,
      listings: []
    },
    bookings: [],
    profileImage: null
  };

  users.insertOne(newUser, async (err, result) => {
    if (err) {
      return res.status(400).send({ error: err });
    }
    const token = await jwt.sign(
      { _id: result.insertedId },
      process.env.TOKEN_SECRET
    );
    return res.status(200).cookie("token", token);
  });
});
