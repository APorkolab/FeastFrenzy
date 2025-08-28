module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define(
        "products", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            }
        }, {
            timestamps: false
        });

    products.associate = function (models) {
        products.hasMany(models.purchaseItems, {
            foreignKey: 'productId'
        });
    };

    return products;
};