/**
 * Following:
 * https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b
 * 
 */
const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')
const PORT = 5000

const app = express()
server = http.Server(app)
io = socketIO(server)

app.set('port', PORT)
app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})