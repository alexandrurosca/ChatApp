var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alex.rosca1996@gmail.com',
        pass: 'Iambetterthanyou'
    }
});

var mailOptions = {
    from: 'alex.rosca1996@gmail.com',
    to: 'cosmin.nechifor96@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

exports.sendMail = function () {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}