// packages
const btoa = require('btoa');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// internal
const { Users } = require('./assets/data/UserSchema');
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
exports.sendNewsletter = async () => {
    const users = await Users.find({$or: [{newsletter: true}, {newsletter: "true"}]})
    // create reusable transporter object using the default SMTP transport
    const transporter = TRANSPORTER;
    users.map(user => {
        // Send Email
        (async () => {
            try {
                // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
                const info = await transporter.sendMail({
                    from: '<harps@findaharp.com>', // sender address
                    to: `${user.email}`, // list of receivers
                    subject: `Findaharp.com March 2021 Newsletter`,
                    attachments: [{
                        filename: 'FAHNewsletterMar2021.pdf',
                        path: 'D:/FindStuffLtd/userNewsletterMar2021.pdf',
                        contentType: 'application/pdf'
                    }],
                    text: `Hello ${user.firstname} ${user.lastname}, Attached, please find our newsletter.`,
                    html: `<html>
                                <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif;
                                                            line-height:1.8em;">
                                    <div>  
                                        <h2>Plain Text Version - pdf attached</h2>
                                        <h3>Find a Harp Newsletter </h3>
                                        <div class='mainBody_title'>
                                            Hello Find a Harp Family
                                        </div>
                                        <div class='mainBody_mainArticle'>
                                            <div class='mainBody_mainArticle-paragraph'><span class='bigCap'>T</span>hank you for your interest in the latest news from findaharp.com. Our website was created by two harpists who own 9 harps between them! Triplett, Salvi, Camac, Pierpont, L&H, Markwood and Newsom are all represented.</div>
                                            <p>But enough about us, we want to get to know you! Please feel free to go to the contact page and tell us about you, your harps, and where you are from.</p>
                                            <p><span class='bigCap'>F</span>indaharp.com now has an online store featuring new strings, music, and accessories. We also have some used music and a few pre-purchased strings--never strung on a harp, but no longer needed by the harpist. Select ‘used only’ to find these heavily discounted items.</p>
                                            <div class='mainBody_mainArticle-paragraph'><span class='bigCap'>C</span>oming soon - </div>
                                            <div class='mainBody_mainArticle-paragraph centerText'>finda<span class='mainBody_emphasis'>NEW</span>harp.com</div>
                                            <p>This sister site will showcase harps from builders all around North America and feature our robust search engine. </p>
                                            <p>Feel free to spread the word. Interested harp builders can contact us on our Contact Form. Expected May 2021.	          </p>  
                                        </div>
                                        <div class="mainBody_justIn flexSB">
                                            <div class='mainBody_justIn-text'>
                                                <h3 class='mainBody_justIn-title'>Just In...</h3>
                                                <p>Stunning Wurlitzer Starke with a black soundboard! $14,700 located in the San Francisco area.</p>
                                                <p>We also have added an exquisite $47,000 Gold Style 26 and two Style 2000 Electro-acoustics.</p>
                                                <p>Come for a visit!!</p> 
                                            </div>       
                                        </div>
                                    </div>  
                                    <div class='sidebar'>
                                        <div class='sidebar_title'>FAST N EASY</div>
                                        <div class='sidebar_title'>STRING FORM*</div>
                                        <div class="sidebar_darkerbox">Our string form is specially designed for harpists and takes only seconds to complete.</div>
                                        <p>Before online stores and shopping carts, harpists used to complete an easy-to-use string form to purchase strings. Now it’s back!</p>
                                        <p>Our new online string form combines modern technology and old-fashioned simplicity and will leave you with more time to practice your etudes. </p>
                                        <p>As always…</p>
                                        <div class='sidebar_thankyou'>Thank you from</div>
                                        <div class='sidebar_thankyou'>findaharp.com</div>
                                        <p>*For strings labelled by octaves only. Others can use the Makes/Models menu selections.</p>
                                    </div>
                                </div>
                                <div class='footer_text'>
                                    <div>To unsubscribe, please reply to this email with "unsubscribe" in the subject line.</div>
                                    <div class='centerText'>© 2021 findaharp.com Ltd. All rights reserved.</div>
                                </div>
                            </div>
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
    });
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
exports.sendNewsletterHtml = () => {
    // create reusable transporter object using the default SMTP transport
    const transporter = TRANSPORTER;
    // Send Email
    (async () => {
        try {
            // send mail with defined transport object -- for multiple recipient use an outer foreach and send one at a time
            const info = await transporter.sendMail({
                from: '<harps@findaharp.com>', // sender address
                to: `tmurv@shaw.ca`, // list of receivers
                subject: `findaharp.com newsletter`,
                text: `Newsletter requires html to view.`,
                html: 'Embedded image: <img src="cid:logo_findaharp_adfljemck"/>',
                html: 'Embedded image: <img src="cid:newsletterBanner_adfljemck"/>',
                html: 'Embedded image: <img src="cid:speedy_harp_black_adfljemck"/>',
                html: 'Embedded image: <img src="cid:wurlitzer_adfljemck"/>',
                attachments: [
                    {
                        filename: 'newsletterBanner.jpg',
                        path: './assets/newsletter/newsletterBanner.jpg',
                        cid: 'newsletterBanner_adfljemck' //same cid value as in the html img src
                    }, 
                    {
                        filename: 'logo_findaharp.png',
                        path: './assets/newsletter/logo_findaharp.png',
                        cid: 'logo_findaharp_adfljemck' //same cid value as in the html img src
                    },
                    {
                        filename: 'speedy_harp_black.png',
                        path: './assets/newsletter/speedy_harp_black.png',
                        cid: 'speedy_harp_black_adfljemck' //same cid value as in the html img src
                    },
                    {
                        filename: '1_s4z0-90.png',
                        path: './assets/img/1_s4z0-90.JPG',
                        cid: 'wulitzer_adfljemck' //same cid value as in the html img src
                    },
                ],
                html: `<html>   
                <body>
                    <style>
                        box-sizing: border-box;
                        @font-face {
                            font-family: avenir;
                            src: url(./fonts/avenir_ff/AvenirLTStd-Roman.otf);
                        }
                        @font-face {
                            font-family: 'Avenir Next Bold';
                            font-weight: bold;
                            font-style: normal;
                            font-variant:normal;
                            src: url(./fonts/avenir_ff/Avenir_Next_Condensed_Bold.otf);
                        }
                        @font-face {
                            font-family: 'Constantia';
                            font-weight: bold;
                            font-style: normal;
                            font-variant:normal;
                            src: url(./fonts/ConstantiaFont.ttf);
                        }
                        @font-face {
                            font-family: 'Constantia Bold';
                            font-weight: bold;
                            font-style: normal;
                            font-variant:normal;
                            src: url(./fonts/CONSTANB.TTF);
                        }
                        @font-face {
                            font-family: 'Constantia Bold Italic';
                            font-weight: bold;
                            font-style: italic;
                            font-variant:normal;
                            src: url(./fonts/constanz.ttf);
                        }
                        @font-face {
                            font-family: "Metropolis Extra Bold";
                            font-weight: bold;
                            font-style: normal;
                            font-variant:normal;
                            src: url(./fonts/metropolis_ff/Metropolis-ExtraBold.otf);
                        }
                        body { 
                            margin: 0;
                        }
                        .wrapper {
                            max-width: 900px;
                            position: relative;
                        }
                        .banner {
                            max-width: 900px;
                        }
                        .banner_image {
                            opacity: 0.6;
                            position: absolute;
                            left: 0;
                            top: 80px;
                            width: 100%;
                            max-width: 900px;
                            height: 300px;
            
                        }
                        .banner_text {
                            position: absolute;
                            right: 0;
                            top: 36.5px;
                            font-family: Constantia;
                            color:goldenrod;
                            text-align: right;
                        }
                        .banner_logo {
                           
                        }
                        .mainTitle {
                            background-color: black;
                            color: white;
                            font-family: "avenir";
                            position: relative;
                            /* z-index: 1000; */
                            position: absolute;
                            left: 40px;
                            top: 0px;
                            width: 57%;
                            padding: 30px 60px;
                        }
                        .mainTitle_img {
                            width: 100%;
                        }
                        .mainBody {
                            box-sizing: border-box;
                            position: absolute;
                            top: 380px;
                            padding: 40px 40px;
                            width: 70%;
                            /* border: 1px solid red; */
                        }
                        .mainBody p,
                        .sidebar p,
                        .mainBody_mainArticle-paragraph {
                            /* font-family: vivaldi; */
                            font-family: Constantia, vivaldi;
                            font-size: 18;
                        }
                        .mainBody_title {
                            color: #FFCA08;
                            font-size: 30px;
                            text-transform: uppercase;
                            font-family: "Calibri Light";
                            font-weight: 600;
                        }
                        .mainBody_mainArticle {
                            column-count: 2;
                            column-rule: black;
                            font-family: "avenir";
                            margin-top: 10px;
                        }
                        .mainBody_emphasis {
                            font-family: "Constantia Bold Italic";
                            font-size: 20px;
                        }
                        .mainBody_justIn {
                            margin-top: 25px;
                            width: 100%;
                        }
                        .mainBody_justIn-title {
                            font-family: "Constantia Bold Italic";
                            font-size: 24px;
                        }
                        .mainBody_justIn-text {
                            padding-left: 15px;
                        }
                        .sidebar {
                            box-sizing: border-box;
                            position: absolute;
                            top: 460px;
                            right: 35px;
                            padding: 10px 20px 70px;
                            width: 30%;
                            background-color: #FFE99C;
                            color: black;
                        }
                        .sidebar_img {
                            height: 70px;
                            margin: 15px;
                        }
                        .sidebar_title {
                            text-align: center;
                            font-size: 30px;
                            text-transform: uppercase;
                            font-family: "Calibri Light";
                            font-weight: bold;
                        }
                        .sidebar_darkerbox {
                            background-color: #FFCA08;
                            padding: 10px;
                            text-align: center;
                            font-family: "Constantia Bold Italic";
                            font-size: 18px;
                            margin-top: 15px;
                        }
                        .sidebar_thankyou {
                            text-align: center;
                            font-family: "Constantia Bold Italic";
                            font-size: 24px;
                        }
                        .footer {
                            height: 255px;
                            background-color: #FFDF6B;
                            width: 150%;
                            position: relative;
                        }
                        .footer_text {
                            position: absolute;
                            bottom: 40px;
                            right: 50%;
                            transform: translateX(50%);
                            text-align: center;
                        }
                        .bigCap {
                            font-size: 36px;
                        }
                        .btnToLink {
                            background-color: transparent;
                            outline: none;
                            border: none;
                            font-size: 14px;
                            text-decoration: underline;
                            color: #6A75AA;
                        }
                        .flexSA {
                            display: flex;
                            justify-content: space-around;
                        }
                        .flexSB {
                            display: flex;
                            justify-content: space-between;
                        }
                        .centerText {
                            width: 100%;
                            text-align: center;
                        }
                        .hidden {
                            display: none;
                        }
                        .posrel {
                            position: relative;
                        }
                    </style>
                    <div class='wrapper'>
                        <div class='banner'>
                            <img
                                class="banner_image"
                                src='cid:newsletterBanner_adfljemck'
                                alt="beautiful curved harp neck"
                            />
                            <div class="mainTitle">
                                <img
                                    class="mainTitle_img"
                                    src='cid:logo_findaharp_adfljemck'
                                    alt="Find a Harp text logo"
                                />
                            </div>
                            <div class="banner_text">
                                <div>Harpist Newsletter</div>
                                <div>March 21, 2021</div>
                            </div>
                        </div>
                        <div class='flexSB posrel'>
                            <div class='mainBody'>
                                <div class='mainBody_title'>
                                    Hello Find a Harp Family
                                </div>
                                <div class='mainBody_mainArticle'>
                                    <div class='mainBody_mainArticle-paragraph'><span class='bigCap'>T</span>hank you for your interest in the latest news from findaharp.com. We are only 8 months old and have had over 2000 harpists from all over the world visit our website!</div>
                                    <p>We want to get to hear about you and your harp(s)! Please go to “contact us” on findaharp.com and tell us about you, where you are from, and about your harp(s). </p>
                                    <p><span class='bigCap'>F</span>indaharp.com now has an online store featuring new strings, music, and accessories. We also have some used music and a few pre-purchased strings (never strung on a harp, but no longer needed by the harpist). Select ‘used only’ to find these heavily discounted items.</p>
                                    <div class='mainBody_mainArticle-paragraph'><span class='bigCap'>C</span>oming soon - </div>
                                    <div class='mainBody_mainArticle-paragraph centerText'>finda<span class='mainBody_emphasis'>NEW</span>harp.com</div>
                                    <p>This sister site will showcase harps from builders all around North America and feature our robust search engine. </p>
                                    <p>Feel free to spread the word. Interested harp builders can contact us on our Contact Form. Expected May 2021.	          </p>  
                                </div>
                                <div class="mainBody_justIn flexSB">
                                    <img
                                        class="mainBody_justIn-img"
                                        src="cid:wulitzer_adfljemck"
                                        alt="Find a Harp text logo"
                                    />
                                    <div class='mainBody_justIn-text'>
                                        <h3 class='mainBody_justIn-title'>Just In...</h3>
                                        <p>Stunning Wurlitzer Starke with a black soundboard! $14,700 located in the San Francisco area.</p>
                                        <p>We also have added an exquisite $47,000 Gold Style 26 and two Style 2000 Electro-acoustics.</p>
                                        <p>Come for a visit!!</p> 
                                    </div>       
                                </div>
                                <div class='footer'>
                                    <div class='footer_text'>
                                        <button class='btnToLink' onclick="changepage()">Unsubscribe</button>from this newsletter
                                        <div class='centerText'>© 2021 findaharp.com Ltd. All rights reserved.</div>
                                    </div>
                                </div>
                            </div>  
                            <div class='sidebar'>
                                <div class='flexSA'>
                                    <img class='sidebar_img' src='cid:speedy_harp_black_adfljemck' alt='logo of speedy harpist pushing harp on dolly'/>
                                </div>
                                <div class='sidebar_title'>FAST N EASY</div>
                                <div class='sidebar_title'>STRING FORM*</div>
                                <div class="sidebar_darkerbox">Our string form is specially designed for harpists and takes only seconds to complete.</div>
                                
                                <p>Before online stores and shopping carts, harpists used to complete an easy-to-use string form to purchase strings. Now it’s back!</p>
                                
                                <p>Our new online string form combines modern technology and old-fashioned simplicity and will leave you with more time to practice your etudes. </p>
                                
                                <p>As always…</p>
                                
                                <div class='sidebar_thankyou'>Thank you from</div>
                                <div class='sidebar_thankyou'>findaharp.com</div>
                                
                                <p>*For strings labelled by octaves only. Others can use the Makes/Models menu selections.</p>
                            </div>
                        </div>
                        <div class='hidden'>tmurv@shaw.ca</div>
                    </div>
                    <script>
                        function changepage() {
                            alert('imin');
                            location.href='"http://localhost:3000/api/v1/newsletter/unsubscribe/?email="+document.querySelector('.hidden').innerText+"'"
                        }
                    </script>        
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