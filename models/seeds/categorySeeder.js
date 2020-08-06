const mongoose = require('mongoose')
const Category = require('../category')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Category.create(
    {
      category: '家居物業',
      icon: '<i class="fas fa-home fa-4x"></i>'
    },
    {
      category: '交通出行',
      icon: '<i class="fas fa-shuttle-van fa-4x"></i>'
    },
    {
      category: '休閒娛樂',
      icon: '<i class="fas fa-grin-beam fa-4x"></i>'
    },
    {
      category: '餐飲食品',
      icon: '<i class="fas fa-utensils fa-4x"></i>'
    },
    {
      category: '其他',
      icon: '<i class="fas fa-pen fa-4x"></i>'
    }
  )
  console.log('done')
})