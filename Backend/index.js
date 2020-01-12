const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.listen(4000);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const mongoURL = "mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@ourspace-ppmur.mongodb.net/test?retryWrites=true&w=majority";
let db;
let listings;

MongoClient.connect(mongoURL, async (err, database) => {
    if (err) throw err;
    db = await database.db('OurSpace');

    listings = await db.collection('Listings', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "description", "price", "rating", "location", "size", "time", "attributes", "image"],
                properties: {
                    name: {
                        bsonType: "string"
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
                                                bsonType: "double",
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
                        required: ["width", "length", "height"],
                        properties: {
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
    })
    await listings.createIndex({'location.geodata':'2dsphere'})
})

app.post('/get_listings', async (req, res) => {
    const returnedListings = await listings
    .find({
        "location.geodata": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [req.body.latitude, req.body.longitude]
                }
            }
        }
    })
    .limit(req.body.listingsPerPage)
    .skip(req.body.listingsPerPage * (req.body.pageNumber - 1))
    .toArray();

    return res.send({listings:returnedListings});
});

app.post('/post_listing', async (req, res) => {
    await listings.insertOne(req.body.newListing, (err, listing) => {
        if (err) return res.status(400);
    })
    return res.status(200);
});

// app.post('/update_listing/:id', (req, res) => {
//     Listing.findById(req.body.id, (err, listing) => {
//         if (!listing) {
//             res.status(404).send("Listing not found")
//         }
//         else { 
//             listing.name = req.body.name;
//             listing.location = req.body.location;
//             listing.size = req.body.size;
//             listing.time = req.body.size;
//             listing.attributes = req.body.attributes;
//         }
        
//         todo.save()
//         .then(todo => {
//             res.json('Todo updated!');
//         })
//         .catch(err => {
//             res.status(400).send("Update not possible");
//         });
//     })   
// })

app.get('/delete_listing', async (req, res) => {
    await listings.deleteOne({_id: ObjectId(req.body.id)}, (err, listing) => {
        if (err) return res.status(400)
    })
    return res.status(200);
});