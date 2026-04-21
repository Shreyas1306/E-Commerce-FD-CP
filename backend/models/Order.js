const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    items: { type: Array, required: true },
    address: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, default: "" },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    totalAmount: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
