const WeekHeader = ({ month }) => {

    let weekHeader = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']
    return (
        <div className='main__calendar__week__header'>
            {/* {month.matrix[0].map((el, i) => { */}
            {weekHeader.map((el, i) => {
                return (
                    <div className='main__calendar__week__header__element' key={`calendat_header_${el}`}>
                        {el.toString()}
                    </div>
                )
            })}
        </div>
    )
}

export default WeekHeader
