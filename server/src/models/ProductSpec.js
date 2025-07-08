const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductSpec = sequelize.define('ProductSpec', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    key: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    value: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'product_specs',
    timestamps: false
});

module.exports = ProductSpec;
