const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const helper = require('./helper')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//mongoose setting
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

//render index page
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      return res.render('index', { records })
    })
    .catch(error => console.log('error!'))
})


app.listen(port, () => {
  console.log(`app are listening on port ${port}`)
})