//created a middleware to store flash messages in response
module.exports.setFlash=function(req,res,next){
    res.locals.flash={
        
        success:req.flash('success')

    } 
    // console.log('middleware called');

    next();
}