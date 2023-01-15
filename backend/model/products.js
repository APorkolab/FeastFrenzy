const sequelize = require("sequelize");
const db = require("../config/database");


const products = db.define(
	"products", {
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: sequelize.STRING,
			allowNull: false,
			unique: true
		},
		price: {
			type: sequelize.DECIMAL(10, 2),
			allowNull: false
		}
	}, {
		timestamps: false
	});
products.associate = function (models) {
	products.hasMany(models.PurchaseItems, {
		foreignKey: 'product_id'
	});
};

module.exports = products;