// import dependencies
const mongoose = require('./connection')

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
        price: {
			 type: Number,
			required: true },
		ready: { type: Boolean, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

// const Example = model('Example', exampleSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
// module.exports = Example
