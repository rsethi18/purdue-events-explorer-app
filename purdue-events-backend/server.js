const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Function to ensure a file exists
function ensureFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf8');
    console.log(`Created empty JSON file: ${filePath}`);
  }
}

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
  console.log('Created data directory');
}

// Ensure JSON files exist
const purdueEventsPath = path.join(dataDir, 'cleaned_purdue_events.json');
const boilerLinkEventsPath = path.join(dataDir, 'boilerlink_clean.json');
ensureFileExists(purdueEventsPath);
ensureFileExists(boilerLinkEventsPath);

app.get('/api/events', (req, res) => {
  try {
    const purdueEvents = JSON.parse(fs.readFileSync(purdueEventsPath, 'utf8'));
    const boilerLinkEvents = JSON.parse(fs.readFileSync(boilerLinkEventsPath, 'utf8'));
    res.json({ purdueEvents, boilerLinkEvents });
  } catch (error) {
    console.error('Error reading event files:', error);
    res.status(500).json({ error: 'Error reading event data' });
  }
});

function runScrapers() {
  exec('node run_scrapers.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
}

runScrapers();
setInterval(runScrapers, 24 * 60 * 60 * 1000);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});