import express from "express"
import cors from 'cors';
import path from "path"
import "./loadEnv.mjs"
import "express-async-errors";
import indexRouter from './routes/index.mjs'
import eventsRouter from './routes/events.mjs'
import userRouter from './routes/users.mjs'
import db from './db/conn.mjs';

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