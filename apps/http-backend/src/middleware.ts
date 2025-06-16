import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface JwtPayload{
    userId?:string
}

interface ResqustWithUser extends Request{
    userId?:string;
}

export default function auth(req: ResqustWithUser, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    if (token) {
        const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
        console.log(decode)
        if (decode) {
            req.userId = decode.userId;
            next()
            return
        } else {
            res.status(403).json({
                message: "Unauthorized"
            })
            return
        }

    }
}