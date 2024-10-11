INSERT INTO
  categoria (id, nome, valor)
VALUES
  (1000, 'Integral', 13.9),
  (1010, 'Estudante', 2.50),
  (5050, 'Servidor', 12.9);

INSERT INTO
  matricula (id, matricula, is_ativo, atualizado_em)
VALUES
  (1, '2211100099', true, '10-10-2024');

INSERT INTO
  cliente (
    cpf,
    nome,
    email,
    telefone,
    nascimento,
    saldo,
    senha,
    is_administrador,
    id_categoria,
    id_matricula
  )
VALUES
  (
    '01234567890',
    'Administrador',
    'adm@uffs.edu.br',
    '49988778998',
    '10-10-2000',
    1000,
    'bf7163e4c6361af7f0e197c3ce4d89130fae302e67cfd6ed92c52f0b04d75302.d8ec281c4c6d621f76d20b784d022b45dd039f8fdf1bb06d8434f7bf9fda676acfc604277538e4be',
    true,
    1000,
    1
  );