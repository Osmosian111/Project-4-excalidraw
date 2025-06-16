import { z } from "zod"

export const CreateUserSchema = z.object({
    email: z.string().min(5).max(50),
    password: z.string().min(8).max(50),
    name: z.string()
})

export const SigninSchema = z.object({
    email: z.string().min(5).max(50),
    password: z.string()
})

export const CreateRoomSchema = z.object({
    name: z.string().min(5).max(50)
})