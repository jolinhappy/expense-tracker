const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const helper = require('./helper')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

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


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//render index page & calculate total amount
app.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      Record.find()
        .lean()
        .then(records => {
          const totalAmount = records.map(record => record.amount).reduce((a, b) => { return a + b }, 0)
          return res.render('index', { records, totalAmount, categories })
        })
        .catch(error => console.log(error))
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
app.put('/records/:id', (req, res) => {
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

//delete
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//filter
app.get('/filter/:id', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      Record.find()
        .lean()
        .then(filteredRecords => {
          const params = req.params.id
          const records = filteredRecords.filter(filteredRecord => { return filteredRecord.category === params })
          const totalAmount = records.map(filteredRecord => filteredRecord.amount).reduce((a, b) => { return a + b }, 0)
          res.render('index', { records, categories, params, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))


})


app.listen(port, () => {
  console.log(`app are listening on port ${port}`)
})