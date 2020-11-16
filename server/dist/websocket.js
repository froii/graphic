"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const WebSocket = require("ws");
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const INTERVAL_TIME = 200;
const wss = new WebSocket.Server({ server });
let id = 0;
const createData = () => ({
    id: id++,
    timestamp: Date.now(),
    data: Math.floor(Math.random() * 200),
    temperature: Math.floor(Math.random() * 200)
});
wss.on('connection', (ws) => {
    ws.isWorking = true;
    ws.on('pong', () => {
        ws.isWorking = true;
    });
});
const interval = setInterval(function ping() {
    wss.clients.forEach((ws) => {
        const extWs = ws;
        if (!extWs.isWorking)
            return ws.terminate();
        extWs.isWorking = false;
        ws.ping(() => {
            const newData = createData();
            ws.send(JSON.stringify(newData));
        });
    });
    wss.on("disconnect", () => {
        clearInterval(interval);
        wss.close();
        console.log("Client disconnected");
    });
}, INTERVAL_TIME);
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
//# sourceMappingURL=websocket.js.map