var express = require('express');
var router = express.Router();
var Product=require('../modals/product');
var User=require('../modals/registration');
var bcrypt=require('bcryptjs');
var jwt=require("jsonwebtoken");
var hashpassword,token;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/products',(req,res)=>{
  var newproduct=new Product(req.body);
  newproduct.save()
  .then((product)=>{
    res.send('product added'+product);
  })
  .catch((err)=>{
    console.log(err)
  })

})
router.get('/products',(req,res)=>{
  Product.find({}).select("name price")
  .then((product)=>{
    res.send(product);
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.put('/products/:id',(req,res)=>{
  var id=req.params.id;
  var updatedproduct=req.body;
  Product.findByIdAndUpdate(id,updatedproduct)
    .then(()=>{
      res.send("product updated successfully")
    })
    .catch((err)=>{
      console.log(err)
    })

})  
router.get('/products/:id',(req,res)=>{
  var id=req.params.id;
  Product.findOne({_id:id}).select("id name price")
  .then((product)=>{
    res.send(product)
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.patch('/products/:id',(req,res)=>{
  var id=req.params.id;
  // var updatedproduct=req.body;
  Product.findByIdAndUpdate(id,{$set:req.body},{new:true})
    .then((product)=>{
      res.send("product updated successfully"+product)
    })
    .catch((err)=>{
      console.log(err)
    })

})

router.delete('/products/:id',(req,res)=>{
  var id=req.params.id;
  Product.findByIdAndDelete(id)
    .then(()=>{
      res.send("product deleted")
    })
    .catch((err)=>{
      console.log(err)
    })

})
router.delete('/products',(req,res)=>{
  
  Product.deleteMany()
    .then(()=>{
       res.send("products deleted")
     })
    .catch((err)=>{
      console.log(err)
    })
})

// router.put('/update/:id',(req,res)=>{
//   var id=req.params.id;
//   Product.findByIdAndUpdate(id,req.body)
//   .then(()=>{
//     res.send("product updated successfully")
//   })
//   .catch((err)=>{
//     res.send(err);
//     console.log(err)
//   })
// })





// sign up page 

router.post('/register',(req,res)=>{
  User.findOne({username:req.body.username})
  .then((user)=>{
    if(user){
      res.send("user already exist")
    }
    else{
      hashpassword=bcrypt.hashSync(req.body.password,8);
      var newuser=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashpassword,
        
      });
      newuser.save()
      .then((user)=>{
        res.send("user registered successfully")
      })
      .catch((err)=>{
        res.send(err)
      })
    }
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.post("/login",(req,res)=>{
  User.findOne({username:req.body.username})
  .then((user)=>{
    if(user){
      if(bcrypt.compareSync(req.body.password,user.password)){
        res.send({
          message:"user loggined successfully",
          username:user.username,
        });
      }
      else{
        token=jwt.sign({username:user.username,id:user._id},"123",{expiresIn:86400});

        res.send("Invalid credentials")
      }
    }
    else{
      res.send("user not found")
    }
  })

})


module.exports = router;
