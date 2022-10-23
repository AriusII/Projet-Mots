import https from 'https'
import http from 'http'
import cors from 'cors'
import express from 'express'

// Get express and set it to app
const app = express()

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}

// setup cors
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json({ limit: '25mb' }))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '25mb' }))

import rTusmo from './resources/routes/tusmo/tusmo.router'

app.use('/tusmo', rTusmo)

//Start server on prod
http.createServer({}, app).listen(80, () => {
    console.log("Server started on port 80")
})