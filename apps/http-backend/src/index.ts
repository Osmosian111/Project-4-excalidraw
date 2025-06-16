require('dotenv').config()

import express from "express";
import jwt from "jsonwebtoken"
import auth from "./middleware";
import { prismaClient } from "@repo/db/clients"
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types"

const app = express()
const PORT = 3001

app.use(express.json())

app.post("/signup",async (req, res) => {
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
            msg:"User already exist"
        })
    }
})

app.post("/signin",async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData){
        res.json({
            msg:"Inputs are wrong"
        })
        return
    }
    const user = await prismaClient.user.findFirst({
        where:{
            email:parsedData.data?.email,
            password:parsedData.data?.email,
        }
    })

    const token = jwt.sign({
        id:user?.id
    }, JWT_SECRET)
    res.json({ token })
})

app.post("/room", auth, (req, res) => {
    res.json({ msg: "create-sign" })
})

app.listen(PORT)