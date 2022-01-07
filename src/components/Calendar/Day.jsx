import dayjs from 'dayjs'

const Day = ({ day, event }) => {

    const getCurrentDayClass = (day) => {
        return day.setHours(0, 0, 0, 0).toString() === new Date().setHours(0, 0, 0, 0).toString() && 'currentDay'
    }

    const getWeekendClass = (day) => {
        return (dayjs(day).format('dd') === 'Su' || dayjs(day).format('dd') === 'Sa') && 'weekend';
    }

    const getEvents = () => {
        if (day[1]) {
            return day[1].map(el => {
                return (
                    <div className='day__events'>
                        <div className='day__events__name'>
                            {`${el.event.name}`}
                        </div>
                        {/* <div className='day__events__entry'>
                            <div className='day__events__amount' style={el.event.class === 'Dedit' ? { color: 'red' } : { color: 'green' }}>
                                {`Amt: ${el.event.amount}`}
                            </div>
                            <div className='day__events__balance'>
                                {`Bal: ${el.balance}`}
                            </div>
                        </div> */}
                    </div>
                )
            })
        }
    }

    const getTotal = () => {
        if (day[1]) {
            if (day[1].at(-1))
                return (
                    <div className='day__events__total' style={day[1].at(-1).balance < 0 ? { color: 'red' } : { color: 'green' }}>
                        {day[1].at(-1).balance}
                    </div>
                )
        }
    }

    return (
        <div className={`main-calendar-day ${getWeekendClass(day[0])} `}>
            <div className={`main-calendar-day-header ${getCurrentDayClass(day[0])}`}>
                <div className={`${getCurrentDayClass(day[0])}`}>
                    {day[0].getDate()}
                </div>
                {getTotal()}
            </div>
            <div className='day__body'>
                {getEvents()}
            </div>
        </div>
    )
}

export default Day
