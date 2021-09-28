
const mongoose = require('mongoose')
const express = require('express');
const app = express();

require('dotenv').config({ path: './config.env' });
require('./db/conn.js')

app.use(express.json())

app.use(require('./router/auth.js'));

const User = require('./model/userSchema')

const PORT = process.env.PORT;


//Middleware

    const middleware = (req, res, next) => {
        console.log("Hello my middleware");
    }

    // app.get('/', (req, res) => {
    //     res.send("Hello from server");
    // })

    app.get('/about', (req, res) => {
        res.send("Hello from about page");
    })

    app.get('/contact', (req, res) => {
        res.send("Hello from contact us page");
    })

    app.get('/signin', (req, res) => {
        res.send("Hello from signin page");
    })

    // app.get('/', (req, res) => {
    //     res.send("Hello from server");
    // })

    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
      })