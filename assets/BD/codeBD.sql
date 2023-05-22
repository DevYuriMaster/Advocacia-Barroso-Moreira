CREATE DATABASE ABS_ADVOCACIA; 

USE ABS_ADVOCACIA;

CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    senha VARCHAR(50),
    telefone VARCHAR(20),
    nome VARCHAR(100),
    CPF VARCHAR(11)
);


CREATE TABLE login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    senha  VARCHAR(50),
    CPF  VARCHAR(11)
);


CREATE TABLE newsletter(
    id  INT PRIMARY KEY AUTO_INCREMENT,
    email  VARCHAR(50)
);

CREATE TABLE consultoria(
    id INT PRIMARY KEY AUTO_INCREMENT,
    pergunta VARCHAR(500),
    respostas VARCHAR(500) 
);

/*inserir*/

INSERT INTO clientes (senha, telefone, nome, CPF)
VALUES ('password321', '61999223243', 'Túlio da Figueira', '00200344402');

INSERT INTO login (senha, CPF)
VALUES ('password321', '00200344402');

INSERT INTO newsletter (email)
VALUES ('tuliofigueira@gamail.com');

INSERT INTO consultoria (pergunta, respostas)
VALUES ('Preciso de advogado, para quem ligar?', 'É melhor ligar para o Saul');



