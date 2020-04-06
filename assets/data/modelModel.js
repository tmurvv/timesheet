const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A model name is required.']
    },
    maker: String,
    productType: {
        type: String,
        enum: ['lever', 'pedal', 'lever-free', 'not sure', 'other']
    },
    productSize: Number,
    othernames: Array
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
