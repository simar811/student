const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    subject: String,
    createdBy:String,
    content: [{
        question: String,
        options: [String],
        answer: Number
    }]
});

module.exports = mongoose.model('Test', testSchema);