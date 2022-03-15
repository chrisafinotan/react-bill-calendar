import Day from './Day'
const Month = ({ month }) => {
    // console.log('month', month)
    return (
        <div className='main__calendar__month__wrapper'>
            {month.map((row, week_index) => {
                return (
                    <div className={`main__calendar__week`} key={`${week_index}`} >
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
