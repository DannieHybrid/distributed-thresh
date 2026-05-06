import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

let shareB: number | null = null;

app.post("/load-share", (req, res) => {
  shareB = req.body.share;
  res.json({ status: "Node B share loaded" });
});

app.post("/partial-sign", (req, res) => {
  if (shareB === null) {
    return res.status(400).json({ error: "Share not initialized" });
  }

  const message = req.body.message;

  const partialSignature = crypto
    .createHash("sha256")
    .update(`${message}:${shareB}`)
    .digest("hex");

  res.json({
    node: "B",
    partialSignature,
  });
});

app.listen(3002, () => {
  console.log("Node B running on http://localhost:3002");
});
