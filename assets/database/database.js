const Sequelize = require('sequelize');
const connection = new Sequelize('abs', 'root', 'Master71190407*', {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = connection;
