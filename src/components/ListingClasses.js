class Location {
    constructor(street, city, state, country, zip, geodata) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zip = zip;
        this.geodata = geodata;
    }
}

class Geodata {
    constructor(type, coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }
}

class Coordinates {
    constructor(latitude, longitude) {
        this.latitide = latitude;
        this.longitude = longitude;
    }
}

class Size {
    constructor(length, width, height) {
        this.length = length;
        this.width = width;
        this.height = height;
    }
}

class Attributes {
    constructor(hasLock, hasParking, hasElevator, hasRamp) {
        this.hasLock = hasLock;
        this.hasParking = hasParking;
        this.hasElevator = hasElevator;
        this.hasRamp = hasRamp;
    }
}

class Rating {
    constructor(score, numRatings) {
        this.score = score;
        this.numRatings = numRatings;
    }
}

class Listing {

    constructor(name, location, size, time, attributes, image, price, rating) {
        this.name = name;
        this.location = location;
        this.size = size;
        this.time = time;
        this.attributes = attributes;
        this.image = image;
        this.price = price;
        this.rating = rating;
    }
}

const TestData = [new Listing("Old Orchard Apt", new Location("10104 Old Orchard Ct", "Skokie", "IL", "USA", 60076, new Geodata("point", new Coordinates(42.063752, -87.744318))), new Size(10, 15, 6), new Date(2020, 5, 10, 12, 0, 0, 0), new Attributes(false, true, false, false), "./assets/Images/apt.jpg", 5.00),
new Listing("The Best Closet", new Location("160 Steeples Blvd", "Indianapolis", "IN", "USA", 46222, new Geodata("point", new Coordinates(39.767587, -86.212728))), new Size(2, 2, 8), new Date(2020, 1, 24, 6, 30, 0, 0), new Attributes(false, false, true, false), "./assets/Images/closet.jpg", 10.50),
new Listing("Under The Sink", new Location("1600 Monticello Ave", "Norfolk", "VA", "USA", 23510, new Geodata("point", new Coordinates(36.864039, -76.285274))), new Size(4, 2, 2), new Date(2020, 2, 6, 15, 0, 0, 0), new Attributes(false, true, true, false), "./assets/Images/underthesink.jpg", 20.75),
new Listing("Spare Bedroom", new Location("737 Colfax St", "Evanston", "IL", "USA", 60201, new Geodata("point", new Coordinates(42.060989, -87.681330))), new Size(10, 10, 10), new Date(2021, 11, 19, 20, 30, 0, 0), new Attributes(false, true, false, false), "./assets/Images/sparebedroom.jpg", 7.50),
new Listing("Cellar", new Location("4065 Dunbarton Cir", "San Ramon", "CA", "USA", 94583, new Geodata("point", new Coordinates(37.757932, -121.952262))), new Size(20, 10, 5), new Date(2020, 1, 1, 0, 0, 0, 0), new Attributes(false, false, false, false), "./assets/Images/cellar.jpg", 10.00),
new Listing("TOP QUALITY Cellar by BESTCELLARS", new Location("3187 Reeves Dr", "Melvindale", "MI", "USA", 48122, new Geodata("point", new Coordinates(42.288179, -83.173806))), new Size(50, 50, 5), new Date(2019, 4, 5, 16, 8, 0, 0), new Attributes(false, false, false, false), "./assets/Images/dingycellar.jpg", 55.99),
new Listing("Storage Unit", new Location("2850 N Pulaski Rd", "Chicago", "IL", "USA", 60641, new Geodata("point", new Coordinates(41.933241, -87.727606))), new Size(8, 8, 10), new Date(2020, 1, 4, 0, 0, 0, 0), new Attributes(false, false, false, false), "./assets/Images/storageunit.jpg", 5.00),
new Listing("Back Room", new Location("5023 Conrad St", "Skokie", "IL", "USA", 60077, new Geodata("point", new Coordinates(42.037937, -87.752990))), new Size(10, 10, 8), new Date(2020, 1, 15, 8, 30, 0, 0), new Attributes(false, false, true, false), "./assets/Images/storeroom.jpg", 2.00),
new Listing("Miniature Storage", new Location("2145 Sheridan Rd", "Evanston", "IL", "USA", 60208, new Geodata("point", new Coordinates(42.058053, -87.676167))), new Size(1, 2, 1), new Date(2020, 1, 14, 12, 0, 0, 0), new Attributes(false, false, false, false), "./assets/Images/mousehole.jpg", 0.50)];