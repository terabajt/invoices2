const express = require('express');
const { User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

//localhost:3000/api/v1/users

router.get('/', async (req, res) => {
	const userList = await User.find().select('-passwordHash');
	if (!userList) {
		res.status(500).json({ success: false });
	}
	res.send(userList);
});

router.get('/:id', async (req, res) => {
	const user = await User.findById(req.parrams.id).select('-passwordHash');

	if (!user) {
		return res.status(500).json({ message: 'The user with that ID was not found! Try with correct ID.' });
	}
	res.status(200).send(user);
});

router.post('/', async (req, res) => {
	let user = new User({
		email: req.body.email,
		name: req.body.name | 'Enter your company name',
		city: req.body.city,
		address1: req.body.address1,
		address2: req.body.address2,
		zip: req.body.zip,
		phone: req.body.phone,
		isAdmin: req.body.isAdmin,
		passwordHash: bcrypt.hashSync(req.body.password, 10),
	});
	user = await user.save();

	if (!user) return res.status(400).send('The user cannot be created.');
	res.send(user);
});

module.exports = router;
