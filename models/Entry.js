const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EntrySchema = new Schema({
    tag: {
        type: String,
        required: true
    },
    pattern: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    entry_data: {
        type: Date,
        default: Date.now
    }
})

const model = mongoose.model('Entry', EntrySchema)
module.exports = model
