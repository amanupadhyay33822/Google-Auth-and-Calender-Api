// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { logoutUser } = require('../Controllers/auth');

// Logout route
router.get('/logout', logoutUser);

module.exports = router;
