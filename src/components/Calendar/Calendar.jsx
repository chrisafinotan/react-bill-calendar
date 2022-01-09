import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getMonth, month__Events } from '../../utils';
import Month from './Month';
import WeekHeader from './WeekHeader';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Calendar = ({ events }) => {
    const filterEvents = () => {
        if (!events)
            return []
        return events.filter(event => {
            if (currentMonth.firstDate <= event.date && event.date <= currentMonth.lastDate) return event;
        })
    }
    const [monthCounter, setMonthCounter] = useState(0);
    const [currentMonth, setcurrentMonth] = useState(getMonth(monthCounter));
    const [monthEvents, setmonthEvents] = useState(() => filterEvents())
    const [monthState, setmonthState] = useState(() => month__Events(currentMonth, monthEvents))

    // console.log('current month', currentMonth)
    // console.log('monthEvents', monthEvents)
    // console.log('monthState', monthState)
 
    useEffect(() => {
        setcurrentMonth(() => getMonth(monthCounter))
    }, [monthCounter, events])

    useEffect(() => {
        setmonthEvents(() => filterEvents())
    }, [currentMonth])

    useEffect(() => {
        setmonthState(() => month__Events(currentMonth, monthEvents))
    }, [monthEvents])

    useEffect(() => {
        const onKeyDown = ({key}) => {
            if (key === 'ArrowUp' || key === 'ArrowLeft'){
                setMonthCounter(counter => counter - 1)
            }
            if (key === 'ArrowDown' || key === 'ArrowRight'){
                setMonthCounter(counter => counter + 1)
            }
        }

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, []);

    return (
        <div className='main__calendar__wrapper'>
            <div className='main__calendar__month__header'>
                <div className='main__calendar__month'>
                    {dayjs().month(currentMonth.month).format('MMMM YYYY')}
                </div>
                <div className='main__calendar__month__header__btns'> 
                    <button className={'main__calendar__header__btn'} onClick={() => setMonthCounter(counter => counter - 1)}><NavigateBeforeIcon sx={{ color: 'var(--main__font__color)'}} /></button>
                    <button className={'main__calendar__header__btn'} onClick={() => setMonthCounter(0)}>TODAY</button>
                    <button className={'main__calendar__header__btn'} onClick={() => setMonthCounter(counter => counter + 1)}><NavigateNextIcon sx={{ color: 'var(--main__font__color)'}}/></button>
                </div>
            </div>
            <WeekHeader month={currentMonth} />
            <Month month={monthState} monthEvents={monthEvents} />
        </div>
    )
}

export default Calendar
