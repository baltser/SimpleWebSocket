import express, { Express, Request, Response }  from 'express';
import * as path from "path";
import {Server} from "ws";

const app: Express = express();

//HTTP Server
app.get('/', (req: Request, res: Response) => res.sendFile(
    path.join(__dirname, 'public', 'simple-websocket-client.html')
))

const httpServer = app.listen(8000, 'localhost',
    () => console.log(`Server работате `));

//WebSocket сервер
const wsServer = new Server({port: 8085});

wsServer.on('connection',
    wsClient => {
    wsClient.send('Это сообщение что отправил WebSocket sever');

    wsClient.onerror = (error) => console.log(`The server received: ${error}`)

    })