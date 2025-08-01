import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

const DATABASE_URL = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public`;

process.env.DATABASE_URL = DATABASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the microservices home!" });
});

router.get("/health", (req, res) => {
  res.json({
    message: `Pod is up as of ${new Date().toLocaleString()}`,
    status: "UP",
  });
});

router.get("/customers", async (req, res) => {
  const users = await prisma.customer.findMany();
  res.json(users);
});

router.get("/customers/:email", async (req, res) => {
  const { email } = req.params;
  const user = await prisma.customer.findUnique({
    where: { email: email },
  });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

router.post("/customers", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const newUser = await prisma.customer.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit /health for health check`);
  console.log(`Visit /customers to get users`);
});
