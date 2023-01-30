const mongoose = require('../utils/connection')

// ALl we need from mongoose to built SUB-DOCUMENTS is Schema constructor
//Sub-Docs ARE NOT MONGOOSE MODELS
// we'll destructure the Schema and model functions from mongoose
const { Schema, model } = mongoose

// cart schema
const cartSchema = new Schema ({
    items:[
        {type: Schema.Types.ObjectId,
        ref: 'Menu'} 
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
    
},{
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}
)


cartSchema.virtual('totalPrice').get( function () {
    let total = 0
    this.items.forEach(item => {
       total +=item.price})
    return total 
})
const Cart = model('Cart', cartSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Cart
