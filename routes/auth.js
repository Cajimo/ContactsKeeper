//! Login, authentication
// Gonna have 2 routes: 1) Gonna to be to just get the logged in user 2) Gonna to be actually log in the user and get the token.
const express = require('express');
const router = express.Router();

// @route   GET  api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
  res.send('Get logged in User');
});

// @route   POST  api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', (req, res) => {
  res.send('Log in User');
});

// Have to export the router or won't work
module.exports = router;
