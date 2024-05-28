import { Server } from 'socket.io';
import { organizationReport, userInfoReport, linkReportForCampaign  } from '../controllers/report.controller.js';

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.setMaxListeners(15);

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('organization-report', async (data) => {
            console.log('Received user data:', data);
            if (data) {
                try {
                    await organizationReport(socket, data);
                } catch (error) {
                    console.error('Error handling connection:', error);
                }
            }
        });

        socket.on('user-info', async (data) => {
            console.log(data);
            if (data) {
                try {
                    await userInfoReport(socket, data);
                } catch (error) {
                    console.error('Error handling connection:', error);
                }
            }
        })

        socket.on('link-report', async (data) => {
            console.log(data);
            if (data) {
                try {
                    await linkReportForCampaign(socket, data);
                } catch (error) {
                    console.error('Error handling connection:', error);
                }
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            clearInterval(socket.intervalId);
        });
    });
};

export {
    initializeSocket
};
