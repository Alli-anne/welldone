import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import todo from "./route/listPath.js";
import { initDb, getDb } from "./database/connect.js";


const app = express();
const port = process.env.PORT || 3000;

console.log("APP.JS STARTED");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: true
}));

app.use("/", todo);

app.get("/test-db", async (req, res) => {
  try {
    const db = await getDb();
    const result = await db.command({ ping: 1 });

    if (result.ok === 1) {
      return res.send("Database Status: CONNECTED");
    }

    return res.status(500).send("Database Status: ERROR");
  } catch (err) {
    res.status(500).send("Database Status: NOT CONNECTED");
  }
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
