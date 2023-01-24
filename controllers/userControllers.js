////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


/////////////////// ROUTES //////////////////

//============== SIGN UP =====================

// GET -> SIGN-UP FORM (RENDER PAGE)
router.get('/signup', (req, res) => {
	res.render('users/signup')
})

// POST -> SIGN-UP create new user
router.post('/signup', async (req, res) => {
	// set the password to hashed password
	const newUser = req.body
	console.log(newUser)

	newUser.password = await bcrypt.hash(
		newUser.password,
		await bcrypt.genSalt(10)
	)
	// create a new user
	User.create(newUser)
		// if created successfully redirect to login
		.then((user) => {
			console.log('new user created \n', user)
            res.status(201).json({  user: user })
			// res.redirect('/users/login')
		})
		// if an error occurs, send err
		.catch((err) => {
			console.log(err)
            res.json(err)
			// res.redirect(`/error?error=${error}`)
		})
})

//============== LOGIN =====================

// GET -> to render the LOGIN form (RENDER PAGE)
router.get('/login', (req, res) => {
	res.render('users/login')
})
// POST -> LOGIN info(and create a session)

router.post('/login', async (req, res) => {
    // first we want to destructure the username and password from our req.body
    const { username, password } = req.body

    // search the db, for a user with a specific username
    User.findOne({ username })
        .then(async (user) => {
            // we check if that user exists
            if (user) {
                // if they do, we compare the passwords using bcrypt
                // bcrypt.compare -> evaluates to a truthy or a falsy value
                // we'll save that result to a variable for easy reference later
                // password -> comes from req.body
                // user.password -> is saved in the database
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    // if the passwords match, place the user's info in the session
                    // this is where we use that session object that lives in our request object
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id

                    // console.log('this is req.session \n', req.session)

                    // we'll send a 201 response and the user as json(for now)
                    // we'll update this after a couple tests to adhere to best practices
                    res.status(201).json({ username: user.username })
                    // res.redirect('/')
                } else {
                    // if the passwords dont match, send the user a message
                    res.json({ error: 'username or password is incorrect' })
                    // res.redirect(`/error?error=username%20or%20password%20is%20incorrect`)
                }

            } else {
                // if the user does not exist, we respond with a message saying so
                res.json({ error: 'user does not exist' })
                // res.redirect(`/error?error=user%20does%20not%20exist`)
            }

        })
        .catch(err => {
            console.log(err)
            res.json(err)
            // res.redirect(`/error?error=${err}`)
        })
})

//============== LOGOUT =====================

// GET -> /users/logout
// This route renders a page that allows the user to log out
router.get('/logout', (req, res) => {
    res.render('users/logout')
})

// DELETE -> /users/logout
// This route destroys a session in our db(and in the browser)
router.delete('/logout', (req, res) => {
    // destroy the session and send an appropriate response
    req.session.destroy(() => {
        console.log('this is req.session upon logout \n', req.session)
        // eventually we will redirect users here, but thats after adding the view layer
        res.redirect('/')
    })
})


// Export the Router
module.exports = router
