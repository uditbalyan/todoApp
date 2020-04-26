const mongoose = require('mongoose');


// required schema for the todo APP
const todoSchema = new mongoose.Schema({

    desc: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    cat: {
        type: String,
        required: true
    }

})


const TodoDB = mongoose.model('TodoDB', todoSchema);

module.exports = TodoDB;