import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getMonth, month__Events } from '../../utils';
import Month from './Month';
import WeekHeader from './WeekHeader';

const Calendar = ({ events }) => {
    // console.table(getMonth())

    const filterEvents = () => {
        if (!events)
            return []
        return events.filter(event => {
            if (currentMonth.firstDate <= event.date && event.date <= currentMonth.lastDate) return event;
        })
    }

    const [monthCounter, setMonthCounter] = useState(0)
    const [currentMonth, setcurrentMonth] = useState(getMonth(monthCounter));
    const [monthEvents, setmonthEvents] = useState(() => filterEvents())
    const [monthState, setmonthState] = useState(() => month__Events(currentMonth, monthEvents))

    // console.log('current month', currentMonth)
    // console.log('monthEvents', monthEvents)
    // console.log('monthState', monthState)
    // useEffect(() => {

    // }, [events])
    useEffect(() => {
        setcurrentMonth(() => getMonth(monthCounter))
        // console.log('counter', monthCounter)
    }, [monthCounter, events])

    useEffect(() => {
        setmonthEvents(() => filterEvents())
        // setmonthEvents(events)
    }, [currentMonth])

    useEffect(() => {
        setmonthState(() => month__Events(currentMonth, monthEvents))
    }, [monthEvents])

    return (
        <div>
            <div>
                <button onClick={() => setMonthCounter(counter => counter - 1)}>PREV</button>
                <button onClick={() => setMonthCounter(0)}>TODAY</button>
                <button onClick={() => setMonthCounter(counter => counter + 1)}>NEXT</button>
            </div>
            <WeekHeader month={currentMonth} />
            <Month month={monthState} monthEvents={monthEvents} />

        </div>
    )
}

export default Calendar
