const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const helper = require('../../helper')

//render index page & calculate total amount
router.get('/', (req, res) => {
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

//filter
router.get('/filter/:id', (req, res) => {
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


module.exports = router