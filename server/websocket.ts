import * as http from 'http';
import * as express from 'express';
import * as WebSocket from 'ws';

require('dotenv').config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
const INTERVAL_TIME = 200;

const wss = new WebSocket.Server({ server });

interface ExtWebSocket extends WebSocket {
  isWorking: boolean;
}

let id = 0;

const createData = () => ({
  id: id++,
  timestamp: Date.now(),
  data: Math.floor(Math.random() * 200),
  temperature: Math.floor(Math.random() * 200)
})

wss.on('connection', (ws: ExtWebSocket) => {
  ws.isWorking = true;

  ws.on('pong', () => {
    ws.isWorking = true;
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach((ws: WebSocket) => {
    const extWs = ws as ExtWebSocket;
    if (!extWs.isWorking) return ws.terminate();
    extWs.isWorking = false;

    ws.ping(()=>{
      const newData = createData()
      ws.send(JSON.stringify(newData));
    });
  });

  wss.on("disconnect", () => {
    clearInterval(interval);
    wss.close()
    console.log("Client disconnected");
  });
}, INTERVAL_TIME);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
