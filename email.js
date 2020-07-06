// packages
const btoa = require('btoa');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// internal
const { Users } = require('./assets/data/Schemas');
const { TRANSPORTER } = require('./assets/constants/emailTransport');

exports.sendMailUserToSeller = (contactform) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = TRANSPORTER;
    // Send Email
    (async () => {
        try {
            // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>', // sender address
                to: contactform.selleremail, // list of receivers BREAKING
                subject: `Findaharp.com, contact from potential harp buyer`,
                text: `This customer inquiry email from findaharp.com is intended for html viewing. Here is the raw data in case html is unavailable. ${contactform}`,
                html: `<html>
                            <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                        line-height:1.8em;">
                                <h2 style="color:#6A75AA;font-weight: 600;">Message from findaharp.com</h2>
                                <p>Hello ${contactform.sellername},<br />

                                Findaharp.com has received an inquiry from a potential harp buyer for the ${contactform.productmaker}, ${contactform.productmodel} listed on your website.<br />
                                <br />
                                <span style="color:#6A75AA;font-size:20px;">Details of inquiry:<br /></span>
                                Make: ${contactform.productmaker}<br />
                                Model: ${contactform.productmodel}<br />
                                Price listed on website: ${contactform.productprice}<br />
                                Customer First Name: ${contactform.firstname}<br />
                                Customer Last Name: ${contactform.lastname}<br />
                                Customer Email: ${contactform.email}<br />
                                <br />
                                Customer Comments/Questions: ${contactform.comments}<br />
                                <br />
                                <span style="text-decoration: underline; font-size: 20px;"><a style="color:#6A75AA;font-weight: 600;" href="mailto: ${contactform.email}">Reply to Customer</a></span><br>
                                <br />
                                Thank you and good luck!<br />
                                findaharp.com<br />
                                <br />
                                <br />
                                 ---------------
                                <p>Findaharp internal use: <br />
                                Date of customer enquiry: ${new Date(contactform.date).toLocaleDateString()}<br />
                                Communication #id: ${contactform.contactid}</p><br />
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
        try {
            // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>', // sender address
                to: 'tisha@findaharp.com', // list of receivers BREAKING
                subject: `Findaharp.com, contact from potential harp buyer`,
                text: `This customer inquiry email from findaharp.com is intended for html viewing. Here is the raw data in case html is unavailable. ${contactform}`,
                html: `<html>
                            <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                        line-height:1.8em;">
                                <h2 style="color:#6A75AA;font-weight: 600;">Message from findaharp.com</h2>
                                <p>Hello ${contactform.sellername},<br />

                                Findaharp.com has received an inquiry from a potential harp buyer for the ${contactform.productmaker}, ${contactform.productmodel} listed on your website.<br />
                                <br />
                                <span style="color:#6A75AA;font-size:20px;">Details of inquiry:<br /></span>
                                Make: ${contactform.productmaker}<br />
                                Model: ${contactform.productmodel}<br />
                                Price listed on website: ${contactform.productprice}<br />
                                Customer First Name: ${contactform.firstname}<br />
                                Customer Last Name: ${contactform.lastname}<br />
                                Customer Email: ${contactform.email}<br />
                                <br />
                                Customer Comments/Questions: ${contactform.comments}<br />
                                <br />
                                <span style="text-decoration: underline; font-size: 20px;"><a style="color:#6A75AA;font-weight: 600;" href="mailto: ${contactform.email}">Reply to Customer</a></span><br>
                                <br />
                                Thank you and good luck!<br />
                                findaharp.com<br />
                                <br />
                                <br />
                                 ---------------
                                <p>Findaharp internal use: <br />
                                Date of customer enquiry: ${new Date(contactform.date).toLocaleDateString()}<br />
                                Communication #id: ${contactform.contactid}</p><br />
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
exports.contactUsForm = (contactform) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = TRANSPORTER;
    // Send Email
    (async () => {
        try {
            // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
            const info = await transporter.sendMail({
                from: 'harps@findaharp.com', // sender address
                to: contactform.selleremail, // list of receivers BREAKING
                subject: `Contact Us form from findaharp.com`,
                text: `This contact us form from findaharp.com is intended for html viewing. Here is the raw data in case html is unavailable. ${contactform}`,
                html: `<html>
                            <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                        line-height:1.8em;">
                                <h2 style="color:#6A75AA;font-weight: 600;">Message from findaharp.com</h2>
                                <p>Hello Tisha,<br />

                                Findaharp.com has received a Contact Us form submission.
                                <br><br/>
                                <span style="color:#6A75AA;font-size:20px;">Details of inquiry:</span><br />
                                Customer First Name: ${contactform.firstname}<br />
                                Customer Last Name: ${contactform.lastname}<br />
                                Customer Email: ${contactform.email}
                                <br><br/>
                                Customer Comments/Questions: ${contactform.comments}
                                <br />
                                <span style="text-decoration: underline; font-size: 20px;"><a style="color:#6A75AA;font-weight: 600;" href="mailto: ${contactform.email}">Reply to Customer</a></span>
                                <br />
                                Thank you and good luck!<br />
                                findaharp.com
                                <br />
                                 ---------------
                                <p>Findaharp internal use:
                                Date of customer enquiry: ${new Date(contactform.date).toLocaleDateString()}<br />
                                Communication #id: ${contactform.contactid}</p><br />
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
                                <p style="text-decoration: underline; font-size: 24px;"><a style="color:#6A75AA;font-weight: 600;" href="https://findaharp-api.herokuapp.com/api/v1/users/verifyuser/tmurv@shaw.ca"> Confirm Email</a></p> 
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
    const emailEncode = btoa(user.email);

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
                text: `Welcome ${user.firstname} ${user.lastname}, please click the button below to reset your password.`,
                html: `<html>
                            <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                        line-height:1.8em;">
                                <h2>Message from findaharp.com</h2>
                                <p>Dear Findaharp user,<br><br>Please click on the link below to
                                    reset your password.</p>
                                <p style="text-decoration: underline; font-size: 24px;"><a style="color:#6A75AA;font-weight: 600;" href="https://findaharp-api.take2tech.ca/?reset=${emailEncode}"> Reset Password</a></p>
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
