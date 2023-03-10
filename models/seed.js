
/////////////// IMPORT DEPENDENCIES ////////////
const mongoose = require('../utils/connection')
const Menu = require('./menu')

// Start db connection
const db = mongoose.connection

/////////////////////// Seed Data /////////////////////

const seed = [
    {
        category: 'Appetizer',
        name: 'Kukkad',
        img: 'https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png',
        price: 10,
        description: 'Roasted Chicken, cooked in curd and spices',
        bestseller: true
    },
    {
        category: 'Appetizer',
        name: 'Idli Sambar',
        img: 'https://b.zmtcdn.com/data/dish_images/d9766dd91cd75416f4f65cf286ca84331634805483.png',
        price: 10,
        description: 'Semomile pancakes with tamarind curry',
        bestseller: true
    },
    {
        category: 'Appetizer',
        name: 'Shwarma',
        img: 'https://b.zmtcdn.com/data/o2_assets/2f34540e0b12058f5f8b9390c3a3fb4a1648972281.png',
        price: 10,
        description: 'Chicken and vegetable wrap served with hot curry sauce',
        bestseller: false
    },
    {
        category: 'Appetizer',
        name: 'Fried Rice',
        img: 'https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png',
        price: 10,
        description: 'White basmati rice cooked with vegetables and herbs',
        bestseller: false
    },
    {
        category: 'Main Course',
        name: 'Kathi Roll',
        img: 'https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png',
        price: 10,
        description: 'Vegetarian wrap with potato patty and veges',
        bestseller: false
    },
    {
        category: 'Main Course',
        name: 'Shahi Paneer',
        img: 'https://b.zmtcdn.com/data/dish_images/e44c42ff4b60b025225c8691ef9735b11635781903.png',
        price: 30,
        description: 'Cottage cheese cooked in cream and herbs',
        bestseller: true
    },
    {
        category: 'Main Course',
        name: 'Aloo Paratha',
        img: 'https://b.zmtcdn.com/data/o2_assets/2b5a5b533473aada22015966f668e30e1633434990.png',
        price: 30,
        description: 'wheat bread stuffed with mashed potato and onions',
        bestseller: true
    },
    {
        category: 'Main Course',
        name: 'Paneer Burger',
        img: 'https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png',
        price: 30,
        description: 'Cottage cheese patty in burger with veges',
        bestseller: true
    },
    {
        category: 'Dessert',
        name: 'Choco Cake',
        img: 'https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png',
        price: 30,
        description: 'Vanilla cake with chocolate and oreo biscuit dressing',
        bestseller: true
    },
    {
        category: 'Dessert',
        name: 'Choco Pastry',
        img: 'https://b.zmtcdn.com/data/dish_images/83b1a4086e98dc584a7ce5d9a844a3191635166040.png',
        price: 30,
        description: 'Belgian chocolate cake, served with choco-chips',
        bestseller: true
    },
    {
        category: 'Dessert',
        name: 'Mango Shake',
        img: 'https://b.zmtcdn.com/data/dish_images/8187d3223ac2cc42cc24f723c92877511634805403.png',
        price: 30,
        description: 'Mango smoothie served with ice-cream and cherry on top',
        bestseller: false
    },
    {
        category: 'Pizza',
        name: 'Kadhai paneer Pizza',
        img: 'https://sc01.alicdn.com/kf/HTB1bAtCLNnaK1RjSZFBq6AW7VXa5/228522974/HTB1bAtCLNnaK1RjSZFBq6AW7VXa5.jpg_.webp',
        price: 20,
        description: 'Indian cottage cheese cooked vegetables and tossed over pizza',
        bestseller: false
    },
    {
        category: 'Pizza',
        name: 'Olive Pizza',
        img: 'https://media.istockphoto.com/id/503818102/photo/mediterranean-pizza.jpg?s=612x612&w=0&k=20&c=4JOt9eI5HGK3oE4MUq33-Uqai3FNgYnWlzjfBlyqII0=',
        price: 20,
        description: 'Pizza topped with green, black and kalamata olives',
        bestseller: true
    },
    {
        category: 'Pizza',
        name: 'Margerita Pizza',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKiGYl47m-pXZdyXS2FYpH2KTeBNCRMAnG9Q&usqp=CAU',
        price: 20,
        description: 'Ultimate cheezy pizza, customization is allowed',
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