const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.listen(4000);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

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

    users = await db.collection('Users', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["username", "password", "firstName", "lastName", "profileImage"],
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
                    profileImage: {
                        bsonType: "binData"
                    }
                }
            }
        }
    })
})

app.post('/get_listings', async (req, res) => {
    const returnedListings = await listings
    .find({
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
        "size.volume":{$gt: req.body.minSize, $lt: req.body.maxSize},
        "price":{$gt: req.body.minPrice, $lt: req.body.maxPrice}
    })
    .limit(req.body.listingsPerPage)
    .skip(req.body.listingsPerPage * (req.body.pageNumber - 1))
    .toArray();

    return res.send({listings:returnedListings});
});

app.post('/post_listing', async (req, res) => {
    console.log('received!');
    let newListing = req.body.newListing;

    //adding the volume field
    newListing.size.volume = newListing.size.width * newListing.size.height * newListing.size.length;

    await listings.insertOne(newListing, (err, listing) => {
        if (err) return res.status(400);
    })
    return res
            .status(200)
            .send({status: 'success'});
});

app.get('/delete_listing', async (req, res) => {
    await listings.deleteOne({_id: ObjectId(req.body.id)}, (err, listing) => {
        if (err) return res.status(400)
    })
    return res.status(200);
});

app.get('/get_user', async (req, res) => {
    await users.find()
        .then(user => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

app.post('/add_user', async (req, res) => {
    const newUser = new User(req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.profileImage);

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})
