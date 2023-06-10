const Sequelize = require('sequelize');
const connection = require('./database');

const Newsletter = connection.define('newsletter', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Newsletter.sync({force: false}).then(() => {});

module.exports = Newsletter;