const express=require('express');
const router=express.Router();
const usersRouter=require('./users/users');
 
require('../model/user');

router.use('/users',usersRouter);

router.get('/', function(req,res,next){
   
    
     console.log(req.user);

    
    return res.render('home',{
         
    });

    
});

 


module.exports=router;

 