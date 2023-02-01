// import dependencies
const mongoose = require('../utils/connection')

// import user model for populate
const User = require('./user')

//=================== MENU SCHEMA ==============

const { Schema, model } = mongoose

const menuSchema = new Schema(
	{
		category: { 
			type: String, 
			required: true 
		},
		name: { 
			type: String, 
			required: true 
		},
		img:{
        	type: String
    	},
        price: {
			 type: Number,
			required: true 
		},
		description: { 
			type: String, 
			required: true 
		},
		bestseller: { type: Boolean, required: true },

		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)



const Menu = model('Menu', menuSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Menu
