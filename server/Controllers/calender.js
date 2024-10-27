// controllers/eventController.js
const axios = require('axios');
const User = require('../Models/User'); // Adjust the path to your User model
const { google } = require('googleapis');
// Function to handle event creation
exports.createEvent = async (req, res) => {
  const { eventName, date, time } = req.body;

  // Check if the user is authenticated
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  // Find the user in the database
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  // Prepare the event date and time in the required format
  const eventDateTime = `${date}T${time}:00`;
  const event = {
    summary: eventName,
    start: { dateTime: eventDateTime, timeZone: "Asia/Kolkata" },
    end: { dateTime: eventDateTime, timeZone: "Asia/Kolkata" },
  };

  try {
    // Make the API request to create a calendar event
    const response = await axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      event,
      { headers: { Authorization: `Bearer ${user.accessToken}` } }
    );

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Adjust the path as necessary

exports.getEvents = async (req, res) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Retrieve the user from the database
    const user = await User.findById(req.user.id);
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set up Google Calendar API client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: user.accessToken });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Fetch upcoming events
    const events = await calendar.events.list({
      calendarId: "primary",
      maxResults: 10,
      orderBy: "updated",
      singleEvents: true,
      timeMin: new Date().toISOString(), // Show only upcoming events
    });

    // Sort events by start date in descending order
    const sortedEvents = events.data.items.sort(
      (a, b) =>
        new Date(b.start.dateTime || b.start.date) - 
        new Date(a.start.dateTime || a.start.date)
    );

    // Respond with the sorted events
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    
    // Handle specific error cases for better clarity
    if (error.response && error.response.data) {
      return res.status(500).json({ error: error.response.data.error });
    }

    res.status(500).json({ error: "Failed to fetch events" });
  }
};
