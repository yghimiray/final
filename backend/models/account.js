const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name:{type:String,required:true},
    trans:[{
        date:{type:String},
        desc:{type:String},
        user:{type:String},
        billno:{type:String},
        // items:[],
        opBal:{type:Number},
        Dr:{type:Number},
        Cr:{type:Number},
        clBal:{type:Number},
}]
})




module.exports=mongoose.model('account',accountSchema)