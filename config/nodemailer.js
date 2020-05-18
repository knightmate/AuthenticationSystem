const nodemailer=require('nodemailer');

  let mail=nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'meghraj.deshmukh103@gmail.com',
     // pass: ''
      
    }
  });


  module.exports=mail;