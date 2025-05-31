require("dotenv").config()

import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
const wss = new WebSocketServer({ port: 8080 });

console.log("line 8 of ws-server JWT-Secret : " + JWT_SECRET)

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return
    }
    const queryPrams = new URLSearchParams(url.split('?')[1]);
    const token = queryPrams.get('token') ?? " ";
    const decode = jwt.verify(token, JWT_SECRET);

    if (typeof decode == "string") return

    if (!decode || !decode.userId) {
        ws.close()
        return
    }

    ws.on('message', function message(data) {
        ws.send('pong');
    });

});