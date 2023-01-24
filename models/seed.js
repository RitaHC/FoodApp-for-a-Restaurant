
/////////////// IMPORT DEPENDENCIES ////////////
const mongoose = require('../utils/connection')
const Menu = require('./menu')

// Start db connection
const db = mongoose.connection

/////////////////////// Seed Data /////////////////////

const seed = [
    {
        category: 'Appetizer',
        name: 'Raj Kachori',
        img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2018/03/raj-kachori-chaat-recipe-1-500x500.jpg',
        price: 15,
        bestseller: true
    },
    {
        category: 'Appetizer',
        name: 'Samosa',
        img: 'https://yummyindiankitchen.com/wp-content/uploads/2016/11/aloo-samosa-recipe-punjabi.jpg',
        price: 8,
        bestseller: false
    }
]

////////// Populate Seed //////////

db.on('open', () => {
    Menu.deleteMany({ owner: null })
        .then(() => {
            // then we'll seed(create) our starter fruits
            Menu.create(seed)
                // tell our app what to do with success and failures
                .then(data => {
                    console.log('here is the: \n', data)
                    // once it's done, we close the connection
                    db.close()
                })
                .catch(err => {
                    console.log('The following error occurred: \n', err)
                    // always close the connection
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            // always make sure to close the connection
            db.close()
        })
})