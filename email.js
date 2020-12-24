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
    // Send emails to seller, customer, Find a Harp
    (async () => {
        try {
            // To Seller
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>', // sender address
                to: contactform.selleremail,
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
    // To Customer
        try {
            // contactform.sellername = 'For Testing'; //BREAKINk
            const sellerText = contactform.sellername === "Find a Harp"?'You can expect to hear back within one business day.': `If you do not hear back from ${contactform.sellername} within two business days, please reply to this e-mail and let us know.`;           
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>',
                to: `${contactform.email}`,
                // to: '<tmurv@shaw.ca>', //test email, should be to customer
                subject: `Thank you for your inquiry`,
                text: `This email intended for html viewing. Thank you for your inquiry to our harp seller. They will contact you by email. If you do not hear from them within 2 business days, please reply to this email.`,
                html: `<html>
                            <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                        line-height:1.8em;">
                                <h2 style="color:#6A75AA;font-weight: 600;">Message from findaharp.com</h2>
                                <p>Hello ${contactform.firstname} ${contactform.lastname},<br />
                                <br />
                                Thank you for your inquiry to ${contactform.sellername} for the ${contactform.productmaker}, ${contactform.productmodel} listed on the Find a Harp website. ${sellerText}
                                <br />
                                <br />
                                <span style="color:#6A75AA;font-size:20px;">Details of inquiry:<br /></span>
                                Make: ${contactform.productmaker}<br />
                                Model: ${contactform.productmodel}<br />
                                Price listed on website: ${contactform.productprice}<br />
                                Seller: ${contactform.sellername}<br />
                                <br />
                                Your Comments/Questions: ${contactform.comments}<br />
                                <br />
                                
                                Thank you again,<br />
                                findaharp.com<br />
                                <br />
                                <br />
                                 ---------------
                                <p>Findaharp internal use: <br />
                                Date of customer inquiry: ${new Date(contactform.date).toLocaleDateString()}<br />
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
        // Copy To Find a Harp
        try {
            // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>', // sender address
                to: 'tisha@findaharp.com', 
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
                                Newsletter Signup: ${contactform.newsletter?'true':'unchanged'}<br />
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
                to: contactform.selleremail,
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
                                Customer Email: ${contactform.email}<br />
                                Newsletter Signup: ${contactform.newsletter?'true':'unchanged'}
                                <br />
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
                                <p style="text-decoration: underline; font-size: 24px;"><a style="color:#6A75AA;font-weight: 600;" href="https://findaharp-api.herokuapp.com/api/v1/users/verifyuser/${user.email}"> Confirm Email</a></p> 
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
                                <p style="text-decoration: underline; font-size: 24px;"><a style="color:#6A75AA;font-weight: 600;" href="https://findaharp.com/?reset=${emailEncode}"> Reset Password</a></p>
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

exports.sendReceipt = async (body) => {
     // encode email
    //  const emailEncode = btoa(body.user.shippingemail);
    // create transporter
     const transporter = TRANSPORTER;
    //  send email
     if (!body.shipping || (body.shipping && body.shipping!==-1)) {
        (async () => {
            try {
                // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
                const info = await transporter.sendMail({
                    from: '<orders@findaharp.com>', // sender address
                    to: body.email, // list of receivers
                    subject: `Findaharp.com, Order Receipt`,
                    text: `This receipt designed for html viewing. ${body}`,
                    html: body.html
                });
            } catch (e) {
                console.log('here', e.message);
            }
        })();
    }
    // send order to orders@findaharp.com
     (async () => {
         try {
             // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
             const info = await transporter.sendMail({
                 from: '<orders@findaharp.com>', // sender address
                 to: 'orders@findaharp.com', // list of receivers
                 subject: `Customer order notification`,
                 text: `This receipt designed for html viewing. ${body}`,
                 html: `<h2>A customer has ordered:</h2><h4>From: ${body.email}</h4>${body.html}`
             });
         } catch (e) {
             console.log('here', e.message);
         }
     })();
}

exports.agreementSigned = () => {
    // create reusable transporter object using the default SMTP transport
    const transporter = TRANSPORTER;
    // Send Email
    (async () => {
        try {
            // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>', // sender address
                to: `tmurv@shaw.ca`, // list of receivers
                subject: `An agreement has been signed`,
                text: `An agreement has been signed.`,
                html: `<p>An agreement has been signed.</p>`
            });
        } catch (error) {
            console.error(error);

            if (error.response) {
              console.error(error.response.body)
            }
        }
    })();
};