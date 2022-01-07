import Day from './Day'
const Month = ({ month }) => {
    return (
        <div className='main-calendar-month'>
            {month.map((row, week_index) => {
                return (
                    <div className={`main-calendar-week`} key={`${week_index}`} >
                        {row.map((day, day_index) => {
                            return (
                                <Day day={day} key={`${week_index}-${day_index}`} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Month
