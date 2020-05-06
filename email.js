const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.emailVerifySend = () => {
    console.log('in')
        const msg = {
        to: 'tmurv@shaw.ca',
        from: 'tech@take2tech.ca',
        subject: 'Sending with heroku api/v1/email Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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
