const db = require("../config/database");
const sequelize = require("sequelize");

const sales = db.define("sales", {
	id: {
		type: sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	employee_id: {
		type: sequelize.INTEGER,
		allowNull: false,
		references: {
			model: "employees",
			key: "id"
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
}, {});

sales.associate = function (models) {
	sales.belongsTo(models.Employees, {
		foreignKey: "employee_id"
	});
	sales.hasMany(models.PurchaseItems, {
		foreignKey: "sale_id"
	});
};

module.exports = sales;