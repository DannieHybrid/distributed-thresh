import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

let shareC: number | null = null;

app.post("/load-share", (req, res) => {
  shareC = req.body.share;
  res.json({ status: "Node C share loaded" });
});

app.post("/partial-sign", (req, res) => {
  if (shareC === null) {
    return res.status(400).json({ error: "Share not initialized" });
  }

  const message = req.body.message;

  const partialSignature = crypto
    .createHash("sha256")
    .update(`${message}:${shareC}`)
    .digest("hex");

  res.json({
    node: "C",
    partialSignature,
  });
});

app.listen(3003, () => {
  console.log("Node C running on http://localhost:3003");
});
