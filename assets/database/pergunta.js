const Sequelize = require("sequelize");
const connection = require("./database");


//Criando a tabela no banco de dados.
const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING, 
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});


//Evitar que a tablea seja criada mais de uma vez.
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;
 