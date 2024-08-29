var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var userSchema=new Schema({
    username:String,
    email:String,
    password:String,
})



var userr=mongoose.model('/signup',userSchema);
module.exports=userr;