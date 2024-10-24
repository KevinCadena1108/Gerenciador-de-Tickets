CREATE TABLE
  categoria (
    id INT PRIMARY KEY, -- Não é SERIAL, controle manual do ID
    nome varchar(64) NOT NULL UNIQUE,
    valor DECIMAL(10, 2) NOT NULL
  );

CREATE TABLE
  matricula (
    id SERIAL PRIMARY KEY,
    matricula CHAR(10) UNIQUE,
    is_ativo BOOLEAN NOT NULL DEFAULT TRUE,
    atualizado_em TIMESTAMP NOT NULL
  );

CREATE TABLE
  cliente (
    id SERIAL PRIMARY KEY,
    cpf CHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(128) NOT NULL,
    email VARCHAR(320) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    nascimento DATE NOT NULL,
    saldo DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    senha VARCHAR(145) NOT NULL,
    imagem TEXT DEFAULT NULL,
    is_administrador BOOLEAN NOT NULL DEFAULT FALSE,
    id_categoria INT NOT NULL REFERENCES categoria (id),
    id_matricula INT NOT NULL REFERENCES matricula (id)
  );