// Import Dependencies
const express = require('express')
const Menu = require('../models/menu')


// Create router
const router = express.Router()

// Routes

////////////////////////////// ROUTES /////////////////////////////////

//=================== INDEX ROUTE ==============
router.get('/', (req, res) => {
	Menu.find({})
		.then(menu => {
			// res.json({ menu: menu })
			// const username = req.session.username
			// const loggedIn = req.session.loggedIn
			// console.log(menu)
			// res.json({menu:menu})
			res.render('menu/index', { menu, ...req.session })
		})
		.catch(error => {
			// res.status(404).json(err)
			res.redirect(`/error?error=${error}`)
		})
})

//=================== ONE ITEM IN MENU ROUTE ==============

// // index that shows only the user's examples
// router.get('/mine', (req, res) => {
//     // destructure user info from req.session
//     const { username, userId, loggedIn } = req.session
// 	Example.find({ owner: userId })
// 		.then(examples => {
// 			res.render('examples/index', { examples, username, loggedIn })
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })


//=================== SHOW ROUTE ==============

// show route
router.get('/menu/:id', (req, res) => {
	const id = req.params.id
	Menu.findById(id)
		.then(item => {
			console.log(item)
			res.status(200).json({ item: item })
            // const {username, loggedIn, userId} = req.session
			// res.render('examples/show', { example, username, loggedIn, userId })
		})
		.catch((error) => {
			res.status(400).json(err)
			// res.redirect(`/error?error=${error}`)
		})
})

//=================== ABOUT US RENDERING PAGE ==============

router.get('/aboutus', (req,res)=> {
	res.render(('aboutus'), { ...req.session})
})



// Export the Router
module.exports = router






