var express = require('express');
var router = express.Router();
var User = require('../modals/reg');
var Pro=require('../modals/products');
// var u = require('../modals/reg');
const { insertMany } = require('../modals/product');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); 
});

router.post('/users',(req,res)=>{
  var newuser= new User(req.body);
  newuser.save()
  .then((user)=>{
    res.send("user added successfully"+user)
  })
  .catch((err)=>{
    console.log(err)
    res.send("error registered")
  })
})
router.delete('/users',(req,res)=>{
  User.deleteMany()
  .then(()=>{
    res.send("deleted successfully")
  })
  .catch((err)=>{
    console.log(err)
  })
})
router.delete('/users/:id',(req,res)=>{
  var id=req.params.id;
  User.findByIdAndDelete(id)
  .then(()=>{
    res.send("user deleted")
  })
  .catch((err)=>{
    res.send("error")
  })

})
router.get("/users",(req,res)=>{
  User.find({})
  .then((users)=>{
    res.send(" 👍 "+users)
  })
  .catch((err)=>{
    console.log(err)
  })
})
router.patch('/users/:id',(req,res)=>{
  var id=req.params.id;
  User.findByIdAndUpdate(id,{$set:req.body})
  .then(()=>{
    res.send("updated specific field of user")
  })
  .catch((err)=>{
    console.log(err)
    res.send("error occured")
  })

})
router.put("/users/:id",(req,res)=>{
  var id=req.params.id;
  User.findByIdAndUpdate(id,req.body)
  .then(()=>{
    res.send("updated successfully")
  })
  .catch((err)=>{
    console.log(err)
    res.send("error")
  })
})
router.post("/allusers",(req,res)=>{
  User.insertMany(req.body)
  .then(()=>{
    res.send("users added successfully")
  })
  .catch((err)=>{
    console.log(err)
  })
})





// products page apis

router.post('/products',(req,res)=>{
  Pro.insertMany(req.body)
  .then(()=>{
    res.send("products added successfuly")
  })
  .catch((err)=>{
    console.log(err)
  })
})
router.get('/products',(req,res)=>{
  Pro.find({})
    .then((product)=>{
      res.send(product)
    })
    .catch((err)=>{ 
      console.log(err)
    })
  
})
router.get('/products/:id',(req,res)=>{
  var id=req.params.id;
  Pro.findByIdAndUpdate(id)
    .then((product)=>{
      res.send(product)
    })
    .catch((err)=>{
      console.log(err)
    })
  
})

// router.put('/products/:id',(req,res)=>{
//   var id=req.params.id;
//   Pro.findByIdAndUpdate(id,req.body)
//   .then(()=>{
//     res.send("product updated successfully")
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// })
router.put('/products/:id', (req, res) => {
  const id = req.params.id;

  Pro.findByIdAndUpdate(id, req.body, { new: true })  
    .then(product => {
      if (!product) {
        return res.send("Product not found");
      }
      res.send("Product updated successfully");
    })
    .catch(err => {
      console.error(err);
    });
});
 
module.exports = router;
