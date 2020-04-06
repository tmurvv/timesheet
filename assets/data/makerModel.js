const mongoose = require('mongoose');

const makerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product maker (manufacturer) name is required.']
    },
    models: Array,
    othernames: Array
});

const Maker = mongoose.model('Maker', makerSchema);

module.exports = Maker;
