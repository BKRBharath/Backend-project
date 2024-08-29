var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var productschema=new Schema({
    id:String,
    name:String,
    price:Number,
    description:String,
    category:String,
});

var  Product=mongoose.model('products',productschema);
module.exports=Product;