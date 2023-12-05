const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema(
    {
        item:{
            type:String,
            required:true
        }
    }
)

module.exports=mongoose.model('items',itemSchema);