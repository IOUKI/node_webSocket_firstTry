const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server: server })

wss.on('connection', function connection(ws) {
    console.log(ws)

    console.log("A new client connected")
    ws.send("Welcome new client")

    ws.on('message', function incoming(message) { 
        console.log(`received: ${message}`)
        // ws.send(`Got your message its: ${message}`)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${message}`)
            }
        })
    })
})

app.get('/', (req, res) => {
    res.send('hello world')
})

server.listen(3333, () => console.log(`on 3333port.`))