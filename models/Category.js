const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },

        parent:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'category',
        }

        
    });

    module.exports= Category = mongoose.model('category',CategorySchema);