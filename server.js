////////////////////
//  Dependencies  //
////////////////////
require('dotenv').config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const MenuRouter = require('./controllers/menuControllers')
const UserRouter = require('./controllers/userControllers')
const CartRouter = require('./controllers/cartControllers')
const User = require("./models/user")

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

//========= HOME ROUTE ===========

app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('home.liquid', { loggedIn, username, userId })
	// res.redirect('/menu')
})

//============== Register Routes ==============
app.use('/users', UserRouter)
app.use('/menu', MenuRouter)
app.use('/cart', CartRouter)

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