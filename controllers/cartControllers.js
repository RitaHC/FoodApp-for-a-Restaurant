////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const { Router } = require('express')
const express = require('express')
const Cart = require('../models/cart')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


/////////////////// ROUTES //////////////////



//=================== FIND ACTIVE CART ROUTE ==============

//Route to save an existing cart (without checking out).
    //This calls Cart.create(req.session.cart)
    // After creating the cart -> update req.session.cart to be the one created in the database
    // Doing this should give that cart an id
    // res.redirect('/cartshowpage') 

// GET - Active Cart page
router.get('/', (req,res)=> {
    console.log(`the cart`, req.session.cart)
    res.render(('cart'), {...req.session})
})

// FIND - Active Cart page

// Find a cart that is active- Just 1 active at a time
// Push menu items into that  Cart.find({active: true}) .then(cart.items.push) return cart.save()
// If this finds a cart that is active - add the menu item to the cart
    // Otherwise If no active carts- create one 

router.post('/:menuId', (req,res)=> {
    const id = req.params.menuId
    console.log(req.session)
    Cart.find({active:true})
        .then(cart=> {
            console.log(cart)
            if (cart.active == true){
                cart.items.push(id)
                return cart.save()
            } else {
                Cart.create(req.body)
                    .then(cart=> {
                        cart.owner = req.session.userId
                        res.json({cart:cart})
                    })
                    .catch(err=> console.log(err))
            }
        })
        .catch(err=> console.log(err))
})

// POST -> create, sessions in cart 

// router.post('/', (req,res) => {
//     Cart.create(req.session.cart)
//         .then(cart=> {
//             // res.status(201).json({cart:cart})
//             console.log(cart)
//             res.redirect('/cart')
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(404).json(err)
//             // res.redirect(`/error?error=${err}`)
//         })
// })

//=================== PAST ORDERS CART ==============


// Route to checkout an existing cart, 
    //First, this route looks to see that re.sessio.cart has an id
    // If it does have an id -> update the active boolean on the cart in the database to be False
    //If it does not have an id -> that means the cart is not saved in the db, 
    //  FIRST STEP => req.session.cart.active = false
    //SECOND STEP => create the cart by  => Cart.create(req.session.cart)

router.get('/history', (req,res)=> {
    res.render(('orderHistory'),{...req.session})
})

// PUT -> If user is logged in - Turn Active: false
// router.put('/history', (req,res)=> {
//     let cartId = req.session.cart.id
//     Cart.findByIdAndUpdate(cartId)
//         .then(cart=> {
//             req.session.cart.active = false
//             console.log(cart)
//             res.json({cart:cart})
//             // res.redirect('/history')
//         })
//         .catch(err=> {
//             console.log(err)
//             // res.redirect(`/error?error=${err}`)
//         })
// })

// ==================== DELETE CART =======================

router.delete('/checkout', (req,res)=> {
    Cart.deleteMany()
        .then(cart=> {
            res.json({cart:cart})
            // res.redirect('/')
        })
        .catch(err=> {
            console.log(err)
            // res.redirect(`/error?error=${err}`)
            res.send(`Error`)
        })
})

//=================== ADDING ITEMS TO CART ==============

// SHOW -GET Route for the cart

router.get('/:cartId', (req,res)=> {
    const id= req.params.cartId
    Cart.findById(id)
        .then(cart=> {
            res.json({cart:cart})
        })
        .catch(err=> console.log(err))
})

// POST -> Push a menu id in Cart

// router.post('/:menuId', (req,res) => {
//     const id = req.params.menuId
//     console.log(Cart)
//     // Cart.items.push(id)
//     req.session.cart.items.push(id)
//     res.redirect('/cart')
    
// })

//=================== CHECKOUT EXISTING CART ==============


// We need 2 GET Routes 
    // One- get to the active cart
    // Second- Show 'past-orders', which is all cart whose active boolean is false
    // Third - To Delete the cart
    // Forth - Update the cart 



// Export
module.exports = router