const express = require('express')
const app = express()
const port = 3000

//mongoose setting
// const mongoose = require('mongoose')
const mongoose = require('mongoose')
const Record = require('./models/record')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connect!')
})


app.get('/', (req, res) => {
  res.send('hihi')
})

app.listen(port, () => {
  console.log(`app are listening on port ${port}`)
})