import express, {Express, Request, Response} from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from "path";
//HTTP Server
const app:Express = express();

const server = http.createServer(app);
app.get('/', (req: Request, res: Response) => res.sendFile(
    path.join(__dirname, 'public', 'simple-websocket-client.html')
));

const ws = new WebSocket.Server({ server });
ws.on('connection', (connection: WebSocket, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`Connected ${ip}`);
    connection.on('message', (message) => {
        console.dir('Received: ' + message);
        for (const client of ws.clients) {
            if (client.readyState !== WebSocket.OPEN) continue;
            if (client === connection) continue;
            client.send(message, { binary: false });
        }
    });
    connection.on('close', () => {
        console.log(`Disconnected ${ip}`);
    });
});
server.listen(8000, 'localhost',() => {
    console.log(`Server started on port localhost:8000`);
});