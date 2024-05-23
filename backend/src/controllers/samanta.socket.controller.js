import { Server } from 'socket.io';
import { hasDataChanged } from "../utils/helper.js";
import { fetchDataFromDatacube } from '../services/samantaData.js';

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

        let previousData = null;

        socket.on('userData', async (userData) => {
            console.log('Received user data:', userData);
            if (userData) {
                try {
                    await handleConnection(socket, userData, previousData);
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

const handleConnection = async (socket, userData, previousData) => {
    const { timeInterval, startDate, endDate, creatorId, apiKey,limit,offset } = userData;


    socket.intervalId = setInterval(async () => {
        try {
            const currentData = await fetchDataFromDatacube(timeInterval, startDate, endDate, creatorId, apiKey,limit,offset);
            const dateTime = new Date();
            if (!currentData.success) {
                socket.emit('dataUpdate', { success: false, message: currentData.message, dateTime: dateTime });
            } else if (previousData === null || hasDataChanged(previousData.response, currentData.response)) {
                socket.emit('dataUpdate', { success: true,message: currentData.message, response: currentData.response, dateTime: dateTime });
                previousData = currentData;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, 30000);
};

export {
    initializeSocket
};
