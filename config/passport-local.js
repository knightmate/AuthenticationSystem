const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./../model/user')

passport.use(new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true,
    

    },
    function(req,email, password, done){
        // GET EMPLOYEE USING EMAIL
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {

                console.log("wring credentials");
                 
                req.flash('error','Invalid Username/Password');

                return done(null,false);
            }
           
           // console.log('passpord', password===user.password);



            if (user.password!==password) {

                console.log("wring pass credentials");

                return done(null, false, { message: 'Wrong Credentials.' });

            }
            return done(null, user);
        })
    }
))

passport.serializeUser(function(user, done){


    done(null, user.id);
    console.log('into serail');

})

passport.deserializeUser(function(id, done){
   
    console.log('into dDserail', id);

    User.findById(id, function (err, user) {
        done(err,user);

        console.log('into Dserail');

    });
})

// SET USER IN LOCALS
passport.setUser= (req, res, next)=>{
      console.log('setUser()');

    if(req.isAuthenticated()){
    console.log('isauthenticated');
    
        let user = {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }

        res.locals.user = user;
    }
    next();
}

module.exports = passport;