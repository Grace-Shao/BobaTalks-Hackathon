import express from "express"
import eventsRouter from './routes/events.js'
import authRouter from './routes/auth.js'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API'})
});

router.use('/auth', authRouter)
router.use('/events', eventsRouter)

export default router
