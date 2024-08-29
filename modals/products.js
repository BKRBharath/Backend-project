var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var proSchema=new Schema({
    id:String,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    pflag:String,
});

var  Pro=mongoose.model('pro',proSchema);
module.exports=Pro;