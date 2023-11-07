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
	const invoice = await Invoice.findById(req.params.id).populate('user', 'entryItem').populate({ path: 'entryItem' });
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

router.post('/entryitem', async (req, res) => {
	let entryItem = new EntryItem({
		name: req.body.name,
		quantity: req.body.quantity,
		tax: req.body.tax,
		netAmount: req.body.netAmount,
		gross: req.body.gross,
	});

	entryItem = await entryItem.save();

	const newEntryItemId = entryItem._id;
	const invoiceId = req.body.invoiceId;
	const result = await Invoice.updateOne({ _id: invoiceId }, { $push: { entryItem: newEntryItemId } });

	if (!result) return res.send(400).send('Cant find invoice with this number');
	if (!entryItem) return res.status(400).send('Entry item cannot be created!');

	res.send(entryItem);
});

router.delete('/entryitem/:id', async (req, res) => {
	try {
		const entryItemId = req.params.id;
		const invoice = await Invoice.findOne({ entryItem: entryItemId });
		if (!invoice) {
			return res.status(404).json({ success: false, message: 'Invoice not found for the given entry item.' });
		}
		const updatedEntryItems = invoice.entryItem.filter(item => item.toString() !== entryItemId);
		invoice.entryItem = updatedEntryItems;
		await invoice.save();
		await EntryItem.findByIdAndRemove(entryItemId);

		return res.status(200).json({ success: true, message: 'The item is deleted.' });
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});

router.put('/entryitem/:id', async (req, res) => {
	const entryItem = await EntryItem.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			quantity: req.body.quantity,
			tax: req.body.tax,
			netAmount: req.body.netAmount,
			gross: req.body.gross,
		},
		{
			new: true,
		}
	);
	if (!entryItem) return res.status(400).send('Entry item cannot be updated.');

	res.send(entryItem);
});

router.put('/:id', async (req, res) => {
	const invoice = await Invoice.findByIdAndUpdate(
		req.params.id,
		{
			invoiceNumber: req.body.invoiceNumber,
			invoiceDate: req.body.invoiceDate,
			dueDate: req.body.dueDate,
			customer: req.body.customer,
			user: req.body.user,
			netAmountSum: req.body.netAmountSum,
			grossSum: req.body.grossSum,
		},
		{
			new: true,
		}
	);
	if (!invoice) return res.status(400).send('The invoice cannot be updated');

	res.send(invoice);
});

router.delete('/:id', (req, res) => {
	Invoice.findByIdAndRemove(req.params.id)
		.then(user => {
			if (user) {
				return res.status(200).json({ success: true, message: 'The invoice is deleted.' });
			} else {
				return res.status(404).json({ success: false, message: 'Invoices not found.' });
			}
		})
		.catch(err => {
			return res.status(400).json({ success: false, error: err });
		});
});

module.exports = router;
