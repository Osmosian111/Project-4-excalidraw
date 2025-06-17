require("dotenv").config()

import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db/clients"

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = []

function checkUser(token: string): string | null {
    try {
        const decode = jwt.verify(token, JWT_SECRET);

        if (typeof decode == "string") return null

        if (!decode || !decode.userId) return null
        return decode.userId
    } catch (error) {
        return null
    }
}

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return
    }
    const queryPrams = new URLSearchParams(url.split('?')[1]);
    const token = queryPrams.get('token') ?? " ";

    const userId = checkUser(token)

    if (!userId) {
        ws.close()
        return null
    }

    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on('message', async function message(dataBinary) {
        const data = dataBinary.toString()
        if (!(typeof data == "string")) {
            return
        }
        const parsedData = JSON.parse(data)

        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws == ws);
            user?.rooms.push(parsedData.roomId)
        }

        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws == ws)
            user?.rooms.filter(x => x != parsedData.roomId)
        }

        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            await prismaClient.chat.create({
                data: {
                    message, roomId, userId
                }
            })

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message,
                        roomId
                    }))
                }
            })
        }
    });

});