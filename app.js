const session = require('express-session');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { initDb, getDb } = require('./database/connect'); // FIX HERE

const app = express();
const port = process.env.PORT || 3000;

console.log("APP.JS STARTED");

app.use(express.static("public"));



// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Test DB endpoint
app.get("/test-db", async (req, res) => {
  try {
    const db = getDb();
    const result = await db.command({ ping: 1 });

    if (result.ok === 1) {
      return res.send("Database Status: CONNECTED");
    }

    return res.status(500).send("Database Status: ERROR");
  } catch (err) {
    res.status(500).send("Database Status: NOT CONNECTED");
  }
});

// Start server only after DB connection succeeds
initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
