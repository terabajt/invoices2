const express = require('express');
const { Invoice } = require('../models/invoice');
const { EntryItem } = require('../models/entry-item');
const { User } = require('../models/user');

const router = express.Router();

//localhost:3000/api/v1/invoices

router.get('/', async (req, res) => {
	const invoiceList = await Invoice.find()
		.populate('entryItem', 'user')
		.populate({ path: 'entryItem' })
		.sort({ invoiceDate: -1 });
	if (!invoiceList) {
		res.status(500).json({ success: false });
	}
	res.send(invoiceList);
});

router.get('/:id', async (req, res) => {
	const invoice = await Invoice.findById(req.params.id).populate('user', 'entryItem', 'customer');
	if (!invoice) {
		res.status(500).json({ success: false });
	}
	res.send(invoice);
});

router.post('/', async (req, res) => {
	try {
		// Creating new EntryItems i feedback it's ids
		const entryItemsIds = await Promise.all(
			req.body.entryItem.map(async entryItem => {
				let newEntryItem = new EntryItem({
					name: entryItem.name,
					quantity: entryItem.quantity,
					tax: entryItem.tax,
					netAmount: entryItem.netAmount,
					gross: entryItem.gross,
				});
				newEntryItem = await newEntryItem.save();
				return newEntryItem._id;
			})
		);

		// Creating a new invoice
		let invoice = new Invoice({
			invoiceNumber: req.body.invoiceNumber,
			invoiceDate: req.body.invoiceDate,
			dueDate: req.body.dueDate,
			customer: req.body.customer,
			entryItem: entryItemsIds,
			user: req.body.user,
			netAmountSum: req.body.netAmountSum,
			grossSum: req.body.grossSum,
		});

		invoice = await invoice.save();

		if (!invoice) return res.status(400).send('The invoice cannot be created');

		// add new incovice to  'invoices' of User
		const newInvoiceId = invoice._id;
		const userId = req.body.user;
		const user = await User.findById(userId);
		if (user) {
			user.invoices.push(newInvoiceId);
			await user.save();
		}

		res.send(invoice);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
});

module.exports = router;
