const mongoose = require('mongoose');
const {Schema} = mongoose;

const Task = new Schema({
    materia: String,
    title: String,
    description: String,
    assignmentDate: Date,
    deliveryDate: Date,
});

module.exports = mongoose.model('Task', Task);