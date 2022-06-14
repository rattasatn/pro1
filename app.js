const express = require("express");
require("dotenv").config();

const authRouter = require("./routes/authRoute");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const customerRouter = require("./routes/customerRoute");
const adminRouter = require("./routes/adminRoute");
const productRouter = require("./routes/productRoute");
const authenticate = require("./middlewares/authenticate");

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });
// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/customer", authenticate, customerRouter);
app.use("/admin", authenticate, adminRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server n on port:" + port));
