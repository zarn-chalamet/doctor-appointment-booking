require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors");
const cookiesParser = require("cookie-parser");
const connectDb = require("./config/db");

const app = express();

//connect Database
connectDb();

const PORT = process.env.PORT || 5000;

//cors
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookiesParser());

//api routes
app.use("/api/auth", require("./routes/authRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
