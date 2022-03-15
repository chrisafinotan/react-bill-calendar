import dayjs from "dayjs";
export function Balance(startdate, enddate, events, currentBalance = 100) {
    if (!events) return null;
    //sort events by date
    const sortBills = () => {
        let sortVal = "date";
        function compare(a, b) {
            if (a[sortVal] < b[sortVal]) {
                return -1;
            }
            if (a[sortVal] > b[sortVal]) {
                return 1;
            }
            return 0;
        }
        return events.sort(compare);
    };

    //filter events by date
    const filterBills = (start, end, events) => {
        return events.filter((event) => {
            if (start <= event.date && event.date <= end) return event;
        });
    };

    const filterBills2 = (start, end, events) => {
        return events.filter((event) => {
            let ans = dayjs(event.date).isBetween(dayjs(start), dayjs(end));
            if (ans) return event;
        });
    };

    const calculateBalance = (start, end, events, initial) => {
        let balance = initial;
        return filterBills2(start, end, events).map((event) => {
            if (event.class === "Credit") {
                balance += event.amount;
            } else {
                balance -= event.amount;
            }
            return {
                balance: Number(balance).toFixed(2),
                // date: event.date.set("second", 0),
                date: event.date,
                event: event,
            };
        });
    };

    let sortedBills = sortBills();

    let calculatedBalance = calculateBalance(
        startdate,
        enddate,
        sortedBills,
        currentBalance
    );

    return calculatedBalance;
}
