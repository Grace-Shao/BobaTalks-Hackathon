import express from "express"
import cors from 'cors';
import "./loadEnv.js"
import "express-async-errors";
import indexRouter from './routes/index.js'
import eventsRouter from './routes/events.js'
import authRouter from './routes/auth.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express()
app.use(cors());

// Middleware
// allow express to parse json bodies in requests
app.use(express.json()); 
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'session_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());

// Conenct to MongoDB
import './db/conn.js';

// Initialize passport config
import './config/passport.js';
import MongoStore from "connect-mongo";

app.use('/api', indexRouter)
app.use('/api/events', eventsRouter)
app.use('/api/auth', authRouter)

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})