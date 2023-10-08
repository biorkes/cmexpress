require('dotenv').config()

const express = require('express')
const { default: mongoose } = require('mongoose')

const app = express()
mongoose.connect(process.env.MONGO_DB_URL,{useNewUrlParser:true})

const db = mongoose.connection

db.on('error', (err) => {
    console.error(err);
})

db.once('open', () => console.log('Connected to DB...'))

app.use(express.json());

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
const channelsRouter = require('./routes/channels')
app.use('/channels', channelsRouter)


app.listen(3000, () => console.log('server has started'))