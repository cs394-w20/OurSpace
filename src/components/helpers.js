const DAY_LABELS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const MONTH_LABELS = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function deg2rad(deg) {
    //thanks to stackexchange for most of the body of this function
    return deg * (Math.PI / 180)
}

function distanceCalculator(userCoords, coordinates) {
    //thanks to stackexchange for most of the body of this function
    var R = 3958.8; // Radius of the earth in miles
    var userLatitude = userCoords.latitude;
    var userLongitude = userCoords.longitude;
    var dLat = deg2rad(coordinates.latitide - userLatitude);  // deg2rad below
    var dLon = deg2rad(coordinates.longitude - userLongitude);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(coordinates.latitide)) * Math.cos(deg2rad(userLatitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in miles
    d = Math.floor(d);

    var out = d.toString() + " miles away"; //modify text here
    return out;
}

function sizeCalculator(sizeObject) {

    var volume = sizeObject.length * sizeObject.width * sizeObject.height;

    if (volume > 125) {
        if (volume > 1000) {
            return "Large";
        }

        return "Medium";
    }

    return "Small";
}

export { DAY_LABELS, MONTH_LABELS, deg2rad, distanceCalculator, sizeCalculator };