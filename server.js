// Frameworks && Library
require('dotenv').config('./')
const express = require('express');
const {
    default: mongoose
} = require('mongoose');
const path = require('path');
const https = require('https')
const fs = require('fs')


// User Values
const app = express();
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASEURI


const doThis=require('./testing');
// ROUTES
const getRoutes = require('./routes/getRoutes');
const postRoutes = require('./routes/postRoutes');

// CREATING SSL SERVER
const sslServer = https.createServer({
    key: fs.readFileSync('./SSLCERT/key.pem'),
    cert: fs.readFileSync('./SSLCERT/cert.pem')
}, app)

// Usages of Middlewares
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
// API
app.use('/api/get', getRoutes)
app.use('/api/post', postRoutes)

// Database Connection
mongoose.connect(DATABASE).then(() => {
    console.log('Database Connected');
    doThis()
}).catch(() => "Error occured while connecting to database")

// Server Listening
sslServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))
