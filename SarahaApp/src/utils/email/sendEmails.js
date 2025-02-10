import nodemailer from 'nodemailer'



    // async..await is not allowed in global scope, must use a wrapper
    export const sendEmail=async({to=[],cc="",bcc="",subject="confirmEmail",text="",html="",attachments=""}={})=> {
        const transporter = nodemailer.createTransport({
            service:'gmail',
              auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
              },
            });
            
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `"sarahaAPP" <${process.env.EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
        attachments:[
          
        ]
      });
    
     return info
    }