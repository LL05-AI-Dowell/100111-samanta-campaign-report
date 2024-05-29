import { Server } from 'socket.io';
import { organizationReport, userInfoReport, linkReportForCampaign } from '../controllers/report.controller.js';
import {logError, logInfo } from '../utils/helper.js';

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.setMaxListeners(15);

    io.on('connection', (socket) => {
        logInfo(`User connected: ${socket.id}`);

        socket.on('organization-report', async (data) => {
            logInfo(`Received 'organization-report' event with data: ${JSON.stringify(data)}`);
            if (data) {
                try {
                    await organizationReport(socket, data);
                } catch (error) {
                    logError('Error handling organization-report connection:', error);
                }
            }
        });

        socket.on('user-info', async (data) => {
            logInfo(`Received 'user-info' event with data: ${JSON.stringify(data)}`);
            if (data) {
                try {
                    await userInfoReport(socket, data);
                } catch (error) {
                    logError('Error handling user-info connection:', error);
                }
            }
        });

        socket.on('link-report', async (data) => {
            logInfo(`Received 'link-report' event with data: ${JSON.stringify(data)}`);
            if (data) {
                try {
                    await linkReportForCampaign(socket, data);
                } catch (error) {
                    logError('Error handling link-report connection:', error);
                }
            }
        });

        socket.on('disconnect', () => {
            logInfo(`User disconnected: ${socket.id}`);
            clearInterval(socket.intervalId);
        });
    });
};

export { initializeSocket };
