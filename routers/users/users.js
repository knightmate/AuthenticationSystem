const express=require('express');
const router=express.Router();
const users=require('../../controllers/index');
const pass=require('passport');
 



 router.get('/forgotpassword', users.forgotpassword  );
 router.post('/handleforgotpassword',users.handleforgotpassword);
 
 //verify password link from email
 router.get('/verifyforgotpassword/:password',users.verifyforgotpassword);
 


router.get('/signup',function(req,res,next){


     console.log(req.isAuthenticated());

    if(req.isAuthenticated())
        {
         
            console.log("authencticated");
          
            return res.redirect('/');

        }
       
        
    res.render('signup.ejs');

});

//create the user
router.post('/createuser',users.signup);




//login router


router.get('/login',pass.authenticate(
    'local',
    {
        
        failureRedirect:'back',
        failureFlash: true,
        failureFlash: 'Invalid username or password.' 
         
    },
    
) ,users.login) 



// router.get('/login',pass.authenticate('local',function(error, sucess){

//       if(error)
//     console.log(error);
//      else
//      console.log(sucess);
     

    
// }) ,users.login);

router.get('/loginpage',function(req,res,next){

    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
     
    res.render('ex');

});




module.exports=router;