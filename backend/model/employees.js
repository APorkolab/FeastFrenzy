module.exports = (sequelize, DataTypes) => {
  const employees = sequelize.define(
    'employees', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employee_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      monthlyConsumptionValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      timestamps: false,
    });
  employees.associate = function (models) {
    employees.hasMany(models.purchases, {
      foreignKey: 'employeeId',
    });
  };

  return employees;
};
