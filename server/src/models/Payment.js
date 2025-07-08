const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    method: {
        type: DataTypes.ENUM('COD', 'VNPAY', 'MOMO'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('success', 'failed'),
        defaultValue: 'success'
    },
    paid_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'payments',
    timestamps: false
});

module.exports = Payment;
