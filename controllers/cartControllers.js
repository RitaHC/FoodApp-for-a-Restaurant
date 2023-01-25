////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const Menu = require('../models/menu')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


/////////////////// ROUTES //////////////////

// GET - Cart page
// router.get('/cart', (req,res)=> {
	
//     res.render('menu/cart')
// })

// Export
module.exports = router