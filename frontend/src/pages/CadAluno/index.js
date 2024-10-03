import { Box, TextField, Grid, Button, Backdrop, CircularProgress, MenuItem } from '@mui/material';
import { FormControl, InputLabel, Select, Typography } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import SnackbarMensagem from '../../components/SnackbarMensagem';

function CadAluno() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [matricula, setMatricula] = useState('');
  const [categoria, setCategoria] = useState('');
  const [rawNascimento, setRawNascimento] = useState(null);
  const [nascimento, setNascimento] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const abrirMensagem = (msg, isError) => {
    console.log('abrind omensagem');
    setMensagem(msg);
    setIsOpen(true);
    setIsError(isError);
  };

  const limparCampos = () => {
    setCategoria('');
    setNome('');
    setCpf('');
    setEmail('');
    setTelefone('');
    setSenha('');
    setMatricula('');
    setNascimento(null);
    setRawNascimento(null);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/categoria')
      .then((response) => {
        setCategorias(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        abrirMensagem('Erro ao carregar categorias.', true);
      });
  }, []);

  const checkData = () => {
    return !nascimento || Object.prototype.toString.call(nascimento) !== '[object Date]' || isNaN(nascimento.getTime());
  };

  const cadastroCli = async () => {
    try {
      if (checkData()) {
        abrirMensagem('Data de nascimento inválida.', true);
        return;
      }

      // Enviar os dados ao backend
      await axios.post('http://localhost:3001/cliente', {
        cpf,
        email,
        nome,
        telefone,
        senha,
        numeroMatricula: matricula,
        idCategoria: categoria,
        nascimento: nascimento.toISOString(),
      });

      limparCampos();
      abrirMensagem('Cliente cadastrado com sucesso.', false);
    } catch (error) {
      if (error.response) {
        abrirMensagem(`Erro ao cadastrar: ${error.response.data.message[0]}`, true);
      } else {
        abrirMensagem('Erro desconhecido ao tentar cadastrar.', true);
      }
    }
  };

  return (
    <Box>
      <Header />
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h5">Cadastro de Cliente</Typography>
      </Box>
      <Box>
        <SnackbarMensagem isAberto={isOpen} setIsAberto={setIsOpen} isErro={isError} mensagem={mensagem} />
      </Box>
      <Box sx={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome completo"
              variant="outlined"
              value={nome}
              onChange={(v) => setNome(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="CPF" variant="outlined" value={cpf} onChange={(v) => setCpf(v.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(v) => setEmail(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Telefone"
              variant="outlined"
              value={telefone}
              onChange={(v) => setTelefone(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              type="password"
              value={senha}
              onChange={(v) => setSenha(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Matrícula"
              variant="outlined"
              value={matricula}
              onChange={(v) => setMatricula(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '220px' }}>
              <InputLabel id="demo-select-small-label">Categoria</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Categoria"
                defaultValue=""
                value={categoria}
                onChange={(v) => setCategoria(v.target.value)}
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          <FormControl sx={{ width: '220px', marginLeft:"20px" }}>
            <InputLabel id="demo-select-small-label">Administrador</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Administrador"
            >
              <MenuItem value="sim">Sim</MenuItem>
              <MenuItem value="nao">Não</MenuItem>
            </Select>
          </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data de nascimento"
                format="DD/MM/YYYY"
                value={rawNascimento}
                sx={{ marginLeft: '20px' }}
                onChange={(e) => {
                  setRawNascimento(e);
                  setNascimento(e == null ? null : e.toDate());
                }}
              />
            </LocalizationProvider>

          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                cadastroCli();
              }}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CadAluno;
