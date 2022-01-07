import React, { useEffect, useState } from 'react'
import { CreateRepeatingEvent } from '../../lib/Event';
import EventCard from './EventCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const EventCreator = ({ eventsArr, setEvents }) => {
    const GetEvents = () => {
        if (localStorage.getItem('eventsList')) {
            let listOfEvents = JSON.parse(localStorage.getItem('eventsList'))
            let events_list = [], present_names = [];
            for (let element = 0; element < listOfEvents.length; element++) {
                if (localStorage.getItem(`event_${listOfEvents[element]}`)) {
                    present_names.push(listOfEvents[element])
                    events_list.push(JSON.parse(localStorage.getItem(`event_${listOfEvents[element]}`)))
                }
            };
            localStorage.setItem('eventsList', JSON.stringify(present_names))
            // console.log('getevents', events_list)
            return events_list
        }
        else
            return []
    }

    const LoadListEvents = () => {
        setEventsList(() => GetEvents())
    }

    const UpdateEvent = (event) => {
        localStorage.setItem(`event_${event.name}`, JSON.stringify(event))

    }

    const CheckEvents = (event) => {
        let eventsList = localStorage.getItem('eventsList') ? JSON.parse(localStorage.getItem('eventsList')) : null;
        if (eventsList) {
            if (eventsList.includes(event.name)) {
                UpdateEvent(event)
                return false;
            }
        }
        return true;
    }

    const StoreEvents = (newEvent) => {
        if (CheckEvents(newEvent)) {
            let prevEventsList = localStorage.getItem('eventsList') ? JSON.parse(localStorage.getItem('eventsList')) : [];
            prevEventsList.push(newEvent.name);
            // setEventsList(prevEventsList);
            localStorage.setItem(`event_${newEvent.name}`, JSON.stringify(newEvent))
            localStorage.setItem('eventsList', JSON.stringify(prevEventsList))
        }
    }

    const LoadEvents = () => {
        let newRepeat, prevArray = [], newArray = [];
        // console.log('eventsList load', eventsList)
        GetEvents().forEach(event => {
            newRepeat = CreateRepeatingEvent(new Date(event.start), new Date(event.end), event.name, event.type, event.amount, event.event_class, event.repeatParams)
            // console.log('store events', newRepeat, event)

            // prevArray = newRepeat.events;
            newArray = newArray.concat(newRepeat.events)
            // console.log('concat array', newArray)
        });
        setEvents(newArray);
    }

    const AddEvent = (newRepeatEvent) => {
        if (CheckEvents(newRepeatEvent)) {
            let newRepeat = CreateRepeatingEvent(newRepeatEvent.start, newRepeatEvent.end, newRepeatEvent.name, newRepeatEvent.type, newRepeatEvent.amount, newRepeatEvent.event_class, newRepeatEvent.repeatParams)
            // console.log('newrepeating events', newRepeat)
            let prevArray = eventsArr;
            let newArray = prevArray.concat(newRepeat.events)
            setEvents(newArray);
        }
    }

    const DeleteEvent = (el) => {
        // console.log(el)
        if (localStorage.getItem(`event_${el.name}`)) {
            localStorage.removeItem(`event_${el.name}`)
            LoadListEvents()
        }
    }
    //list of events
    // const [eventsArr, setEvents] = useState([]);
    const [newRepeatEvent, setNewRepeatEvent] = useState(null);
    const [newSingleEvent, setNewSingleEvent] = useState(null);
    const [eventsList, setEventsList] = useState(GetEvents())

    const [showCard, setShowCard] = useState(false)
    const CreateEvent = () => {
        setInputParam(null)
        setShowCard(true)
    }

    useEffect(() => {
        if (newRepeatEvent !== null) {
            //AddEvent
            AddEvent(newRepeatEvent)
            //Store Events
            StoreEvents(newRepeatEvent);
        }
        // console.log('new event', newRepeatEvent)
        LoadListEvents()
    }, [newRepeatEvent])

    useEffect(() => {
        LoadEvents();
    }, [eventsList])

    // console.log('eventsAr', eventsArr)

    const GetDays = (arr) => {
        let daysString = '';
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        if (arr.length === 1) {
            daysString = days[arr[0]]
        } else {
            for (let day = 0; day < arr.length; day++) {
                if (day === arr.length - 1) {
                    daysString += ' and '
                } else if (day > 0) {
                    daysString += ', '
                }
                daysString += days[arr[day]]
            }
        }
        return daysString
    }

    const GetEventString = (el) => {
        let string = ""
        if (el.type === 'recurring') {
            if (el.repeatParams[0] === 'Daily')
                string = `$${el.amount} ${el.event_class}, every ${el.repeatParams[1] > 1 ? `${el.repeatParams[1]} days` : 'day'}`
            if (el.repeatParams[0] === 'Weekly') {
                if (el.repeatParams[1] > 1) {
                    string = `$${el.amount} ${el.event_class}, every ${el.repeatParams[1]} weeks on ${GetDays(el.repeatParams[2])}`
                }
                else {
                    string = `$${el.amount} ${el.event_class}, every week on ${GetDays(el.repeatParams[2])}`
                }
            }
        }
        else {
            string = `$${el.amount} ${el.event_class}`
        }
        return string;
    }

    const [inputParam, setInputParam] = useState(null)

    // useEffect(() => {
    //     if (inputParam!== null) {
    //     }
    // }, [inputParam])

    const EditEvent = (el) => {
        // console.log(el)
        setInputParam(el)
        setShowCard(true)
    }

    return (
        <div>
            <button onClick={CreateEvent}>New Event</button>
            {showCard && <EventCard showCard={setShowCard} addNewRepeat={setNewRepeatEvent} input={inputParam}></EventCard>}
            {eventsList.map(el => {
                return (
                    <div>
                        <div>
                            {el.name}
                        </div>
                        <div>
                            {GetEventString(el)}
                            <div>
                                <button onClick={() => DeleteEvent(el)}><DeleteForeverIcon /></button>
                            </div>
                            <div>
                                <button onClick={() => EditEvent(el)}><EditIcon /></button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default EventCreator
