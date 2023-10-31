const express = require('express');
const { Customer } = require('../models/customer');

const router = express.Router();

//localhost:3000/api/v1/customers

router.get('/', async (req, res) => {
	const customerList = await Customer.find().sort({ name: -1 });
	if (!customerList) {
		res.status(500).json({ success: false });
	}
	res.send(customerList);
});

router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);
	if (!customer) {
		res.status(500).json({ success: false });
	}
	res.send(customer);
});

router.post('/', async (req, res) => {
	let customer = new Customer({
		name: req.body.name,
		taxNumber: req.body.taxNumber,
		address1: req.body.address1,
		address2: req.body.address2,
		zip: req.body.zip,
		email: req.body.email,
		phone: req.body.phone,
		city: req.body.city,
	});
	customer = await customer.save();

	if (!customer) return res.status(400).send('The customer cannot be created.');
	res.send(customer);
});

router.put('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			taxNumber: req.body.taxNumber,
			address1: req.body.address1,
			address2: req.body.address2,
			zip: req.body.zip,
			email: req.body.email,
			phone: req.body.phone,
			city: req.body.city,
		},
		{
			new: true,
		}
	);
	if (!customer) return res.status(400).send('This customer cannot be updated.');

	res.send(customer);
});

router.delete('/:id', (req, res) => {
	Customer.findByIdAndRemove(req.params.id)
		.then(customer => {
			if (customer) {
				return res.status(200).json({ succes: true, message: 'The customer is deleted!' });
			} else {
				return res.status(400).json({ success: false, message: 'Customer not found' });
			}
		})
		.catch(err => {
			return res.status(400).json({ status: false, error: err });
		});
});
module.exports = router;
