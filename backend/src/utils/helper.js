const getFormattedDate = () => {
    const pad = (number, length) => {
        let str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    };

    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = pad(currentDate.getUTCMonth() + 1, 2);
    const day = pad(currentDate.getUTCDate(), 2);
    const hours = pad(currentDate.getUTCHours(), 2);
    const minutes = pad(currentDate.getUTCMinutes(), 2);
    const seconds = pad(currentDate.getUTCSeconds(), 2);
    const milliseconds = pad(currentDate.getUTCMilliseconds(), 3);
    const microseconds = pad(Math.floor(Math.random() * 1000), 3); 

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${microseconds}+00:00`;
};


export const calculateDateRanges = (timeInterval, startDate, endDate) => {
    const now = new Date();
    let start, end;

    switch (timeInterval) {
        case 'ONE_DAY':
            start = new Date(now);
            start.setDate(now.getDate() - 1);
            end = now;
            break;
        case 'ONE_WEEK':
            start = new Date(now);
            start.setDate(now.getDate() - 7);
            end = now;
            break;
        case 'ONE_MONTH':
            start = new Date(now);
            start.setMonth(now.getMonth() - 1);
            end = now;
            break;
        case 'ONE_YEAR':
            start = new Date(now);
            start.setFullYear(now.getFullYear() - 1);
            end = now;
            break;
        case 'CUSTOM':
            start = new Date(startDate);
            end = new Date(endDate);
            break;
        default:
            throw new Error('Invalid time interval');
    }

    return {
        start_date: start.toISOString(),
        end_date: end.toISOString()
    };
};

const hasDataChanged = (prevData, newData) => {
    return JSON.stringify(prevData) !== JSON.stringify(newData);
};



const reportInterval = {
    ONE_DAY : "ONE_DAY",
    ONE_WEEK : "ONE_WEEK",
    ONE_MONTH : "ONE_MONTH",
    ONE_YEAR : "ONE_YEAR",
    CUSTOM : "CUSTOM",
}

const datacubeDetails = (workspaceId) => {
    return {
        campaign_details: `${workspaceId}_campaign_details`,
        user_info: `${workspaceId}_user_info`,
        emails: `${workspaceId}_emails`,
        links: `${workspaceId}_links`,
        database_name: `${workspaceId}_samanta_campaign_db`
    };
};

// campaign_details: `64f03084a7058c23ee36cfc9_campaign_details`,
// user_info: `64f03084a7058c23ee36cfc9_user_info`,
// emails: `64f03084a7058c23ee36cfc9_emails`,
// links: `64f03084a7058c23ee36cfc9_links`,
// database_name: `64f03084a7058c23ee36cfc9_samanta_campaign_db`
export {
    getFormattedDate,
    reportInterval,
    hasDataChanged,
    datacubeDetails
}

