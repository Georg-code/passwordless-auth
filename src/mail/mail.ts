"use strict";
import nodemailer from 'nodemailer';

export interface mailProps {
     adress: string;
     message: string;
}


const mail = async (props : mailProps) => {

  const testAccount = await nodemailer.createTestAccount();

 const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass, 
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', 
    to: props.adress, 
    subject: "Hello ✔", 
    html: props.message, 
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default mail;