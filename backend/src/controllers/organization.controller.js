import { hasDataChanged } from "../utils/helper.js";
import { organizationReports } from '../services/report.js';


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


export {
    organizationReport
}