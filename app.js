const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('hihi')
})

app.listen(port, () => {
  console.log(`app are listening on port ${port}`)
})