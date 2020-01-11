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
MongoClient.connect(mongoURl, async (err, database) => {
    if (err) throw err;
    db = database.db('OurSpace');
})