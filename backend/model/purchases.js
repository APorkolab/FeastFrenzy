const sequelize = require("sequelize");
const db = require("../config/database");


const purchase = db.define(
	"purchase", {
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		employee_id: {
			type: sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'employees',
				key: 'id'
			}
		},
		date: {
			type: sequelize.DATE,
			allowNull: false
		},
		closed: {
			type: sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		timestamps: false,
	});
purchase.associate = function (models) {
	purchase.hasMany(models.purchase_items, {
		foreignKey: 'purchase_id',
		as: 'items',
	});
	purchase.belongsTo(models.employees, {
		foreignKey: 'employee_id',
		as: 'employee',
	});
};

module.exports = purchase;