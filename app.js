const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
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


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`app are listening on port ${port}`)
})