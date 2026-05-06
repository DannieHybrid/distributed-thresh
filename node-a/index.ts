import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

// Secret share held ONLY by Node A
let shareA: number | null = null;

// Load share into node (simulating MPC key distribution)
app.post("/load-share", (req, res) => {
  shareA = req.body.share;
  res.json({ status: "Node A share loaded" });
});

// Partial signing (MPC simulation)
app.post("/partial-sign", (req, res) => {
  if (shareA === null) {
    return res.status(400).json({ error: "Share not initialized" });
  }

  const message = req.body.message;

  // Simulated cryptographic operation
  const partialSignature = crypto
    .createHash("sha256")
    .update(`${message}:${shareA}`)
    .digest("hex");

  res.json({
    node: "A",
    partialSignature,
  });
});

app.listen(3001, () => {
  console.log("Node A running on http://localhost:3001");
});
