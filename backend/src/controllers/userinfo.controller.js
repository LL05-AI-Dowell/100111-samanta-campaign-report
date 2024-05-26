import { userInfo } from '../services/report.js';

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

export {
    userInfoReport
};
