const sequelize = require("sequelize");
const db = require("../config/database");


const employees = db.define(
	"employees", {
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: sequelize.STRING,
			allowNull: false
		},
		employee_number: {
			type: sequelize.STRING,
			allowNull: false,
			unique: true
		}
	}, {
		timestamps: false
	});
employees.associate = function (models) {
	employees.hasMany(models.Sales, {
		foreignKey: 'employee_id'
	});
};


module.exports = employees;