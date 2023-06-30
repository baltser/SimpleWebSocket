import express, {Express, Request, Response} from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from "path";

const app:Express = express();

const server = http.createServer(app);

const ws = new WebSocket.Server({ server });
//HTTP Server
app.get('/', (req: Request, res: Response) => res.sendFile(
    path.join(__dirname, 'public', 'simple-websocket-client.html')
))

ws.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(8000, 'localhost',() => {
    console.log(`Server started on port localhost:8000`);
});