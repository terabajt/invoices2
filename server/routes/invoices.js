const express = require('express');
const { Invoice } = require('../models/invoice');

const router = express.Router();

//localhost:3000/api/v1/invoices

router.get('/', async (req, res) => {
	const invoiceList = await Invoice.find().populate('entryItem', 'user').sort({ invoiceDate: -1 });
	if (!userList) {
		res.status(500).json({ success: false });
	}
	res.send(userList);
});

router.get('/:id', async (req, res) => {
	const invoice = await Invoice.findById(req.params.id).populate('user', 'entryItem', 'customer');
	if (!invoice) {
		res.status(500).json({ success: false });
	}
	res.send(invoice);
});

router.post('/', async (req, res) => {
	let invoice = new Invoice({
		invoiceNumber: req.body.invoiceNumber,
		invoiceDate: req.body.invoiceDate,
		dueDate: req.body.dueDate,
		customer: req.body.customer,
		entryItem: req.body.entryItem, //TODO
		user: req.body.user,
	});
});

module.exports = router;
