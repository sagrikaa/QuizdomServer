const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type : String,
        required:true
    },
    email : {
        type : String,
        required:true,
        unique:true
        
    },

    password : {
        type : String,
        required:true,
        
    },

    date:{
        type : Date,
        deafult :Date.now
    },
    
    avatar:{
        type:String
    },

    admin:{
        type: Boolean,
        deafult:false
        

    }
});

module.exports = User = mongoose.model('user', UserSchema);

