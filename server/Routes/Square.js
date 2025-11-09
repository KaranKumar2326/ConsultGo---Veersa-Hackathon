const express = require("express");
const crypto = require("crypto");
const square = require("square");
require("dotenv").config();

const { SquareClient, SquareEnvironment } = square;

const router = express.Router();

const client = new SquareClient({
  environment: SquareEnvironment.Sandbox,
  token: process.env.SQUARE_ACCESS_TOKEN,
});


router.post("/api/square-pay", async (req, res) => {
  try {
    const { token, amount } = req.body;
    if (!token || !amount)
      return res.status(400).json({ error: "Missing token or amount" });

    const result = await client.payments.create({
      sourceId: token,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)),
        currency: "USD",
      },
    });
    
    const paymentSafe = JSON.parse(
      JSON.stringify(result.payment, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      )
    );

    res.json({ success: true, payment: paymentSafe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
