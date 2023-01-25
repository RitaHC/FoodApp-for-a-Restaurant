const mongoose = require('../utils/connection')

// ALl we need from mongoose to built SUB-DOCUMENTS is Schema constructor
//Sub-Docs ARE NOT MONGOOSE MODELS
// we'll destructure the Schema and model functions from mongoose
const { Schema } = mongoose

// comment schema
const cartSchema = new Schema ({
    items:[
        {type: Schema.Types.ObjectId,
        ref: 'Menu'} 
    ],
    active: {
        type: Boolean
    }
    
},{timestamps: true}
)

// take note: there is no model function happening anywher in this file
// That's because SUB-DOCS are not mongoose models

//////////////////////////////////////////////////////////////
//// Export Schema                                        ////
//////////////////////////////////////////////////////////////
module.exports = cartSchema
