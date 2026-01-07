import nodemailer from 'nodemailer';
import 'dotenv/config'

export const sendOTPMail = (otp, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfigurations = {

        from: process.env.MAIL_USER,

        to: email,


        subject: 'Password reset Otp',

        html: `<p> Your Otp for password reset is: <b>${otp}</b></p>`
    };
    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
    });
}




