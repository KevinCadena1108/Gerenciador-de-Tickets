INSERT INTO
  categoria (id, nome, valor)
VALUES
  (1010, 'Estudante', 2.50),
  (5050, 'Servidor', 12.9);

INSERT INTO
  cliente (
    id,
    nome,
    cpf,
    email,
    telefone,
    nascimento,
    saldo,
    id_categoria,
    senha
  )
VALUES
  (
    1,
    'Lucas',
    '12345678901',
    'lucas.belini@estudante.uffs.edu.br',
    '49999009900',
    '1999-01-01',
    100.00,
    1010,
    'eb1679d4a4a99961a5278efaca76c533cfd75621ecc74bddd45dfd52903e516c.e08eb2b1d197f000177f7c9565ea5f15562026c5e7de552a573ce6460a4f56936b9ceb02a47b40a8'
  );

INSERT INTO
  matricula (matricula, is_ativo, id_cliente, atualizado_em)
values
  ('2211100027', true, 1, '2024-01-01 00:00:00');