import { organizationReports, userInfo, linksReport } from '../services/report.js';
import { logError, logInfo } from '../utils/helper.js';

const organizationReport = async (socket, userData) => {
    const { timeInterval, startDate, endDate, creatorId, apiKey, limit, offset } = userData;

    socket.intervalId = setInterval(async () => {
        try {
            logInfo(`Fetching organization reports for: ${JSON.stringify(userData)}`);
            const currentData = await organizationReports(timeInterval, startDate, endDate, creatorId, apiKey, limit, offset);
            const dateTime = new Date();
            if (!currentData.success) {
                logInfo('Organization report fetch failed');
                socket.emit('orgData', { success: false, message: currentData.message, dateTime: dateTime });
            } else {
                logInfo('Organization report fetched successfully');
                socket.emit('orgData', { success: true, message: currentData.message, response: currentData.response, dateTime: dateTime });
            }
        } catch (error) {
            logError('Error fetching organization reports:', error);
        }
    }, 10000);
};

const userInfoReport = async (socket, userData) => {
    const { creatorId, apiKey } = userData;

    try {
        logInfo(`Fetching user info for: ${JSON.stringify(userData)}`);
        const currentData = await userInfo(creatorId, apiKey);
        const dateTime = new Date();
        if (!currentData.success) {
            logInfo('User info fetch failed');
            socket.emit('userinfo', { success: false, message: currentData.message, dateTime: dateTime });
        } else {
            logInfo('User info fetched successfully');
            socket.emit('userinfo', { success: true, message: currentData.message, response: currentData.response, dateTime: dateTime });
        }
    } catch (error) {
        logError('Error fetching user info:', error);
    }
};

const linkReportForCampaign = async (socket, data) => {
    const { creatorId, campaignId, apiKey, limit, offset } = data;

    socket.intervalId = setInterval(async () => {
        try {
            logInfo(`Fetching link reports for campaign: ${JSON.stringify(data)}`);
            const currentData = await linksReport(creatorId, campaignId, apiKey, limit, offset);
            const dateTime = new Date();
            if (!currentData.success) {
                logInfo('Link report fetch failed');
                socket.emit('linkData', { success: false, message: currentData.message, dateTime: dateTime });
            } else {
                logInfo('Link report fetched successfully');
                socket.emit('linkData', { success: true, message: currentData.message, response: currentData.response, dateTime: dateTime });
            }
        } catch (error) {
            logError('Error fetching link reports:', error);
        }
    }, 10000);
};

export { organizationReport, userInfoReport, linkReportForCampaign };
