import express from "express";
import axios from "axios";
import crypto from "crypto";

const app = express();
app.use(express.json());

const NODES = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

// distribute shares to nodes
app.post("/distribute", async (req, res) => {
  const { shares } = req.body;

  await Promise.all(
    NODES.map((url, i) =>
      axios.post(`${url}/load-share`, {
        share: shares[i],
      })
    )
  );

  res.json({ status: "Shares distributed" });
});

// request partial signatures
app.post("/sign", async (req, res) => {
  const { message } = req.body;

  const responses = await Promise.all(
    NODES.map((url) => axios.post(`${url}/partial-sign`, { message }))
  );

  const partials = responses.map((r) => r.data.partialSignature);

  const finalSignature = crypto
    .createHash("sha256")
    .update(partials.join(":"))
    .digest("hex");

  res.json({
    message,
    partials,
    finalSignature,
  });
});

app.listen(4000, () => {
  console.log("Coordinator running on http://localhost:4000");
});
