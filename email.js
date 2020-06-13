// packages
const btoa = require('btoa');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// internal
const { Users } = require('./assets/data/Schemas');
const { TRANSPORTER } = require('./assets/constants/emailTransport');

exports.sendMailUserToSeller = (contactform) => {
    console.log('contactform', contactform);
    // encode email for transport
    // const emailEncode = btoa(user.email); // BREAKING, email not encoded below
    // create reusable transporter object using the default SMTP transport
    const transporter = TRANSPORTER;
    // Send Email
    (async () => {
        try {
            // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>', // sender address
                to: `tmurv@shaw.ca`, // list of receivers BREAKING
                subject: `Findaharp.com, contact from potential harp buyer`,
                text: `This customer inquiry email from findaharp.com is intended for html viewing. Here is the raw data in case html is unavailable. ${contactform}`,
                html: `<html>
                            <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                        line-height:1.8em;">
                                <h2 style="color:#6A75AA;font-weight: 600;">Message from findaharp.com</h2>
                                <p>Hello ${contactform.sellername},<br></br>

                                Findaharp.com has received an inquiry from a potential harp buyer for the ${contactform.productmaker}, ${contactform.productmodel} listed on your website.<br></br>
                                <br></br>
                                <span style="color:#6A75AA;font-size:20px;">Details of inquiry:<br></br></span>
                                Make: ${contactform.productmaker}<br></br>
                                Model: ${contactform.productmodel}<br></br>
                                Price listed on website: ${contactform.price}<br></br>
                                Customer First Name: ${contactform.firstname}<br></br>
                                Customer Last Name: ${contactform.lastname}<br></br>
                                Customer Email: ${contactform.email}<br></br>
                                <br></br>
                                Customer Comments/Questions: ${contactform.comments}<br></br>
                                <br></br>
                                <span style="text-decoration: underline; font-size: 20px;"><a style="color:#6A75AA;font-weight: 600;" href="mailto: ${contactform.email}">Reply to Customer</a></span><br>
                                <br></br>
                                Thank you and good luck!<br></br>
                                findaharp.com<br></br>
                                <br></br>
                                <br></br>
                                 ---------------
                                <p>Findaharp internal use: <br></br>
                                Date of customer enquiry: ${new Date(contactform.date).toLocaleDateString()}<br></br>
                                Communication #id: ${contactform.contactid}</p><br></br>
                                <p><strong>&copy;2020 <a href="https://findaharp.com" style="color:#6A75AA;font-weight: 600; text-decoration: underline;">findaharp.com</a></strong></p>
                            </body>
                        </html>`
            });
        } catch (error) {
            console.error(error);

            if (error.response) {
              console.error(error.response.body)
            }
        }
    })();
};
exports.emailVerifySend = (user) => {
    // encode email for transport
    const emailEncode = btoa(user.email); // BREAKING, email not encoded below
    // create reusable transporter object using the default SMTP transport
    const transporter = TRANSPORTER;
    // Send Email
    (async () => {
        try {
            // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>', // sender address
                to: `${user.email}`, // list of receivers
                subject: `Findaharp.com, please verify your email.`,
                text: `Welcome ${user.firstname} ${user.lastname}, please click the button below to verify your email address with us.`,
                html: `<html>
                            <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                        line-height:1.8em;">
                                <h2>Message from findaharp.com</h2>
                                <p>Dear Findaharp user,<br><br>Thank you for registering, please click on the link below to confirm your email address</p>
                                <p style="text-decoration: underline; font-size: 24px;"><a style="color:#6A75AA;font-weight: 600;" href="https://findaharp-staging.take2tech.ca?findpath=activateemail&email=${user.email}"> Confirm Email</a></p>
                                <p><strong>&copy;2020 <a href="https://findaharp.com" style="color:#6A75AA;font-weight: 600; text-decoration: underline;">findaharp.com</a></strong></p>
                            </body>
                        </html>`
            });
        } catch (error) {
            console.error(error);

            if (error.response) {
              console.error(error.response.body)
            }
        }
    })();
};
exports.emailResetPassword = (user) => {
    // encode email
    // const emailEncode = btoa(user.email);
    // create transporter
    const transporter = TRANSPORTER;
    
    // send email
    (async () => {
        try {
            // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>', // sender address
                to: `${user.email}`, // list of receivers
                subject: `Findaharp.com, Password Reset`,
                text: `No Encode Welcome ${user.firstname} ${user.lastname}, please click the button below to reset your password.`, //BREAKING
                html: `<html>
                            <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                        line-height:1.8em;">
                                <h2>Message from findaharp.com</h2>
                                <p>Dear Findaharp user,<br><br>Please click on the link below to
                                    reset your password.</p>
                                <p style="text-decoration: underline; font-size: 24px;"><a style="color:#6A75AA;font-weight: 600; " href=http://localhost:3006?findpath=resetpassword&useremail=${user.email}'"> Reset Password</a></p> //BREAKING
                                <p><strong>&copy;2020 <a href="https://findaharp.com" style="color:#6A75AA;font-weight: 600; text-decoration: underline;">findaharp.com</strong></p>
                            </body>
                        </html>` 
            });

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
