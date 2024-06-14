const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const shippingInformationRoutes = require("./routes/shipping.route");
const userRoutes = require("./routes/user.route");
const pincodeRoutes = require("./routes/pincode.route");
const { authRouter, authMiddleware } = require("./routes/auth.route");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

app.use("/api/auth", authRouter);

app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/carts", authMiddleware, cartRoutes);
app.use("/api/shipping", authMiddleware, shippingInformationRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/pincodes", authMiddleware, pincodeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port 3001 ${process.env.PORT}`);
});
