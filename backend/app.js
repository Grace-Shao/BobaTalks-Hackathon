const express = require("express")
const path = require("path")

const indexRouter = require('./routes/index');
const eventsRouter = require('./routes/events');

const app = express()
const port = process.env.PORT || 8080;

app.use('/', indexRouter);
app.use('/events', eventsRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}!`)
});