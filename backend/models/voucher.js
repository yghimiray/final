const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    billno:{type:String,required:true},
    name:{type:String,required:true},
    items:[],
    trans:{type:Object}
})




module.exports=mongoose.model('voucher',voucherSchema)