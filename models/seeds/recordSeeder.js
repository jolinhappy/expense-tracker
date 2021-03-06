const mongoose = require('mongoose')
const Record = require('../record')

const db = require('../../config/mongoose')
db.once('open', () => {
  Record.create(
    {
      name: '買早餐',
      category: '餐飲食品',
      date: '2020-07-27',
      amount: 80
    },
    {
      name: '買西裝',
      category: '家居物業',
      date: '2020-07-29',
      amount: 2300
    },
    {
      name: '油錢',
      category: '交通出行',
      date: '2020-07-29',
      amount: 600
    }
  )
    .then(() => {
      db.close()
      console.log('record done!')
    })
    .catch(error => console.log(error))
})