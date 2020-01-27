import React, { useContext, Component } from "react";

import { DAY_LABELS, MONTH_LABELS } from "./helpers.js";

import { ListingContext } from "./Contexts.js";

import { Image, Modal } from "rbx";
import ReactLightCalendar from '@lls/react-light-calendar';

class Calendar extends Component {
    constructor(props) {
        super(props);
        // Get initial startDate and endDate
        this.state = {
            startDate: props.startDate,
            endDate: props.endDate
        };
    }

    onChange = (startDate, endDate) => {
        this.setState({ startDate, endDate });
        var numOfDays = (endDate - startDate) / 86400000;
        // calculatePrice(numOfDays);
    }

    render = () => {
        const { startDate, endDate } = this.state;
        // calcStartDate = startDate;

        return (
            <ReactLightCalendar
                dayLabels={DAY_LABELS}
                monthLabels={MONTH_LABELS}
                onChange={this.onChange}
                startDate={startDate}
                endDate={endDate}
                {...this.props} // Add parent's additionnal props
            />
        );
    };
}

const ContactView = () => {

    // FRONTEND: Eventually fetch seller data from currListing.sellar or something

    const { currListing, contactViewOpen, toggleContactView } = useContext(ListingContext);

    return (
        <div>
            <Modal id="ctView" active={contactViewOpen}>
                {currListing != null ?
                    <React.Fragment>
                        <Modal.Background style={{ height: "100%", margin: "0%", backgroundColor: "rgba(0, 0, 0, .2)" }}></Modal.Background>

                        <Modal.Card style={{ width: "100%", height: "100%", bottom: "-3.5%", borderRadius: "10px" }}>
                            <Modal.Card.Body>
                                <div id="ctExit" style={{ width: "100%", fontSize: '24px', color: 'white', position: "fixed", top: "1%", left: "3%" }} onClick={() => { document.getElementById("ctView").classList.remove("show"); setTimeout(function () { toggleContactView(false) }, 150); }}>
                                    &#10005;
                                </div>
                                <br />

                                <div style={{ display: "flex", width: "100%" }}>
                                    <div style={{ width: "60%" }}>
                                        <span style={{ fontSize: '26px', fontWeight: "700" }}>Hi, I'm Charles</span>
                                        <p>Joined in 2020</p>
                                    </div>
                                    <div style={{ width: "40%", marginBottom: "5%" }}>
                                        <Image alt="Picture of the listing's owner" src="https://media-exp2.licdn.com/dms/image/C4D03AQGlMxrEKues9g/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=6wCiJIZ6fLzoIMPdo7s33G4bmcWEfpKzQhRfKbm6MvY" style={{ width: "100%", padding: "0px", borderRadius: "50%" }} />
                                    </div>
                                </div>


                                {/* date => date < new Date().getTime() */}

                                {/* <p>Here is when the room is available</p> */}

                                <Calendar disableDates={date => date < new Date().getTime() || date > new Date('2020.02.17').getTime()} timezone="Pacific/Niue" /> {/* UTC or Pacific/Niue or Pacific/Guadalcanal*/}
                                <br />
                                <div style={{ width: "100%", textAlign: "center", marginTop: "10%" }}>
                                    <span style={{ backgroundColor: "	#4E2A84", padding: "10px", color: "white", fontWeight: "bold", borderRadius: "3px" }}
                                        onClick={() => { document.getElementById("ctExit").click(); document.getElementById("dtExit").click(); alert('Reservation Created'); }}
                                    >Make Reservation</span>
                                </div>

                            </Modal.Card.Body>
                        </Modal.Card>
                    </React.Fragment>
                    : null}
            </Modal>
        </div>
    );
};

export default ContactView;