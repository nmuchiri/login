const express = require('express')
const mongoose= require('mongoose')
require('dotenv').config()


const PORT = process.env.PORT
const app= express()

const mongoURI = process.env.MONGODBURI
const db = mongoose.connection

mongoose.connect(mongoURI , { // start connection to db
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{
    console.log("Mongo connection is  established.")
})
// connection error handeling.
db.on('error', (err)=> console.log(err.message + ' Mongo is not running!!!'))
db.on('connected', ()=> console.log('Mongo connected: ' + mongoURI))
db.on('disconnected', ()=> console.log('Mongo is now Disconnected, Have a good day!'))


const usersControllers = require('./controllers/users')
//app.use('/users', isAuthenticated, usersControllers)
app.use('/users', usersControllers) // make new user

app.use('/', (req, res)=>{
    console.log('/page')
    res.send('working')
})

app.listen(PORT, (req,res)=>{
    console.log('running on ', PORT)
})

