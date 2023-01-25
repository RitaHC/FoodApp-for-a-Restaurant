// import what I need
const { Schema, model } = require('../utils/connection.js')
const cartSchema = require('./cart')

// create the schema
const UserSchema = new Schema(
	{
		username: { 
			type: String, 
			required: true, 
			unique: true 
		},
		password: { 
			type: String, 
			required: true 
		},
		email: {
			type: String, 
			required: true 
		},
		date: {
			type: Date,
			default: Date.now
		},
		mycart: [cartSchema]
	},
	{ timestamps: true }
)

// creat the model
const User = model('User', UserSchema)

// export the model
module.exports = User
