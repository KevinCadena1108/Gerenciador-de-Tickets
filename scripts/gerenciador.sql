create database gerenciador;
\c gerenciador
set datestyle to 'ISO,DMY';
set client_encoding to 'UTF8';

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    cpf CHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(128) NOT NULL,
    email VARCHAR(320) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    nascimento DATE NOT NULL,
    saldo DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    senha VARCHAR(145) NOT NULL
);

CREATE TABLE categoria (
    id INT PRIMARY KEY,  -- Não é SERIAL, controle manual do ID
    nome varchar(64) NOT NULL UNIQUE,
    valor DECIMAL(10, 2) NOT NULL    
);

CREATE TABLE matricula (
    id SERIAL PRIMARY KEY,
    matricula CHAR(11) UNIQUE,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    atualizado_em TIMESTAMP NOT NULL,
    id_cliente INT NOT NULL REFERENCES cliente(id)
);

CREATE TABLE cliente_categoria (
    id SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL REFERENCES cliente(id),
    id_categoria INT NOT NULL REFERENCES categoria(id),
    atribuido_em TIMESTAMP NOT NULL,
    UNIQUE (id_cliente, id_categoria)
);