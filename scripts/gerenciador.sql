create database gerenciador;
\c gerenciador
set datestyle to 'ISO,DMY';
set client_encoding to 'UTF8';

CREATE TABLE cliente (
    cpf CHAR(11) NOT NULL,  -- Chave primária
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    tel VARCHAR(15) NOT NULL,
    dataNasc DATE NOT NULL,
    especializacao_id INT NOT NULL,
    qtdtic INT,
    senha VARCHAR(255) NOT NULL,  -- Armazenar a senha gerada (hash da senha recomendável)
    CONSTRAINT pk_cliente PRIMARY KEY (cpf),
    CONSTRAINT uk_email_cliente UNIQUE (email),
    CONSTRAINT fk_cliente_especializacao FOREIGN KEY (especializacao_id) REFERENCES especializacao (id)
);

CREATE TABLE especializacao (
    id INT NOT NULL,  -- Não é SERIAL, controle manual do ID
    tipo VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    CONSTRAINT pk_especializacao PRIMARY KEY (id),
    CONSTRAINT uk_tipo_especializacao UNIQUE (tipo)
);

CREATE TABLE matricula (
    matricula INT NOT NULL,  -- Chave primária
    dataAtiva DATE NOT NULL,
    cpf VARCHAR(11) NOT NULL,  -- Chave estrangeira referenciando a tabela cliente
    CONSTRAINT pk_matricula PRIMARY KEY (matricula),
    CONSTRAINT fk_matricula_cliente FOREIGN KEY (cpf) REFERENCES cliente(cpf)
);