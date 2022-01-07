const WeekHeader = ({ month }) => {

    let weekHeader = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']
    return (
        <div className='main-calendar-week-header'>
            {/* {month.matrix[0].map((el, i) => { */}
            {weekHeader.map((el, i) => {
                return (
                    <div className='main-calendar-header-element'>
                        {el.toString()}
                    </div>
                )
            })}
        </div>
    )
}

export default WeekHeader
