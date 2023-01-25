////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Cart = require('../models/cart')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


/////////////////// ROUTES //////////////////



//=================== CREATE CART ROUTE ==============
// GET - Cart page
router.get('/', (req,res)=> {
    res.render('cart')
})


// POST -> create, sessions in cart 
router.post('/', (req,res) => {
    console.log(req.session.cart)
    Cart.create(req.session.cart)
        .then(cart=> {
            res.status(201).json({cart:cart})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
            // res.redirect(`/error?error=${err}`)
        })
})

// POST -> Push a menu id in Cart
router.post('/:menuId', (req,res) => {
    const id = req.params.menuId
    console.log(id)
    Cart.items.push(id)
    console.log(Cart.items)
    // res.render('/cart')
})

//=================== CREATE CART ROUTE ==============


//Route to save an existing cart (without checking out).
    //This calls Cart.create(req.session.cart)
    // After creating the cart -> update req.session.cart to be the one created in the database
    // Doing this should give that cart an id
    // res.redirect('/cartshowpage') 

// Route to checkout an existing cart, 
    //First, this route looks to see that re.sessio.cart has an id
    // If it does have an id -> update the active boolean on the cart in the database to be False
    //If it does not have an id -> that means the cart is not saved in the db, 
    //  FIRST STEP => req.session.cart.active = false
    //SECOND STEP => create the cart by  => Cart.create(req.session.cart)
    // 
// We need 2 GET Routes 
    // One- get to the active cart
    // Second- Show 'past-orders', which is all cart whose active boolean is false
    // Third - To Delete the cart
    // Forth - Update the cart 



// Export
module.exports = router