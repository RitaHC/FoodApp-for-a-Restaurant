// import dependencies
const mongoose = require('../utils/connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
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
        data: Buffer,
        contentType: String
    	},
        price: {
			 type: Number,
			required: true },
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
