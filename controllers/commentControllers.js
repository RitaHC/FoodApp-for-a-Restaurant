/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Menu = require('../models/menu')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////

// Get -> review page (Rendering Page)

router.get('/review', (req, res) => {
	res.render(('review.liquid'), {menu, ...req.session})
})

// POST -> create comments

router.post('/review', (req,res)=> {
    
})