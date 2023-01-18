const sequelize = require("sequelize");
const db = require("../config/database");

const purchase = db.define(
	"purchase", {
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		date: {
			type: sequelize.DATE,
			allowNull: false
		},
		closed: {
			type: sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		purchaseItems: {
			type: sequelize.ARRAY(sequelize.JSON),
			allowNull: true
		},
		employeeId: {
			type: sequelize.INTEGER,
			allowNull: false
		},
		total: {
			type: sequelize.DECIMAL(10, 2),
			allowNull: true
		}
	}, {
		timestamps: false
	});
purchase.associate = function (models) {
	purchase.hasMany(models.purchase_items, {
		foreignKey: 'purchase_id',
		as: 'purchaseItems',
	});
	purchase.belongsTo(models.employees, {
		foreignKey: 'employeeId',
		as: 'employee',
	});
};

module.exports = purchase;