function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    const datePart = `${year}-${month}-${day}`;
    const timePart = `${hours}:${minutes}:${seconds}`;
    
    return { date: datePart, time: timePart };
}

function calculateDateRange(timeInterval, startDate, endDate) {
    let start_date, end_date;

    if (timeInterval === "ONE_DAY") {
        start_date = formatDateTime(new Date()).date;
        end_date = formatDateTime(new Date()).date;
    } else if (timeInterval === "ONE_WEEK") {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 7);
        end_date = formatDateTime(new Date()).date;
        start_date = formatDateTime(currentDate).date;
    } else if (timeInterval === "ONE_MONTH") {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30);
        start_date = formatDateTime(currentDate).date;
        end_date = formatDateTime(new Date()).date;
    } else if (timeInterval === "ONE_YEAR") {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 365);
        start_date = formatDateTime(currentDate).date;
        end_date = formatDateTime(new Date()).date;
    } else if (timeInterval === "CUSTOM") {
        start_date = startDate; 
        end_date = endDate;
    }

    return { start_date, end_date };
}





const reportInterval = {
    ONE_DAY : "ONE_DAY",
    ONE_WEEK : "ONE_WEEK",
    ONE_MONTH : "ONE_MONTH",
    ONE_YEAR : "ONE_YEAR",
    CUSTOM : "CUSTOM",
}

export {
    formatDateTime,
    reportInterval,
    calculateDateRange
}

