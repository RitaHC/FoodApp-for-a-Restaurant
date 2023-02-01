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


////////////////////////////////////// ROUTES /////////////////////////////////////

router.get('/payment', (req,res)=> {
	res.render(('payment.liquid'), { ...req.session})
})

//===================  CART INDEX ==============

router.get('/testIndex', (req,res)=> {
    Cart.find({})
        .then(cart=> {
            res.json({cart:cart})
        })
        .catch(err=> console.log(err))
})

//=================== FIND My ACTIVE CART ROUTE ====================================

// GET - My Active Cart page
router.get('/', (req,res)=> {
    Cart.findOne({ active: true, owner: req.session.userId})
        .then(cart=> { 
            console.log('GGGGGEEEEEETTTTTTTTTTTTTTTTTTTTTTT',cart)
            res.render(('cart'), { cart, ...req.session})
            }
        )
        .catch(err => {
            res.redirect(`/error?error=${err}`)
            console.log(err)
        })
    
})




//==================================== CART CHECKOUT  ==============================




/////////////////////// GET - Checkout //////////////////////////////////
router.get('/checkout', (req,res)=> {
    Cart.find({ active: false, owner: req.session.userId})
        .populate('items')
        .then(carts=> { 
            console.log('CHECKOUTTTTTTTTTTTTTTTTTT - cart ITEMSSS',carts.items)
            res.render('orderHistory',{carts, ...req.session})
            }
        )
        .catch(err => {
            res.redirect(`/error?error=${err}`)
            console.log(err)
        })

})

/////////////////////// PUT - Checkout (Active-false) ///////////////////


router.put('/checkout/:cartId', (req,res)=> {
    const cartId = req.params.cartId
    Cart.findByIdAndUpdate(cartId, {new: true})
        .populate('items')
        .then(cart=> {
            cart.active = false
            console.log('TTTTTTTUUUURRRNNNNNN FALSEEEEEEEE------', cart)
            cart.save()
            // res.json({cart:cart})
            // res.redirect('/cart/checkout')
            res.redirect('/cart/payment')
        })
        .catch(err=> {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})
//=================== MY PRESENT CART ==============


router.get('/show/:cartId', (req, res) => {
    // because we're editing a specific cart, we want to be able to access the cart's initial values. so we can use that info on the page.
    const cartId = req.params.cartId
    console.log('this is the cartId', cartId)
    Cart.findById(cartId)
        .populate('items')
        .then(cart => {
            console.log('THIS IS CART ID ------>', cartId)
            console.log(`This id CART ---->`, cart)
            // res.send({cart:cart})
            res.render('showCart.liquid', { cart, ...req.session })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
            console.log(err)
        })
})

//=================== CREATE CART ROUTE ==============


// Create a cart for every user, which is different
router.get('/:menuId', (req, res) => {
	const menuId = req.params.menuId

	Cart.findOne({ active: true, owner: req.session.userId})
        // .populate(items, owner)
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
			res.redirect(`/menu`)
		})
		.catch(() => {
            Cart.create({
                owner: req.session.userId,
            })
            // .populate('menu')
            .then(cart => {
                // res.json({cart:cart})
                cart.items.push(menuId)
                return cart.save()
                
            })
            .then(cart => {
                console.log(cart)
                res.redirect(`/menu`)
            })
            .catch(error => {
                console.log(`Add to cart - INNER CATCH HITTT`)
                // res.status(404).json(err)
                // res.render(('emptyCart'),{cart, ...req.session})
            })
		})
})





/////////////////////// DELETE - Checkout //////////////////////////////////

// router.get('/checkout', (req,res)=> {
//     Cart.deleteMany()
//         .then(cart=> {
//             console.log(`----------- DELETE ALL CARTS -----------`)
//             res.json({cart:cart})
//             // res.redirect('/')
//         })
//         .catch(err=> {
//             console.log(err)
//             // res.redirect(`/error?error=${err}`)
//             res.send(`Error`)
//         })
// })




// Export
module.exports = router