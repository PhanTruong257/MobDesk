const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tech_store', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // để tắt log query trong terminal
});

module.exports = sequelize;
