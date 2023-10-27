const expressJwt = require('express-jwt');

function authJwt() {
	const secret = process.env.SECRET;
	const api = process.env.API_URL;

	return expressJwt({
		secret,
		algoritms: ['HS256'],
		isRevoked: isRevoked,
	}).unless({
		path: [{ url: /(.*)/ }],
	});
}

async function isRevoked(req, payload, done) {
	if (!payload.isAdmin) {
		done(null, true);
	}
	done();
}

module.exports = authJwt;
