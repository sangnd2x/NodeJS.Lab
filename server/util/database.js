const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'sAg12081995', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;