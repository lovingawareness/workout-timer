/**
 * Following:
 * https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b
 * 
 */
const express = require('express')
const path = require('path')
const PORT = 3000

const app = express()

app.set('port', PORT)
app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})