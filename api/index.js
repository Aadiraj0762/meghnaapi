// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const mongoose = require('mongoose');
// const { connectDB } = require("../config/db");
// const productRoutes = require("../routes/productRoutes");
// const customerRoutes = require("../routes/customerRoutes");
// const storeRoutes = require("../routes/storeRoutes");
// const adminRoutes = require("../routes/adminRoutes");
// const orderRoutes = require("../routes/orderRoutes");
// const customerOrderRoutes = require("../routes/customerOrderRoutes");
// const categoryRoutes = require("../routes/categoryRoutes");
// const couponRoutes = require("../routes/couponRoutes");
// const attributeRoutes = require("../routes/attributeRoutes");
// const settingRoutes = require("../routes/settingRoutes");
// const currencyRoutes = require("../routes/currencyRoutes");
// const languageRoutes = require("../routes/languageRoutes");
// const cartitemRoutes = require("../routes/cartitemRoutes");
// const { isAuth, isAdmin } = require("../config/auth");
// const bodyParser = require('body-parser')
// connectDB();
// const app = express();
// app.set("trust proxy", 1);
// app.use(express.json({ limit: "4mb" }));
// app.use(helmet());
// app.use(cors());
// //root route
// app.get("/", (req, res) => {
//   res.send("App works properly!");
// });
// //this for route will need for store front, also for admin dashboard
// app.use("/api/products/", productRoutes);
// app.use("/api/store/", storeRoutes);
// app.use("/api/category/", categoryRoutes);
// app.use("/api/coupon/", couponRoutes);
// app.use("/api/customer/", customerRoutes);
// app.use("/api/order/", isAuth, customerOrderRoutes);
// app.use("/api/attributes/", attributeRoutes);
// app.use("/api/setting/", settingRoutes);
// app.use("/api/currency/", isAuth, currencyRoutes);
// app.use("/api/language/", languageRoutes);
// //if you not use admin dashboard then these two route will not needed.
// app.use("/api/admin/", adminRoutes);
// app.use("/api/orders/", orderRoutes);
// app.use("/api/stores", storeRoutes);
// app.use("/api/cart", cartitemRoutes);
// // Use express's default error handling middleware
// app.use((err, req, res, next) => {
//   if (res.headersSent) return next(err);
//   res.status(400).json({ message: err.message });
// });
// let cartItems = [];
// app.use(bodyParser.json());
// // app.post('/api/add-to-cart', (req, res) => { const { productId, quantity } = req.body;
// // const productIndex = cartItems.findIndex(item => item.productId === productId);
// // if (productIndex !== -1) {
// //     cartItems[productIndex].quantity += quantity;
// // } else {
// //     cartItems.push({ productId, quantity });
// // }
// // res.status(200).json({ message: 'Product added to cart successfully' });
// // });
// // app.get('/api/cart-items/:productId', async (req, res) => {
// //   const { productId } = req.params;
// //   res.status(200).json(productId);
// // });
// const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`server running on port ${PORT}`));
// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { connectDB } = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const customerRoutes = require("../routes/customerRoutes");
const storeRoutes = require("../routes/storeRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const attributeRoutes = require("../routes/attributeRoutes");
const settingRoutes = require("../routes/settingRoutes");
const currencyRoutes = require("../routes/currencyRoutes");
const languageRoutes = require("../routes/languageRoutes");
const cartitemRoutes = require("../routes/cartitemRoutes");
const { isAuth, isAdmin } = require("../config/auth");

connectDB();
const app = express();

app.set("trust proxy", 1);
app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

// API Routes
app.use("/api/products/", productRoutes);
app.use("/api/store/", storeRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/coupon/", couponRoutes);
app.use("/api/customer/", customerRoutes);
app.use("/api/order/", isAuth, customerOrderRoutes);
app.use("/api/attributes/", attributeRoutes);
app.use("/api/setting/", settingRoutes);
app.use("/api/currency/", isAuth, currencyRoutes);
app.use("/api/language/", languageRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/cartitem", cartitemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
