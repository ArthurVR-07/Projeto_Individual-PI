-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE akame_ga_kill;
USE akame_ga_kill;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
user_name VARCHAR(50),
email VARCHAR(50) UNIQUE,
senha VARCHAR(50)
);

CREATE TABLE tentativa(
id INT PRIMARY KEY AUTO_INCREMENT,
certas INT,
erradas INT,
data_horario DATETIME DEFAULT NOW(),
id_usuario INT,
CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE questao(
num_questao INT PRIMARY KEY,
descricao VARCHAR(200)
);

CREATE TABLE tentativa_questao(
tentativa_id INT,
questao_id INT,
PRIMARY KEY(tentativa_id, questao_id),
resultado TINYINT,
CONSTRAINT fk_tentativa FOREIGN KEY (tentativa_id) REFERENCES tentativa(id),
CONSTRAINT fk_questao FOREIGN KEY (questao_id) REFERENCES questao(num_questao)
);

INSERT INTO questao (num_questao, descricao) VALUES
(1, 'Objetivo inicial de Tatsumi'),
(2, 'Arma imperial da Akame'),
(3, 'Habilidade da Murasame'),
(4, 'Líder dos Jaegers'),
(5, 'Participação do Bulat'),
(6, 'Relação de Akame e Kurome'),
(7, 'Destino da Mine'),
(8, 'Papel do Primeiro-Ministro Honest'),
(9, 'Quem venceu');