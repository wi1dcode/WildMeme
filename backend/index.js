require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5001;
const { DB_USER, DB_HOST, DB_PASS } = process.env;

const app = require("./src/app");

mongoose.set("strictQuery", true);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`server startet on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
