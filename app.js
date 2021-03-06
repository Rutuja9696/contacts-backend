const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./config.env" });
const router = require("./routes/ContactsRoutes");
const { config } = require("process");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

//connecting to db
mongoose.connect(
  process.env.DATABASE_URL,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  (err, connection) => {
    if (err) {
      console.log(err);
      return console.log("Error in connecting to database");
    }
    app.listen(
      process.env.PORT,
      console.log(`app started on ${process.env.PORT}`)
    );
  }
);
