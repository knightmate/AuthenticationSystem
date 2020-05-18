//user database schema

const mongoose=require('mongoose');
 
   const user=mongoose.Schema({
    
    email:{
        type:String,
        require:true,
        unique:true,
        
    }
    ,   
    name:{
           type:String,
           require:true,

       },
      phone:{

        type:String,
        require:true,

      },
      gender:{
        type:String,
        require:true,
        enum:['Male, Female'],
      },

      city:{
          type:String,
          require:true,
      },


      //password should be store encrypted, we will store it later into encrytped
      password:{
          type:String,
          require:true,

      }
      ,

      passwordtoken:{
        type:String

      },

      tokenexpiry:{
        type:Date,

      },
      verify:{
        type:Boolean
      }




   });


 


let User=mongoose.model('User', user);

//console.log('into mongoose', User);

module.exports=User;
