import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./src/routes/index.js";
import config from "./src/config/index.js";
import http from "http";
import { initializeSocket } from "./src/controllers/samanta.socket.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const server = http.createServer(app);

app.use("/api/v1/", routes);

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Backend services are running fine"
    });
});

app.all("*", (_req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

initializeSocket(server);

server.on('error', (error) => {
    console.error(`Server error: ${error}`);
    process.exit(1);
});

const onListening = () => {
    console.log(`Listening on port ${config.PORT}`);
};

try {
    server.listen(config.PORT, onListening);
} catch (error) {
    console.error('Failed to start the server', error);
    process.exit(1);
}
