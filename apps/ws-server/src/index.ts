require("dotenv").config()

import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = []

function checkUser(token:string):boolean{
    const decode = jwt.verify(token, JWT_SECRET);

    if (typeof decode == "string") return false

    if (!decode || !decode.userId) return false
    return true
}

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return
    }
    const queryPrams = new URLSearchParams(url.split('?')[1]);
    const token = queryPrams.get('token') ?? " ";
    
    checkUser(token)

    ws.on('message', function message(data) {
        ws.send('pong');
    });

});