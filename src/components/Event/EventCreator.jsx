import { useEffect, useState } from 'react'
import { CreateRepeatingEvent, CreateSingleEvent } from '../../lib/Event';
import EventCard from './EventCard';

import dayjs from 'dayjs';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="left" />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 'none',
        fontSize: theme.typography.pxToRem(24),
        border: '1px solid #dadde9',
    },
}));

const EventCreator = ({ eventsArr, setEvents }) => {
    const style = {
        position: 'absolute',
        top: '2em',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        width: 400,
        bgcolor: 'var(--primary-text-color)',
        borderRadius: '1em',
        boxShadow: 24,
        p: 4,
    };
    const handleClose = () => setShowCard(false);

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
            return events_list
        }
        else
            return []
    }

    const LoadListEvents = () => {
        setEventsList(() => GetEvents())
    }

    const UpdateEvent = (event) => {
        localStorage.setItem(`event_${event.name}_${event.type}`, JSON.stringify(event))
    }

    const CheckEvents = (event) => {
        let eventsList = localStorage.getItem('eventsList') ? JSON.parse(localStorage.getItem('eventsList')) : null;
        if (eventsList) {
            if (eventsList.includes(`${event.name}_${event.type}`)) {
                UpdateEvent(event)
                return false;
            }
        }
        return true;
    }

    const StoreEvents = (newEvent) => {
        if (CheckEvents(newEvent)) {
            let prevEventsList = localStorage.getItem('eventsList') ? JSON.parse(localStorage.getItem('eventsList')) : [];
            prevEventsList.push(`${newEvent.name}_${newEvent.type}`);
            // setEventsList(prevEventsList);
            localStorage.setItem(`event_${newEvent.name}_${newEvent.type}`, JSON.stringify(newEvent))
            localStorage.setItem('eventsList', JSON.stringify(prevEventsList))
        }
    }

    const LoadEvents = () => {
        let newEvent, newArray = [];
        GetEvents().forEach(event => {
            if (event.type === 'repeating') {
                newEvent = CreateRepeatingEvent(new Date(event.start), new Date(event.end), event.name, event.type, event.amount, event.event_class, event.repeatParams)
                newArray = newArray.concat(newEvent.events)
            } else {
                newEvent = CreateSingleEvent(new Date(event.date), event.name, event.type, event.amount, event.event_class)
                newArray = newArray.concat(newEvent.event)
            }
        });
        setEvents(newArray);
    }

    const AddRepeatEvent = (newRepeatEvent) => {
        if (CheckEvents(newRepeatEvent)) {
            let newRepeat = CreateRepeatingEvent(newRepeatEvent.start, newRepeatEvent.end, newRepeatEvent.name, newRepeatEvent.type, newRepeatEvent.amount, newRepeatEvent.event_class, newRepeatEvent.repeatParams)
            console.log('newrepeating events', newRepeat)
            let prevArray = eventsArr;
            let newArray = prevArray.concat(newRepeat.events)
            setEvents(newArray);
        }
    }

    const AddSingleEvent = (newSingleEvent) => {
        if (CheckEvents(newSingleEvent)) {
            let newSingle = CreateSingleEvent(newSingleEvent.date, newSingleEvent.name, newSingleEvent.type, newSingleEvent.amount, newSingleEvent.event_class);
            console.log('new single event', newSingle)
            let prevArray = eventsArr;
            let newArray = prevArray.concat(newSingle.event)
            setEvents(newArray);
        }
    }

    const DeleteEvent = (el) => {
        if (localStorage.getItem(`event_${el.name}_${el.type}`)) {
            localStorage.removeItem(`event_${el.name}_${el.type}`)
            LoadListEvents()
        }
    }

    const CreateEvent = () => {
        setInputParam(null)
        setShowCard(true)
    }

    const EditEvent = (el) => {
        setInputParam(el)
        setShowCard(true)
    }

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

    const GetDates = (arr) => {
        let daysString = '';
        const getLast = (el) => {
            el = el.toString()
            let lastchar = el.substr(el.length - 1)
            let secondlastchar = el.length > 1 ? el.slice(el.length - 2, 1) : null
            let suffixStr = ""
            if (secondlastchar === '1') {
                suffixStr = el + 'th'
            } else {
                if (lastchar === '1') {
                    suffixStr = el + 'st'
                } else if (lastchar === '2') {
                    suffixStr = el + 'nd'
                } else if (lastchar === '3') {
                    suffixStr = el + 'rd'
                } else {
                    suffixStr = el + 'th'
                }
            }
            return suffixStr
        }
        if (arr.length === 1) {
            daysString = getLast(arr[0])
        } else {
            for (let day = 0; day < arr.length; day++) {
                if (day === arr.length - 1) {
                    daysString += ' and '
                } else if (day > 0) {
                    daysString += ', '
                }
                daysString += getLast(arr[day])
            }
        }
        return daysString
    }

    const GetEventDay = (date) => {
        let string = dayjs(date).format('MMM DD YYYY')
        return string
    }

    const GetEventString = (el) => {
        let string = ""
        if (el.type === 'repeating') {
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
            if (el.repeatParams[0] === 'Monthly') {
                if (el.repeatParams[1] > 1) {
                    string = `$${el.amount} ${el.event_class}, every ${el.repeatParams[1]} months on ${GetDates(el.repeatParams[3])}`
                }
                else {
                    string = `$${el.amount} ${el.event_class}, every month on the ${GetDates(el.repeatParams[3])}`
                }
            }
        }
        else {
            string = `$${el.amount} ${el.event_class} on ${GetEventDay(el.date)}`
        }
        return string;
    }

    const [newRepeatEvent, setNewRepeatEvent] = useState(null);
    const [newSingleEvent, setNewSingleEvent] = useState(null);
    const [eventsList, setEventsList] = useState(GetEvents());
    const [showCard, setShowCard] = useState(false);
    const [inputParam, setInputParam] = useState(null);

    useEffect(() => {
        if (newRepeatEvent !== null) {
            //AddRepeatEvent
            AddRepeatEvent(newRepeatEvent)
            //Store Events
            StoreEvents(newRepeatEvent);
        }
        LoadListEvents()
    }, [newRepeatEvent])

    useEffect(() => {
        if (newSingleEvent !== null) {
            //AddRepeatEvent
            AddSingleEvent(newSingleEvent)
            //Store Events
            StoreEvents(newSingleEvent);
        }
        LoadListEvents()
    }, [newSingleEvent])

    useEffect(() => {
        LoadEvents();
    }, [eventsList])

    return (
        <div className='event__creator__wrapper'>
            <div className='event__creator__new__div'>
                <div>Add New Event</div>
                <button onClick={CreateEvent}><AddCircleIcon sx={{ color: 'var(--primary-btn-color)', fontSize: 40 }} /></button>
            </div>
            <div className="event__creator__list">
                {eventsList.map(el => {
                    let tooltip = (
                        <div>
                            <div onClick={() => EditEvent(el)} style={{ borderRadius: '100%' }}>
                                <EditIcon sx={{ color: 'var(--s__font__color)' }} />
                            </div>
                            <div onClick={() => DeleteEvent(el)} style={{ borderRadius: '100%' }}>
                                <DeleteForeverIcon sx={{ color: 'var(--p__red__color)' }} />
                            </div>
                        </div>
                    )

                    return (
                        <CustomTooltip title={tooltip} arrow key={`day_event_${el}`}>
                            <div className='event__creator__object'>
                                <div>
                                    <div className='event__creator__event__name' style={el.event_class === 'Debit' ? { color: 'var(--p__red__color)' } : { color: 'var(--p__green__color)' }}>
                                        {el.name}
                                    </div>
                                    <div className='event__creator__event__desc'>
                                        {GetEventString(el)}
                                    </div>
                                </div>

                            </div>
                        </CustomTooltip>
                    )
                })}
            </div>

            <div>
                <Modal
                    open={showCard}
                    onClose={handleClose}
                >
                    <div className='modal__div' sx={style}>
                        <EventCard
                            showCard={setShowCard}
                            addNewRepeat={setNewRepeatEvent}
                            addNewSingle={setNewSingleEvent}
                            input={inputParam}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default EventCreator
