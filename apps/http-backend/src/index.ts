import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types";
// import { prismaClient } from "@repo/db/client";

const app = express();

app.post("/signup", (req, res) => {

    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            message: "Invalid request body",
        });
        return;
    }
    res.json({
        userId: 1,
    })
})

app.post("/signin", (req, res) => {
    const userId = 1;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        token,
    })
})

app.post("/room", middleware, (req, res) => {
    res.json({
        roomId: 1,
    })
    
})

app.listen(3001)