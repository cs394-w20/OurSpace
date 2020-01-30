import React, { useContext } from "react";

import parking from "../assets/icons/local_parking-24px.svg";
import elevator from "../assets/icons/elevator.svg";

import { distanceCalculator, sizeCalculator } from "./helpers.js";

import { ListingContext } from "./Contexts.js";

import { Card, Image, Column } from "rbx";

const StorageCard = ({ listing }) => {

    const { updateCurrListing } = useContext(ListingContext);

    return (
        <div style={{ width: "80%", margin: "Auto", paddingTop: '20px' }} onClick={() => { updateCurrListing(listing); setTimeout(function () { document.getElementById("dtView").classList.add("show") }, 0); }}>
            <Card style={{ borderRadius: "8px" }}>
                <Card.Image>
                    <Image.Container size="4by3">
                        <Image alt="Picture of the storage space" src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" style={{ borderRadius: "8px" }} />
                    </Image.Container>
                </Card.Image>

                <Card.Content style={{ padding: "10px" }}>
                    <table style={{ width: "100%" }}>
                        <th style={{ width: "60%" }}>
                            <div style={{ fontSize: '14px', textAlign: "left", fontWeight: "normal" }}>
                                <span style={{ textTransform: 'uppercase', fontWeight: "500", border: "1px solid black", borderRadius: "4px", padding: '4px', paddingTop: '0px', paddingBottom: '0px' }}>{sizeCalculator(listing.size)}</span>
                            </div>
                        </th>
                        <th style={{ width: "40%", textAlign: "right", fontWeight: "normal", fontSize: "15px" }}>


                            <div style={{ display: 'inline-block' }}>
                                <span style={{ color: 'red' }}>&#9733;</span>{listing.rating.score}
                                <span style={{ fontSize: "13px", paddingLeft: "2px" }}>({listing.rating.numRatings})</span>
                            </div>
                        </th>
                    </table>

                    <div style={{ fontSize: '24px', textAlign: "left", width: "100%", lineHeight: '30px' }}>{listing.name}
                        <div style={{ display: 'inline-block', float: "right", marginTop: '5px' }}>

                            <img style={listing.attributes.hasElevator ? { height: '22px' } : { display: "none" }} src={elevator} />
                            <img style={listing.attributes.hasParking ? { height: '22px' } : { display: "none" }} src={parking} />
                        </div>

                    </div>

                    <table style={{ width: "100%", marginTop: '10px' }}>
                        <tr>
                            <th style={{ width: "60%" }}>
                                <div style={{ fontSize: '20px', textAlign: "left", fontWeight: "normal" }}>
                                    <span style={{ fontWeight: "bold" }}>${listing.price}</span>/night
                </div>
                            </th>
                            <th style={{ width: "40%", textAlign: "right", fontWeight: "normal", fontSize: "15px" }}>
                                <div style={{ fontSize: '16px', textAlign: "right", float: "right", fontWeight: "normal" }}>{distanceCalculator({ "latitude": 42.057923, "longitude": -87.675918 }, listing.location.geodata.coordinates)}</div>
                                <br></br>
                            </th>
                        </tr>
                    </table>
                </Card.Content>
            </Card>
        </div>
    );
};

const ListingList = () => {

    const { listingList } = useContext(ListingContext);

    var columnIds = [...Array(listingList.length).keys()];

    return (
        <div>
            <Column.Group multiline>
                {columnIds.map(i => (
                    <Column key={i} size="one-quarter">
                        <StorageCard listing={listingList[i]} />
                    </Column>
                ))}
            </Column.Group>
        </div>
    );
};

export default ListingList;