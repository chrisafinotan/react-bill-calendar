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
    const getStarting = () => {
        let defaultvalue = 100;
        if (localStorage.getItem("start_balance")) {
            defaultvalue = localStorage.getItem("start_balance");
        } else {
            localStorage.setItem("start_balance", defaultvalue);
        }
        return defaultvalue;
    };
    const [startBalance, setStartBalance] = useState(() => getStarting());
    const [balance, setBalance] = useState(
        Balance(new Date(), new Date(2022, 6, 5), eventsArr, startBalance)
    );

    useEffect(() => {
        setBalance(
            Balance(new Date(), new Date(2022, 6, 5), eventsArr, startBalance)
        );
        localStorage.setItem("start_balance", startBalance);
    }, [startBalance, eventsArr]);

    return (
        <React.Fragment>
            <div className="main__wrapper">
                {/* <div className="balance__wrapper">
                    <div className="title__div">
                        <span className="balance__span__title">
                            my<span className="big__title red">b</span>
                            <span className="big__title">n</span>
                            <span className="big__title green">b</span>
                        </span>
                    </div>
                    <div className="starting__balance">
                        <div className="balance__span__div">
                            <span className="balance__span__amount">
                                ${startBalance}
                            </span>
                            <span className="balance__span__title">
                                CURRENT BALANCE:
                            </span>

                            <input
                                type={"number"}
                                // value={}
                                onChange={(e) =>
                                    setStartBalance(Number(e.target.value))
                                }
                                className="input__big"
                            ></input>
                        </div>
                    </div>
                </div> */}
                <div className="calendar__event__view">
                    <EventCreator
                        eventsArr={eventsArr}
                        setEvents={setEvents}
                    ></EventCreator>
                    <Calendar events={balance} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
