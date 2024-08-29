var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
    id:Number,
    title:String,
    url:String,
    desc:String,
    location:String,
    pflag:String,

})



var user=mongoose.model('/User',userSchema);
module.exports=user;
