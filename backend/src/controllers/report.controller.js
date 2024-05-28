import { organizationReports, userInfo, linksReport } from '../services/report.js';


const organizationReport = async (socket, userData) => {
    const { timeInterval, startDate, endDate, creatorId, apiKey,limit,offset } = userData;

    socket.intervalId = setInterval(async () => {
        try {
            const currentData = await organizationReports(timeInterval, startDate, endDate, creatorId, apiKey,limit,offset);
            const dateTime = new Date();
            if (!currentData.success) {
                socket.emit('orgData', { success: false, message: currentData.message, dateTime: dateTime });
            } else {
                socket.emit('orgData', { success: true,message: currentData.message, response: currentData.response, dateTime: dateTime });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, 10000);
};

const userInfoReport = async (socket, userData) => {
    const { creatorId, apiKey } = userData;

    try {
        const currentData = await userInfo(creatorId, apiKey);
        const dateTime = new Date();
        if (!currentData.success) {
            socket.emit('userinfo', { success: false, message: currentData.message, dateTime: dateTime });
        } else {
            socket.emit('userinfo', { success: true, message: currentData.message, response: currentData.response, dateTime: dateTime });
        }
    } catch (error) {
        console.error('Error fetching user info data:', error);
    }
};


const linkReportForCampaign = async (socket, data) => {
    const { creatorId, campaignId, apiKey,limit, offset } = data;
    socket.intervalId = setInterval(async () => {
        try {
            const currentData = await linksReport(creatorId, campaignId, apiKey,limit, offset);
            const dateTime = new Date();
            if (!currentData.success) {
                socket.emit('linkData', { success: false, message: currentData.message, dateTime: dateTime });
            } else {
                socket.emit('linkData', { success: true, message: currentData.message, response: currentData.response, dateTime: dateTime });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, 10000);
}


export {
    organizationReport,
    userInfoReport,
    linkReportForCampaign
}