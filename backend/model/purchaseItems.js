module.exports = (sequelize, DataTypes) => {
  const purchaseItems = sequelize.define(
    'purchaseItems', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      timestamps: false,
    });

  purchaseItems.associate = (models) => {
    purchaseItems.belongsTo(models.purchases, {
      foreignKey: 'purchaseId',
      onDelete: 'CASCADE',
    });
    purchaseItems.belongsTo(models.products, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
  };

  return purchaseItems;
};
