import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/css-components/Calendar.css";
import Calendar from "./components/Calendar/Calendar";
import { Balance } from "./lib/Balance";
import { CreateRepeatingEvent } from "./lib/Event";
import EventCreator from "./components/Event/EventCreator";

function App() {
  
    const [eventsArr, setEvents] = useState([]);
    // console.log("allevents", eventsArr);

    let defaultvalue = 100;
    const [startBalance, setStartBalance] = useState(defaultvalue);
    const [balance, setBalance] = useState(
        Balance(new Date(), new Date(2022, 6, 5), eventsArr, startBalance)
    );

    useEffect(() => {
        setBalance(
            Balance(new Date(), new Date(2022, 6, 5), eventsArr, startBalance)
        );
    }, [startBalance, eventsArr]);

    // console.log("reduced balance", balance);
    return (
        <React.Fragment>
            <div className="starting__balance">
                <div>CURRENT BALANCE</div>
                <input
                    type={"number"}
                    // value={}
                    onChange={(e) => setStartBalance(Number(e.target.value))}
                ></input>
            </div>
            <div className="calendar_event__view">
                <Calendar events={balance} />
                <EventCreator
                    eventsArr={eventsArr}
                    setEvents={setEvents}
                ></EventCreator>
            </div>
        </React.Fragment>
    );
}

export default App;
