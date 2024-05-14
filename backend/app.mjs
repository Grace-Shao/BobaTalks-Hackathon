import express from "express"
import cors from 'cors';
import path from "path"
import "./loadEnv.mjs"
import "express-async-errors";
import indexRouter from './routes/index.mjs'
import eventsRouter from './routes/events.mjs'

console.log(process.env)

const app = express()
app.use(cors());
// allow express to parse json bodies in requests
app.use(express.json()); 

const port = process.env.PORT || 8080;

app.use('/', indexRouter)
app.use('/events', eventsRouter)

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`)
})