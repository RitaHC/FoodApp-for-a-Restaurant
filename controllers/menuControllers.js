// Import Dependencies
const express = require('express')
const Menu = require('../models/menu')

// Create router
const router = express.Router()

// Routes

/////////////// INDEX ALL //////////////////
router.get('/', (req, res) => {
	Menu.find({})
		.then(menu => {
			// res.json({ menu: menu })
			// const username = req.session.username
			// const loggedIn = req.session.loggedIn
			
			res.render('menu/index')
		})
		.catch(error => {
			// res.status(404).json(err)
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Example.find({ owner: userId })
		.then(examples => {
			res.render('examples/index', { examples, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})



// show route
router.get('/:id', (req, res) => {
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


// Export the Router
module.exports = router