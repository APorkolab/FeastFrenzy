const express = require('express');
const morgan = require('morgan');
const httpErrors = require('http-errors');
const config = require('config');
const bodyParser = require('body-parser');
const sequelize = require("sequelize");
const cors = require('cors');
const logger = require('./logger/logger');
const employees = require('./model/employees');
const products = require('./model/products');
const purchaseItems = require('./model/purchaseItems');
const purchases = require('./model/purchases');
const sales = require('./model/sales');
// const user = require('./model/user');
require("dotenv").config();
const app = express();

const sql = new sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD, {
		dialect: "mysql",
		host: process.env.DB_HOST,
		port: 3306,
	}
);

sql.authenticate().then(() => {
		console.log('Connection has been established successfully.');
	}).catch((error) => {
		console.error('Unable to connect to the database: ', error);
	})
	// .then(() => {
	// 	user.sync();
	// })
	.then(() => {
		employees.sync();
	}).then(() => {
		products.sync();
	}).then(() => {
		purchaseItems.sync();
	}).then(() => {
		purchases.sync();
	}).then(() => {
		sales.sync();
	}).then(
		// require('./seed/seeder'), // Seed the database, ONLY ONCE MUST RUN
		// logger.info('Data has been seeded into the database.'),
	).catch(err => logger.error(err));


//Cross Origin Resource Sharing
app.use(cors());
app.use(morgan('combined', {
	stream: logger.stream
}));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));
app.use(bodyParser.json());


// const authencticateJwt = require('./model/auth/authenticate');


// app.use('/user', authencticateJwt, require('./controller/user/router'));
app.use('/employees', require('./controller/employee/router'));
app.use('/products', require('./controller/product/router'));
app.use('/purchases', require('./controller/purchase/router'));
app.use('/purchase-items', require('./controller/purchase-item/router'));
// app.use('/login', require('./controller/login/router'));

app.use('/', (req, res, next) => {
	console.log(req.url);
	res.send('The backend is working!');
});

app.use((err, req, res, next) => {
	res.status = 500;
	res.json({
		hasError: true,
		message: err.message,
	});
});

module.exports = app;