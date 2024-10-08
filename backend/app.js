import express from "express"
import cors from 'cors';
import "./loadEnv.js"
import "express-async-errors";
import indexRouter from './routes/index.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from "connect-mongo";
import mongoose from 'mongoose';

const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Middleware
// allow express to parse json bodies in requests
app.use(express.json()); 
app.use(cookieParser());

const sessionsStore = MongoStore.create({
  client: mongoose.connection.getClient(),
  dbName: 'boba_server',
  collectionName: 'sessions',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'session_secret',
    resave: false,
    saveUninitialized: true,
    store: sessionsStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());

// Conenct to MongoDB
import './db/conn.js';

// Initialize passport config
import './config/passport.js';

app.use('/api', indexRouter)

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})