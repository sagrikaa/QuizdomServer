const mongoose = require('mongoose');

const Difficulty={
    type:['easy','medium','difficult']
}

const QuizSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },


    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },

    difficult:{
        type:Difficulty.type,
        required:true
    },

    description:{
        type:String,
        maxlength:[300,'Keep Description short and less than 300 characters']
    },

    questionset:[{
        question:{
            type:String,
            required:true
        },
        options:[String],
        correctAns:{
            type:String,
            required:true
        }
    }],



});

module.exports=Quiz=mongoose.model('quiz',QuizSchema);