import express from "express";
import cors from "cors";
import useGraph from "./services/graph.ai.service.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/battle", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await useGraph(message);
    res.json(result);
  } catch (error: any) {
    console.error("Battle error:", error);
    res.status(500).json({ error: error.message || "Failed to conduct battle" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
