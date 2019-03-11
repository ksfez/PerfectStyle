var sender = 'smtps://perfectStyle5778@gmail.com'   // The emailto use in sending the email
//(Change the @ symbol to %40 or do a url encoding )
var password = 'flowersflowers'  // password of the email to use

var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates-v2').EmailTemplate;

var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
var sendResetPasswordLink = transporter.templateSender(
  new EmailTemplate('./templates/resetPassword'), {
    	from: 'hello@yourdomain.com',
  });

exports.sendPasswordReset = function (email, name, tokenUrl) {
    // transporter.template
    sendResetPasswordLink({
        to: email,
        subject: 'Welcome to Perfect Style!'
    }, {
        name: name,
        token: tokenUrl
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n'+ JSON.stringify(info));
        }
    });
};