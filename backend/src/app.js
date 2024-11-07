const express = require("express");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routes/userRouter");
const memeRouter = require("./routes/memeRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use("/memes", memeRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

module.exports = app;
