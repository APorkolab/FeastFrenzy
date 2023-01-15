const sequelize = require("sequelize");
const db = require("../config/database");


const purchaseItems = db.define(
	"purchaseItems", {
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		purchase_id: {
			type: sequelize.INTEGER,
			allowNull: false
		},
		product_id: {
			type: sequelize.INTEGER,
			allowNull: false
		},
		quantity: {
			type: sequelize.INTEGER,
			allowNull: false
		}
	}, {});

purchaseItems.associate = (models) => {
	purchaseItems.belongsTo(models.Sales, {
		foreignKey: 'purchase_id',
		onDelete: 'CASCADE',
	});
	purchaseItems.belongsTo(models.Products, {
		foreignKey: 'product_id',
		onDelete: 'CASCADE',
	});
};

module.exports = purchaseItems;