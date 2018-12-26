const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    status : {
        type : String,
        default : 'Incomplete'
    }
},{ timestamps : true });

module.exports = mongoose.model('User',userSchema);
