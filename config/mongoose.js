const mongoose=require('mongoose');

       const url=`mongodb+srv://systemauth:systemauth@cluster0-uu4bi.mongodb.net/test?retryWrites=true&w=majority`

     mongoose.connect(url);


   

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting to Mongodb'));

db.once('open',function(){
   
    console.log('Connected to Database:: Mongodb');

});


module.exports=db;
