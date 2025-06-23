require('dotenv').config()

import express, { Request } from "express";
import jwt from "jsonwebtoken"
import auth from "./middleware";
import { prismaClient } from "@repo/db/clients"
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"

const app = express()
const PORT = 3001

app.use(express.json())

app.post("/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            msg: "incorrect input"
        })
        return
    }
    try {
        await prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({ msg: "signup" })
    } catch (error) {
        res.json({
            msg: "User already exist"
        })
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            msg: "Inputs are wrong"
        })
        return
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data?.email,
            password: parsedData.data?.password,
        }
    })
    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET)
    res.json({ token })
})

app.post("/room", auth, async (req: ResqustWithUser, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.json({
            msg: "Inputs are not right"
        })
        return
    }
    const userId = req.userId;
    console.log(userId)

    if (userId) {
        try {
            await prismaClient.room.create({
                data: {
                    slug: parsedData.data.name,
                    adminId: userId
                }
            })
            res.json({
                msg: "Room created"
            })
        } catch (error) {
            res.json({
                msg: "Room already exist"
            })
            return
        }
    } else {
        res.json({
            msg: "Something went wrong"
        })
        return
    }
})

app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);

    const message = await prismaClient.chat.findMany({
        where: {
            roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })

    res.json({
        msg:message
    })
})

app.get("/room/:slug",async (req,res)=>{
    const slug = req.params.slug
    const room = await prismaClient.room.findFirst({
        where:{
            slug
        }
    });
    res.json({
        room
    })
})
 
interface ResqustWithUser extends Request {
    userId?: string;
}

app.listen(PORT)