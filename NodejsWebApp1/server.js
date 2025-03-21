'use strict';
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 1337;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});