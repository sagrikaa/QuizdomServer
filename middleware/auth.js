const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');

	//check if the token is present
	if (!token) {
		return res.status(401).json({ error: [ { msg: 'No token found' } ] });
	}

	//verify token
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		console.log(req.user);
		next();
	} catch (err) {
		console.log(err.message);
		return res.status(401).json({ error: [ { msg: 'Invalid token' } ] });
	}
};
