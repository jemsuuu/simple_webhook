
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON requests
app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Webhook server is running!",
    endpoints: {
      health: "GET /health",
      webhook: "POST /webhook"
    }
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);

  res.status(200).json(req.body);``
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON or request body"
    });
  }

  next();
});

const crypto = require("node:crypto");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
