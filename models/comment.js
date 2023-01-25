//////////////////////////////////////////////////////////////
//// Our schema for Sub-Document                          ////
//////////////////////////////////////////////////////////////
const mongoose = require('../utils/connection')

// ALl we need from mongoose to built SUB-DOCUMENTS is Schema constructor
//Sub-Docs ARE NOT MONGOOSE MODELS
// we'll destructure the Schema and model functions from mongoose
const { Schema } = mongoose

// comment schema
const commentSchema = new Schema ({
    note: {
        type: String,
        required: true
    },
    author: {
        type: String
    }
},{timestamps: true}
)

// take note: there is no model function happening anywher in this file
// That's because SUB-DOCS are not mongoose models

//////////////////////////////////////////////////////////////
//// Export Schema                                        ////
//////////////////////////////////////////////////////////////
module.exports = commentSchema