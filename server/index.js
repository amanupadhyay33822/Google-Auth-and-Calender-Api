const express = require("express");
const axios = require("axios");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const { createCalendarEvent, createEvent } = require("./Controllers/calender");
const connectDB = require("./DB/dbconfig");
const User = require("./Models/User");
const cors = require("cors");
const eventRoutes = require("./routes/calender");
const authRoutes = require("./routes/auth");
require("dotenv").config();
require("./Controllers/auth");

const app = express();
connectDB();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "..", "public")));

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "https://www.googleapis.com/auth/calendar"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("http://localhost:5173/calendar")
);

app.use("/", eventRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
