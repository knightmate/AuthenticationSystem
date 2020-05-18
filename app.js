const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
const router=require('./routers');
const db=require('./config/mongoose');
const bodyparser=require('body-parser');
const passport=require('passport');
const passport_local=require('./config/passport-local');
const session=require('express-session');
const flash=require('connect-flash');
const customM=require('./config/middleware');

 





//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//session
 
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret:"meghraj",
    saveUninitialized:false,
    resave:false,
    cookie:{
        //session set for 100 minutes
        maxAge:(1000*60*100)

    },
    //we are using here MongoStore instance
    
    
}));
app.use(flash());
app.use(customM.setFlash);
//passport 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);



//bosy-parser , used for req.body
app.use(bodyparser.urlencoded());
app.use(cookieParser());


 
app.use('/', router);


  
 


 
 

app.listen(process.env.PORT || 3000, function(){
   
    console.log("server is running on ", port);


})
