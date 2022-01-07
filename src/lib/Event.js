import dayjs from "dayjs";

export function NewEvent({ date, name, type, amount, event_class }) {
    return {
        date: date,
        name: name,
        type: type,
        amount: Number(amount),
        class: event_class,
    };
}

export function CreateRepeatingEvent(
    startDate,
    endDate,
    name,
    type,
    amount,
    event_class,
    repeatParams
) {
    let [repeatType, repeatFrequency, repeatDays, repeatWeek, repeatMonth] =
        repeatParams;
    let repeatingEventList;

    let [start__Day, start__Month, start__Year] = [
        startDate.getDate(),
        startDate.getMonth(),
        startDate.getFullYear(),
    ];
    if (!endDate) endDate = new Date(start__Year + 1, start__Month, start__Day);
    let [end__Day, end__Month, end__Year] = [
        endDate.getDate(),
        endDate.getMonth(),
        endDate.getFullYear(),
    ];

    const DailyRepeat = (freq) => {
        //event occurs every 'freq' days
        let currDate = startDate;
        let eventsArray = [];
        let currDay = start__Day;

        while (currDate <= endDate) {
            let newEventObj = {
                date: currDate,
                name: name,
                type: type,
                amount: amount,
                event_class: event_class,
            };

            eventsArray.push(NewEvent(newEventObj));
            currDay += freq;
            currDate = new Date(start__Year, start__Month, currDay);
        }

        let dailyRepeatEvents = {
            name: `${name}_repeating_day`,
            events: eventsArray,
        };
        return dailyRepeatEvents;
    };

    const getFirstDayOfWeek = (d) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day;
        return new Date(date.setDate(diff));
    };

    const getFirstDayOfMonth = (d) => {
        const date = new Date(d);
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    const getLastDayOfMonth = (d, index) => {
        const date = new Date(d);
        return new Date(date.getFullYear(), date.getMonth() + index, 0);
    };

    const getFirstDayOfNextMonth = (d, index) => {
        const date = new Date(d);
        return new Date(date.getFullYear(), date.getMonth() + index, 1);
    };

    const WeeklyRepeat = (freq, days) => {
        //event occurs every 'freq' week(s) on days specified in 'days'
        let currDate = startDate;
        let eventsArray = [];
        let currDay = start__Day;

        if (!days) {
            days = [currDate.getDay()];
        }

        while (currDate <= endDate) {
            let firstDayOfWeek = getFirstDayOfWeek(currDate);
            for (let day of days) {
                let eventday = new Date(
                    currDate.setDate(firstDayOfWeek.getDate() + day)
                );
                let newEventObj = {
                    date: eventday,
                    name: name,
                    type: type,
                    amount: amount,
                    event_class: event_class,
                };
                eventsArray.push(NewEvent(newEventObj));
            }

            currDay += freq * 7;
            currDate = new Date(start__Year, start__Month, currDay);
        }

        let weeklyRepeatEvents = {
            name: `${name}_repeating_week`,
            events: eventsArray,
        };
        return weeklyRepeatEvents;
    };

    const MonthlyRepeat = (freq, days) => {
        //event occurs every 'freq' week(s) on days specified in 'days'
        let currDate = startDate;
        let eventsArray = [];

        if (!days) {
            days = [currDate.getDay()];
        }
        let index = 0;
        while (currDate <= endDate) {
            index += freq;
            let firstDayOfMonth = getFirstDayOfMonth(currDate);
            // let firstDayOfNextMonth = getFirstDayOfNextMonth(currDate, index);
            let lastDayOfMonth = getLastDayOfMonth(currDate, freq);
            for (let day of days) {
                let eventday = new Date(firstDayOfMonth.setDate(day));
                // console.log(index, eventday, day, firstDayOfMonth);
                let newEventObj = {
                    date: eventday,
                    name: name,
                    type: type,
                    amount: amount,
                    event_class: event_class,
                };
                eventsArray.push(NewEvent(newEventObj));
            }

            let lastDate = new Date(lastDayOfMonth);
            currDate = new Date(lastDayOfMonth).setHours(24);
            // console.log("curr", currDate, lastDate);
        }

        let monthlyRepeatEvents = {
            name: `${name}_repeating_month`,
            events: eventsArray,
        };
        return monthlyRepeatEvents;
    };

    switch (repeatType) {
        case "Daily":
            repeatingEventList = DailyRepeat(repeatFrequency);
            break;
        case "Weekly":
            repeatingEventList = WeeklyRepeat(repeatFrequency, repeatDays);
            break;
        case "Monthly":
            repeatingEventList = MonthlyRepeat(repeatFrequency, repeatWeek);
            break;
        // case "Yearly":
        //     repeatingEventList = YearlyRepeat(
        //         repeatFrequency,
        //         repeatMonth,
        //         repeatDay
        //     );
        //     break;
        default:
            repeatingEventList = [];
            break;
    }
    return repeatingEventList;
}
