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
    // console.log("sorted", sortedBills);
    let filteredBills = filterBills(startdate, enddate, sortedBills);
    // console.log("filtered", filteredBills);
    let calculatedBalance = calculateBalance(
        startdate,
        enddate,
        sortedBills,
        currentBalance
    );

    // console.log("balance", calculatedBalance);
    // console.log(
    //     "balance",
    //     calculatedBalance[calculatedBalance.length - 1].balance
    // );
    return calculatedBalance;
    // return calculatedBalance.flatMap((el, index) => {
    //     if (index < calculatedBalance.length - 2) {
    //         if (calculatedBalance[index + 1].date === el.date) {
    //             calculatedBalance[index + 1].balance = calculatedBalance[index + 1].balance + el.balance;
    //             console.log(el, calculatedBalance[index + 1]);
    //             return [];
    //         }
    //         return [el]
    //     } else {
    //         return [el];
    //     }
    // }).map(el => {
    //     return {
    //         balance: el.balance,
    //         date: new Date(el.date),
    //     };
    // });
}
