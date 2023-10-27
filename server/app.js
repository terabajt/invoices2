const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { config } = require('dotenv');
const mongoose = require('mongoose');

require('dotenv/config');

const API = process.env.API_URL;
const PORT = process.env.PORT;

//INIT CORS
app.use(cors());
app.options('*', cors());

//JWT
const authJwt = require('./helpers/jwt');

//MIDDLEWARE CONFIG
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());

//ROUTES
// app.use(`${API}/users`, usersRoutes);

//MONGOOSE CONNECT
mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => {
		console.log('Connected to database OK');
	})
	.catch(err => {
		console.log(err);
	});

//MAIN
app.listen(PORT, () => {
	console.log(`Server is running on localhost:${PORT}`);
});