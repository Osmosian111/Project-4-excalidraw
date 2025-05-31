require('dotenv').config()

import express from "express";
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config";
import auth from "./middleware";
import { CreateUserSchema } from "@repo/common/types"
console.log("line 7 of http-server JWT-Secret : " + JWT_SECRET)

const app = express()
const PORT = 3001

app.use(express.json())

app.post("/signup", (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            msg: "incorrect input"
        })
        return
    }
    res.json({ msg: "signup" })
})

app.post("/signin", (req, res) => {
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({ token })
})

app.post("/room", auth, (req, res) => {
    res.json({ msg: "create-sign" })
})

app.listen(PORT)