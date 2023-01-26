////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const { Router } = require('express')
const express = require('express')
const Cart = require('../models/cart')
const User = require('../models/user')
const Menu = require('../models/menu')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


/////////////////// ROUTES //////////////////

// Get all Carts

router.get('/testIndex', (req,res)=> {
    Cart.find({})
        .then(cart=> {
            res.json({cart:cart})
        })
        .catch(err=> console.log(err))
})
//=================== FIND ACTIVE CART ROUTE ==============


// GET - Active Cart page
router.get('/', (req,res)=> {
    res.render(('cart'), {...req.session})
})

//=================== CREATE CART ROUTE ==============

// router.get('/:menuId', (req,res)=> {
//     res.render('/cart')
// })

// Create a cart for every user, which is different
router.get('/:menuId', (req, res) => {
	const menuId = req.params.menuId

	Cart.findOne({ active: true, owner: req.session.userId})
		.then(cart => {
            
            console.log(`FIRST CONSOLE LOG`, cart)
            console.log(`Add to cart - IF HITTT`)
            cart.items.push(menuId)
            return cart.save()
			
        })
		.then(cart => {
            // res.json({cart:cart})
            console.log('cart is active', Cart)
            console.log(cart)
			res.redirect(`/cart`)
		})
		.catch(() => {
            Cart.create({
                owner: req.session.userId,
            })
            .then(cart => {
                // res.json({cart:cart})
                cart.items.push(menuId)
                return cart.save()
                
            })
            .then(cart => {
                console.log(cart)
                res.redirect(`/cart/${cart.id}`)
            })
            .catch(error => {
                console.log(`Add to cart - INNER CATCH HITTT`)
                // res.status(404).json(err)
                res.redirect(`/error?error=${error}`)
            })
		})
})


//=================== PAST ORDERS CART ==============

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

// SHOW 1 cart- GET Route for the cart

// router.get('/:cartId', (req,res)=> {
//     const id= req.params.cartId
//     Cart.findById(id)
//         .then(cart=> {
//             res.json({cart:cart})
//         })
//         .catch(err=> console.log(err))
// })


//=================== CHECKOUT EXISTING CART ==============


// We need 2 GET Routes 
    // One- get to the active cart
    // Second- Show 'past-orders', which is all cart whose active boolean is false
    // Third - To Delete the cart
    // Forth - Update the cart 



// Export
module.exports = router