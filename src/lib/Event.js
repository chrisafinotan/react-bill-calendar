import dayjs from "dayjs";
var weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);

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
    // console.log(
    //     `event, start date day: ${dayjs(startDate).day()}, month: ${dayjs(
    //         startDate
    //     ).month()}, year: ${dayjs(startDate).year()}`
    // );

    let [start__Day, start__Month, start__Year] = [
        dayjs(startDate).day(),
        dayjs(startDate).month(),
        dayjs(startDate).year(),
        // startDate.getDate(),
        // startDate.getMonth(),
        // startDate.getFullYear(),
    ];
    if (!endDate) endDate = new Date(start__Year + 1, start__Month, start__Day);
    let [end__Day, end__Month, end__Year] = [
        dayjs(endDate).day(),
        dayjs(endDate).month(),
        dayjs(endDate).year(),
        // endDate.getDate(),
        // endDate.getMonth(),
        // endDate.getFullYear(),
    ];

    const DailyRepeat = (freq) => {
        //event occurs every 'freq' days
        let currDate = startDate;
        let eventsArray = [];
        let currDay = start__Day;

        while (currDate <= endDate) {
            let newEventObj = {
                date: dayjs(currDate),
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
        // console.log("daily repeating event", dailyRepeatEvents);
        return dailyRepeatEvents;
    };

    const getFirstDayOfWeek = (d) => {
        const date = new Date(d);
        let first = dayjs(date)
            .weekday(0)
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0)
            .set("millisecond", 0);
        return first;
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
        let nextdate;

        if (!days) {
            days = [currDate.getDay()];
        }

        while (currDate <= endDate) {
            let firstDayOfWeek = getFirstDayOfWeek(currDate);
            nextdate = firstDayOfWeek.day();
            for (let day of days) {
                let eventday = dayjs(firstDayOfWeek).day(
                    firstDayOfWeek.day() + day
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

            nextdate += freq * 7;
            currDate = dayjs(firstDayOfWeek).day(nextdate);
        }

        let weeklyRepeatEvents = {
            name: `${name}_repeating_week`,
            events: eventsArray,
        };
        // console.log("weekly repeating event", weeklyRepeatEvents);
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
                let newEventObj = {
                    date: dayjs(eventday),
                    name: name,
                    type: type,
                    amount: amount,
                    event_class: event_class,
                };
                eventsArray.push(NewEvent(newEventObj));
            }
            // let lastDate = new Date(lastDayOfMonth);
            currDate = new Date(lastDayOfMonth).setHours(24);
        }

        let monthlyRepeatEvents = {
            name: `${name}_repeating_month`,
            events: eventsArray,
        };
        // console.log("monthly repeating event", monthlyRepeatEvents);
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

export function CreateSingleEvent(date, name, type, amount, event_class) {
    let newEventObj = {
        date: dayjs(date),
        name: name,
        type: type,
        amount: amount,
        event_class: event_class,
    };
    let singleEvent = {
        name: name,
        event: NewEvent(newEventObj),
    };
    return singleEvent;
}
