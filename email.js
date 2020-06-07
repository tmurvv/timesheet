const btoa = require('btoa');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { Users } = require('./assets/data/Schemas');

exports.emailVerifySend = (user) => {
    const emailEncode = btoa(user.email);
    const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM,
        subject: `Findaharp.com, please verify your email.`,
        text: `Welcome ${user.firstname} ${user.lastname}, please click the button below to verify your email address with us.`,
        html: `<html>
                    <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                line-height:1.8em;">
                        <h2>Message from findaharp.com</h2>
                        <p>Dear Findaharp user,<br><br>Thank you for registering, please click on the link below to
                            confirm your email address</p>
                        <p style="text-decoration: underline; font-size: 24px;"><a style="color:#6A75AA;font-weight: 600; " href=http://localhost:3006/ActivateEmail?email=${emailEncode}'"> Confirm Email</a></p>
                        <p><strong>&copy;2020 <a href="https://findaharp.com" style="color:#6A75AA;font-weight: 600; text-decoration: underline;">findaharp.com</strong></p>
                    </body>
                </html>`                      
    };
    //ES6
    // sgMail
    //   .send(msg)
    //   .then(() => {}, error => {
    //     console.error(error);

    //     if (error.response) {
    //       console.error(error.response.body)
    //     }
    //   });
    //ES8
    (async () => {
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);

            if (error.response) {
              console.error(error.response.body)
            }
        }
    })();
};

exports.emailResetPassword = (user) => {
    console.log('inresetpass', user)
    const emailEncode = btoa(user.email);
    const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM,
        subject: `Findaharp.com, Password Reset`,
        text: `Welcome ${user.firstname} ${user.lastname}, please click the button below to reset your password.`,
        html: `<html>
                    <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                line-height:1.8em;">
                        <h2>Message from findaharp.com</h2>
                        <p>Dear Findaharp user,<br><br>Please click on the link below to
                            reset your password.</p>
                        <p style="text-decoration: underline; font-size: 24px;"><a style="color:#6A75AA;font-weight: 600; " href=http://localhost:3006/ResetPassword?useremail=${emailEncode}'"> Reset Password</a></p>
                        <p><strong>&copy;2020 <a href="https://findaharp.com" style="color:#6A75AA;font-weight: 600; text-decoration: underline;">findaharp.com</strong></p>
                    </body>
                </html>`                      
    };
    //ES6
    // sgMail
    //   .send(msg)
    //   .then(() => {}, error => {
    //     console.error(error);

    //     if (error.response) {
    //       console.error(error.response.body)
    //     }
    //   });
    //ES8
    (async () => {
        try {
            console.log('intry')
            const res = await sgMail.send(msg);
            console.log(res)
        } catch (error) {
            console.error(error);

            if (error.response) {
              console.error(error.response.body)
            }
        }
    })();
};

exports.verifyEmail = async(req,res) => {
    const user = await Users.findOne(req.body.email);
    if (user) {
        Users.findOneAndUpdate({email: user.email}, {verifyEmail: true});
    }
}