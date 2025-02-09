require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors");
const cookiesParser = require("cookie-parser");
const connectDb = require("./config/db");
const passport = require("passport");
require("./config/passport");
const session = require("express-session");
const connectCloudinary = require("./config/cloudinary");
const app = express();

//connect Database
connectDb();

//cloudinary
connectCloudinary();

const PORT = process.env.PORT || 5000;

//cors
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookiesParser());

//google oAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//api routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/auth", require("./routes/googleOAuth"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/doctor", require("./routes/doctorRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
