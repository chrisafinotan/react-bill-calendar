export function Balance(startdate, enddate, events, currentBalance = 100) {
    //get current balance
    if (!events) return null;
    startdate = new Date(startdate.setHours(-24));
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

    const calculateBalance = (start, end, events, initial) => {
        let balance = initial;
        return filterBills(start, end, events).map((event) => {
            if (event.class === "Credit") {
                balance += event.amount;
            } else {
                balance -= event.amount;
            }
            return {
                balance: Number(balance).toFixed(2),
                date: event.date.setHours(0, 0, 0, 0),
                event: event,
            };
        });
    };

    let sortedBills = sortBills();
    let filteredBills = filterBills(startdate, enddate, sortedBills);
    let calculatedBalance = calculateBalance(
        startdate,
        enddate,
        sortedBills,
        currentBalance
    );

    return calculatedBalance;
}
