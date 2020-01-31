var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../../config/config');

var transport = {
	host: 'smtp.gmail.com',
	auth: {
		user: creds.USER,
		pass: creds.PASS
	}
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take messages');
	}
});

router.post('/send', (req, res, next) => {
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;
	var content = `Name: ${name} \n Email: ${email} \n Message: ${message} `;

	var mail = {
		from: name,
		to: 'joshuadias777@gmail.com',
		subject: 'New Message from Contact Form',
		text: content
	};

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				msg: 'fail'
			});
		} else {
			res.json({
				msg: 'success'
			});
		}
	});
});

module.exports = router;
