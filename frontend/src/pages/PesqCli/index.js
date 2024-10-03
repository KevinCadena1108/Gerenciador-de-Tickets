import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table,  } from '@mui/material';
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import Header from '../../components/Header';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { ClientContext } from '../../context/ClientContext'; // Importa o contexto
import SnackbarMensagem from '../../components/SnackbarMensagem';

const MetodoPesquisa = {
  NOME: 10,
  CPF: 20,
  MATRICULA: 30,
};

function PesqCli() {
  const [dados, setDados] = useState([]);
  const [metodoPesquisa, setMetodoPesquisa] = useState('');
  const [dadosPesquisa, setDadosPesquisa] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const { setCpf } = useContext(ClientContext); // Usa o contexto
  const navigate = useNavigate(); // Hook para navegação

  const [isErroSnackbar, setIsErroSnackbar] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState('');
  const [isSnackbarAberto, setIsSnackbarAberto] = useState(false);



  const mostrarMensagemSnackbar = (mensagem, erro) => {
    setIsErroSnackbar(erro);
    setMensagemSnackbar(mensagem);
    setIsSnackbarAberto(true);
  };

  const pesquisar = () => {
    var url = 'http://localhost:3001/cliente/pesquisar?';

    switch (metodoPesquisa) {
      case MetodoPesquisa.NOME:
        url += `nome=${dadosPesquisa}`;
        break;
      case MetodoPesquisa.CPF:
        url += `cpf=${dadosPesquisa}`;
        break;
      case MetodoPesquisa.MATRICULA:
        url += `matricula=${dadosPesquisa}`;
        break;
      default:
        mostrarMensagemSnackbar('Método de pesquisa inválido!', true);
        return;
    }

    axios
      .get(url)
      .then((res) => setDados(res.data))
      .catch((err) => {
        mostrarMensagemSnackbar('Ocorreu um erro ao realizar a pesquisa!', true);
      });
  };

  const formatarMatricula = (matricula) => {
    return `${matricula.matricula} (${matricula.isAtivo ? 'Ativo' : 'Inativo'})`;
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/cliente')
      .then((res) => {
        setDados(res.data);
      })
      .catch((err) => {
        mostrarMensagemSnackbar('Não foi possível carregar a lista de clientes!', true);
      });
  }, []);

  const handleClickOpen = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };



  const mudarStatusMatricula = (status) => {
    if (selectedClient) {
      const matricula = selectedClient.matricula.matricula;
      axios
        .post(`http://localhost:3001/matricula/${status ? 'ativar' : 'desativar'}/${matricula}`)
        .then(() => {
          setDados(
            dados.map((client) => {
              if (client.cpf === selectedClient.cpf) {
                return {
                  ...client,
                  matricula: { ...selectedClient.matricula, isAtivo: status },
                };
              }
              return client;
            })
          );
          mostrarMensagemSnackbar(`Matricula ${status ? 'ativada' : 'desativada'} com sucesso!`, false);
          handleClose();
        })
        .catch((err) => {
          mostrarMensagemSnackbar('Houve um erro ao atualizar o status da matrícula!', true);
        });
    }
  };

  const handleEditClick = (cpf) => {
    setCpf(cpf); // Define o CPF no contexto
    navigate('/editcli'); // Navega para a página de edição
  };

  const handleClear = () => {
    window.location.reload();
  };


  return (
    <Box>
      <Header />
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h5">Pesquisar Cliente</Typography>
      </Box>
      <Box sx={{ marginTop: '20px', marginLeft: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs="auto">
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id="demo-select-small-label">Opção de pesquisa</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Opção de pesquisa"
                value={metodoPesquisa}
                onChange={(v) => setMetodoPesquisa(v.target.value)}
              >
                <MenuItem value={MetodoPesquisa.NOME}>Nome</MenuItem>
                <MenuItem value={MetodoPesquisa.CPF}>CPF</MenuItem>
                <MenuItem value={MetodoPesquisa.MATRICULA}>Matrícula</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs="auto">
            <TextField
              label="Dados da pesquisa"
              variant="outlined"
              sx={{ width: '400px' }}
              value={dadosPesquisa}
              onChange={(v) => setDadosPesquisa(v.target.value)}
            />
          </Grid>
          <Grid item xs sx={{ margin: 'auto' }}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => pesquisar()}>
              Pesquisar
            </Button>
            <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={handleClear}>
              Limpar
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 515, overflowY: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Nascimento</TableCell>
                <TableCell>Matrícula</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Saldo</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dados &&
                dados.map((row) => (
                  <TableRow key={row.cpf} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.nome}
                    </TableCell>
                    <TableCell>{row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.telefone}</TableCell>
                    <TableCell>{new Date(row.nascimento).toLocaleDateString()}</TableCell>
                    <TableCell>{formatarMatricula(row.matricula)}</TableCell>
                    <TableCell>{row.categoria.nome}</TableCell>
                    <TableCell>R${row.saldo}</TableCell>
                    <TableCell align="right">
                      <Link to="/editcli">
                        <EditIcon
                          sx={{ marginRight: 1 }}
                          style={{ color: 'black', cursor: 'pointer' }}
                          onClick={() => handleEditClick(row.cpf)}
                        />
                      </Link>
            
                      <Link>
                        {row.matricula.isAtivo ? (
                          <LockIcon
                            style={{ color: 'black', cursor: 'pointer' }}
                            onClick={() => handleClickOpen(row)}
                          />
                        ) : (
                          <LockOpenIcon
                            style={{ color: 'black', cursor: 'pointer' }}
                            onClick={() => handleClickOpen(row)}
                          />
                        )}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <SnackbarMensagem
          isErro={isErroSnackbar}
          setIsAberto={setIsSnackbarAberto}
          isAberto={isSnackbarAberto}
          mensagem={mensagemSnackbar}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedClient?.matricula.isAtivo ? 'Desativar Matrícula' : 'Ativar Matrícula'}</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja {selectedClient?.matricula.isAtivo ? 'desativar' : 'ativar'} a matrícula de{' '}
            {selectedClient?.nome}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => mudarStatusMatricula(!selectedClient?.matricula.isAtivo)} color="primary">
            {selectedClient?.matricula.isAtivo ? 'Desativar' : 'Ativar'}
          </Button>
        </DialogActions>
      </Dialog>



    </Box>
  );
}

export default PesqCli;
