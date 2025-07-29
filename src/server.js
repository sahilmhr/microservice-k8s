import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/api/health for health check`);
  console.log(`Visit http://localhost:${PORT}/api/customers to get users`);
});
