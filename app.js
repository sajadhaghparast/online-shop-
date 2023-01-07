const connectDB = require("./config/db");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const productRoute = require("./routers/product");
const cartRoute = require("./routers/cart");
const orderRoute = require("./routers/order");

const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const { Cookie } = require("express-session");

const app = express();
//json
app.use(express.json());
//env config
dotenv.config({ path: "./config/config.env" });
PORT = process.env.PORT;
// DB connection
connectDB();
//session
app.use(
  session({
    secret: process.env.sessionSec,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
//server listen
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("order", orderRoute);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
