import express from "express";
import jwt from "jsonwebtoken"

const app = express()
const PORT = 3001

app.use(express.json())

app.post("/signup", (req, res) => {
    res.json({ msg: "signup" })
})

app.post("/signin", (req, res) => {
    res.json({ msg: "signin" })
})

app.post("/room", (req, res) => {
    res.json({ msg: "create-sign" })
})

app.listen(PORT)