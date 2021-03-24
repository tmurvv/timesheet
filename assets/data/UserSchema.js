const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Users
const usersSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address not valid. Please try again.']
    },
    emailverified: {
        type: Boolean, 
        default: false
    },
    password: {
        type: String,
        minlength: 8
    },
    newsletter: {
        type: Boolean, 
        default: false
    },
    distanceunit: {
        type: String,
        enum: {
            values: ['miles', 'kms'],
            message: 'Preferred distance unit must be "miles" or "kms".'
        },
        default: 'miles'
    },
    currency: {
        type: String,
        enum: {
            values: ['USD', 'CAD'],
            message: 'Currency must be "USD" or "CAD".'
        },
        default: 'USD'
    },
    role: {
        type: String, 
        enum: {
            values: ['user', 'seller', 'newsletteronly', 'admin', 'other', 'not set'],
            message: 'User Type must be user, seller, admin, not set, or other.'
        },
        default: 'user'
    },
    agreements: Array,
    _date_created: {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now()
    }
},{ versionKey: false });
usersSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next;
    const saltRounds=10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});
usersSchema.pre('save', async function(next) {
    if(!this.isModified('password') || this.isNew) return next;
    const saltRounds=10;
    this.passwordChangedAt = Date.now()-1000; // one sec earlier so it for sure happens before JWT cookie is set
    next();
});
usersSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changeTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        return JWTTimestamp < changeTimeStamp;
    }
    return false;
}
module.exports.Users = mongoose.model('Users', usersSchema);
