import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Invalid request body",
    });
    return;
  }
  try {
    await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: parsedData.data?.password,
        name: parsedData.data?.name,
      },
    });
    res.json({
      userId: "123",
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    token,
  });
});

app.post("/room", middleware, (req, res) => {
  res.json({
    roomId: 1,
  });
});

app.listen(3001);
