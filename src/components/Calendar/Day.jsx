import dayjs from 'dayjs'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="left" />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'var(--p__bg__color)',
        color: 'var(--main__font__color)',
        maxWidth: 'none',
        fontSize: theme.typography.pxToRem(24),
        border: '1px solid var(--p__font__color)',
    },
}));

const Day = ({ day }) => {
    const getCurrentDayClass = (day) => {
        return day.setHours(0, 0, 0, 0).toString() === new Date().setHours(0, 0, 0, 0).toString() && 'currentDay'
    }

    const getWeekendClass = (day) => {
        return (dayjs(day).format('dd') === 'Su' || dayjs(day).format('dd') === 'Sa') && 'weekend';
    }

    const getEvents = () => {
        if (day[1]) {
            return day[1].map(el => {
                let tooltip = (
                    <div className='day__events__entry'>
                        <div className='day__events__amount' style={el.event.class === 'Debit' ? { color: 'var(--s__red__color)' } : { color: 'var(--s__green__color)' }}>
                            {`Amount: ${el.event.amount}`}
                        </div>
                        <div className='day__events__balance'>
                            {`Balance: ${el.balance}`}
                        </div>
                    </div>
                )

                return (
                    <CustomTooltip title={tooltip} arrow key={`day_event_${el.event.name}`}>
                        <div className='day__events' style={el.event.class === 'Debit' ? { backgroundColor: 'var(--s__red__color)' } : { backgroundColor: 'var(--s__green__color)' }}
                        >
                            <div className='day__events__name'>
                                {`${el.event.name}`}
                            </div>
                        </div>
                    </CustomTooltip>
                )
            })
        }
    }

    const getTotal = () => {
        if (day[1]) {
            if (day[1].at(-1))
                return (
                    <div className='day__events__total' style={day[1].at(-1).balance < 0 ? { color: 'var(--p__red__color)' } : { color: 'var(--p__green__color)' }}>
                        {day[1].at(-1).balance}
                    </div>
                )
        }
    }

    return (
        <div className={`main__calendar__day ${getWeekendClass(day[0])} `}>
            <div className={`main__calendar__day__header ${getCurrentDayClass(day[0])}`}>
                <div className={`${getCurrentDayClass(day[0])}`}>
                    {day[0].getDate() === 1 && dayjs(day[0]).format('MMM ')}{day[0].getDate()}
                </div>
                {getTotal()}
            </div>
            <div className='main__calendar__day__body'>
                {getEvents()}
            </div>
        </div>
    )
}

export default Day
