const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{type:String,required:true},
    trans:[{
        date:{type:String},
        price:{type:Number},
        user:{type:String},
        amount:{type:Number},
        desc:{type:String},
        party:{type:String},
        billno:{type:String},
        opBal:{type:Number},
        Dr:{type:Number},
        Cr:{type:Number},
        clBal:{type:Number},
    }]
    
})




module.exports=mongoose.model('product',productSchema)