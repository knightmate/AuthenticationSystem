var userdb=require('../model/user');
var nodemailer = require('../config/nodemailer');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
var controller={};


controller.signup= async function(req,res,next)
{
    console.log(req.isAuthenticated());
    
    console.log('into signup controller');

    console.log(req.body);

    try{

    let user=await userdb.create(req.body);

     if(user)
     {
         res.locals.msg="Login Sucessfully!" 
        return res.render('ex');


     }else{
         

        return res.send('cannot', user);
        
     }
   
    }catch(err)
    {
        console.log(err);
        
         
       
         
        
       req.flash('success', "cannot get the duplicate");
       
       console.log(req.cookies);

        res.redirect('back');

    }
    


}


controller.login=function(req,res,next)
{

    console.log('into login controller');

   // console.log(req.user);

     
    res.redirect('/');


}

controller.handleforgotpassword=function(req,res,next)
{
   console.log('into handleforgot', req.body.email);

    const {email} =req.body;
    const token= crypto.randomBytes(12).toString('hex');
     
    userdb.findOne({email:email}, function(err, user){

        //console.log(user);

        if(err)
        {
            console.log("ERROR", err);
            return res.json({
                sucess:false,
                error:err
            }
                )
        }
        if(user)
        {
            console.log(user);
            user.passwordtoken=token;
           
            user.tokenexpiry=Date.now()+200000;
                  
            user.save();


            nodemailer.sendMail({
    
                from: 'meghraj.deshmukh103@gmail.com',
                to: 'abhijit.deshmukh95@gmail.com',
                subject: 'FORGOT PASWSWORD ,Reset password',
                text: 'Click on the link to verify account \n\n' + 'http://'+ req.headers.host + '/users/verifyforgotpassword/'+token + '\n\n'
              
        }, function(error, info){
          if (error) {
        
            console.log('ERROR');
        
            console.log(error);
        
        
          } else {
        
            console.log('Email sent: ' + info.response);
        
                // req.logOut();
               return res.redirect('/users/loginpage');
        
               console.log('wihtout return');
        
          }
        });


        }else{

            console.log("cannot find user", user);

            return res.send("cannot find user");

        }

    })


    
}

controller.forgotpassword=function(req,res,next)
{

   console.log('into forgot password view'); 
   res.render('forgotpassword');

}


controller.verifyforgotpassword= async function(req,res){
        try{

            console.log(Date.now());

            await userdb.findOne(
                {
                     
                      passwordtoken:req.params.password,
                      tokenexpiry:{ $gt:new Date()}
         

            },function(err,user){
                
                if(!user){
                    
                    //req.flash("error","Token has expired or is not valid");

                    console.log("error","Token has expired or is not valid");
                    return res.redirect("back");

                }
                user.verify = true;
                user.save();

               // req.flash("success", "congratulations, You have been verified");

               console.log("success", "congratulations, You have been verified");
                return res.redirect("/users/loginpage");
            });
        }
        catch(err){
           // req.flash("error",`Error caught ${err}`);

           console.log(err);
            res.redirect("back");
        }
    }




  

module.exports=controller;