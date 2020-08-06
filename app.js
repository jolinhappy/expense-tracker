const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const helper = require('./helper')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const Record = require('./models/record')
const Category = require('./models/category')

//mongoose setting
const mongoose = require('mongoose')
const category = require('./models/category')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connect!')
})

//render index page & calculate total amount
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      const totalAmount = records.map(record => record.amount).reduce((a, b) => { return a + b }, 0)
      return res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

//create new expense
app.get('/records/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.log(error))
})
app.post('/records', (req, res) => {
  const newExpense = req.body
  return Record.create(newExpense)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//edit old expense data
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})
app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const editRecord = req.body
  return Record.findById(id)
    .then(record => {
      Object.assign(record, editRecord)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



app.listen(port, () => {
  console.log(`app are listening on port ${port}`)
})