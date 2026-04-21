const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Listing = require("./models/listings");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orderRoutes");
const initdata = require("../seed/data.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    const productCount = await Listing.countDocuments();
    if (productCount === 0) {
      await Listing.insertMany(initdata.data);
      console.log("Seeded products into MongoDB");
    }
  })
  .catch((err) => console.log("DB Error:", err));

app.get("/api/products", (req, res) => {
  res.json(initdata.data);
});

// Existing product route logic preserved
app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching listings" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
