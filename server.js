////////////////////
//  Dependencies  //
////////////////////
require('dotenv').config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const MenuRouter = require('./controllers/menuControllers')
const UserRouter = require('./controllers/userControllers')
const User = require("./models/user")
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

//========= HOME ROUTE ===========


///////// Home Page //////////// 
app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('home.liquid', { loggedIn, username, userId })
	// res.redirect('/menu')
})

//////// Register Routes ///////////
app.use('/users', UserRouter)
app.use('/menu', MenuRouter)

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))