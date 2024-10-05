import express from "express"
import cors from 'cors';
import path from "path"
import "./loadEnv.js"
import "express-async-errors";
import indexRouter from './routes/index.js'
import eventsRouter from './routes/events.js'
import userRouter from './routes/users.js'
import db from './db/conn.js';

const app = express()
app.use(cors());
// allow express to parse json bodies in requests
app.use(express.json()); 

const port = process.env.PORT || 8080;

app.use('/', indexRouter)
app.use('/events', eventsRouter)
app.use('/users', userRouter)

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})