import express from 'express'
import cors from 'cors'
import http from 'http'
import { THIS_SERVER_PORT } from './interfaces'
import { setupEndpoints } from './endpoints'

var app = express()

app.use(express.json())

app.use(cors({credentials: true, origin: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE"}))

app.options('*', cors())

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Token");
    next();
});

setupEndpoints(app)

const server = http.createServer(app)

const port = THIS_SERVER_PORT as string || 8080

server.listen(port)

console.log('Server started at port ', port)