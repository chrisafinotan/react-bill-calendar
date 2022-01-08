//calendar functions using dayjs
import dayjs from "dayjs";
const CAL_NUM_ROWS = 6;
const CAL_NUM_DAYS = 7;

export function getMonth(month = dayjs().month()) {
    const year = dayjs().year();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 1).getDate();

    // console.log(`day:${firstDayOfMonth}, year: ${year}, month:${month}`)
    let currentDayCounter = 0 - firstDayOfMonth;

    const daysMatrix = new Array(CAL_NUM_ROWS).fill([]).map(() => {
        return new Array(CAL_NUM_DAYS).fill(null).map(() => {
            currentDayCounter++;
            return new Date(year, month, currentDayCounter);
        });
    });

    let firstDate = daysMatrix[0][0];
    let lastDate = daysMatrix[CAL_NUM_ROWS-1][CAL_NUM_DAYS-1];
    // console.log(firstDate, lastDate)

    return {
        month: month,
        year: year,
        firstDate: firstDate,
        lastDate: lastDate,
        startDate: new Date(year, month, 1),
        endDate: new Date(year, month + 1, 0),
        matrix: daysMatrix,
    };
}

export function month__Events(month, monthEvents) {
    return month.matrix.map((week) => {
        return week.map((day) => {
            let found = monthEvents.filter((el) => 
                new Date(el.date).toDateString() === day.toDateString()
            );
            return [day, found];
        });
    });
}

export function getDay(day = dayjs().day()) {
    const year = dayjs().year();
    const month = dayjs().month();
    const specificDay = dayjs(new Date(year, month, day));
}
