const Sequelize = require('sequelize');
const connection = require('./database');

const Cadastro = connection.define('cadastro', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Cadastro.sync({force: false}).then(() => {});

module.exports = Cadastro;