require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/event");
const userProfileRoutes = require("./routes/userProfile");
const userEventRoutes = require("./routes/userEvent");

const app = express();

const DB_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;


app.use(morgan(process.env.NODE_ENV == "production" ? "common" : "dev"));
app.use(express.json());

app.use(cors());

app.use("/api", eventRoutes);
app.use("/api", userProfileRoutes);
app.use("/api", userEventRoutes);

console.log(
  "⚠️Starting ",
  process.env.NODE_ENV == "production" ? "prod" : "staging",
  " Environment"
);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Database Connected!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("🚀 Server Ready! at port:", PORT);
    });
  });
