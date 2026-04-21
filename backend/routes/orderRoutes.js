const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items, address, paymentMethod, totalAmount, orderId } = req.body;

    if (!items || !items.length || !address || !paymentMethod || !totalAmount || !orderId) {
      return res.status(400).json({ success: false, message: "Missing required order fields." });
    }

    const order = await Order.create({
      items,
      address,
      paymentMethod,
      totalAmount,
      orderId
    });

    return res.status(201).json({ success: true, orderId: order.orderId });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create order." });
  }
});

module.exports = router;
