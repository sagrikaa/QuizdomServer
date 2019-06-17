const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema(
    {
        question:{
            type:String
            
        },

        answer:{
            type:String
        },

        id:{
            type:mongoose.Schema.Types.ObjectId
        }

        
    });

    module.exports= Faq = mongoose.model('faq',FaqSchema);