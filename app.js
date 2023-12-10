const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Fix: Corrected typo here

const app = express();

app.use(express.json());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true
}));
app.use(cookieParser()); // Fix: Corrected typo here

app.use('/ping', function(req, res){
  res.send('/pong');
});

// Routes of 3 modules - Fix: Changed the comment to "Routes" assuming it's a typo.

app.all('*', (req, res) => {
  res.status(404).send('OOPS!! Error');
});

module.exports = app;
