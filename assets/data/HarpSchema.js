const mongoose = require('mongoose');

// Orders from harp and merch sellers - for now save ordernum and pdf
const userharpsSchema = new mongoose.Schema({
    harpname: {
        type: String,
        required: 'Harp name is required',
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address not valid. Please try again.']
    },
    stringform: String
},{ versionKey: false, timestamps: true });

const Userharps = mongoose.model('Userharps', userharpsSchema);


module.exports.Userharps = Userharps;
