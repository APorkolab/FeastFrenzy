const sequelize = require("sequelize");
const db = require("../config/database");


const purchaseItems = db.define(
	"purchaseItems", {
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		purchaseId: {
			type: sequelize.INTEGER,
			allowNull: false
		},
		productId: {
			type: sequelize.INTEGER,
			allowNull: false
		},
		productId: {
			type: sequelize.INTEGER,
			allowNull: false
		},
		quantity: {
			type: sequelize.INTEGER,
			allowNull: false
		},
		purchase: {
			type: sequelize.JSON,
			allowNull: true
		}
	}, {});

purchaseItems.associate = (models) => {
	purchaseItems.belongsTo(models.Purchase, {
		foreignKey: 'purchaseId',
		onDelete: 'CASCADE',
	});
	purchaseItems.belongsTo(models.Product, {
		foreignKey: 'productId',
		onDelete: 'CASCADE',
	});
};


module.exports = purchaseItems;