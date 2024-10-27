// routes/eventRoutes.js
const express = require("express");
const { createEvent, getEvents } = require("../Controllers/calender"); // Import the controller function
const router = express.Router();

// Route to create an event
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    // This method is typically added by Passport.js when user authentication is enabled
    return res.json({ loggedIn: true });
  } else {
    return res.json({ loggedIn: false });
  }
});
router.post("/create-event", createEvent);
router.get("/get-event", getEvents);

module.exports = router;
