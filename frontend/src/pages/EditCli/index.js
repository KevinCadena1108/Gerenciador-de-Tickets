import React, { useEffect, useState, useContext } from 'react';
import { Box, TextField, Grid, Button, MenuItem } from '@mui/material';
import { FormControl, Select, Typography, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { ClientContext } from '../../context/ClientContext';
import dayjs from 'dayjs';
import SnackbarMensagem from '../../components/SnackbarMensagem';

function EdiCli() {
  const { cpf: contextCpf } = useContext(ClientContext);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [matricula, setMatricula] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [nascimento, setNascimento] = useState(null);
  const navigate = useNavigate();

  const [isErroSnackbar, setIsErroSnackbar] = useState(false);
  const [isSnackbarAberto, setIsSnackbarAberto] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState('');
  const [carregouDados, setCarregouDados] = useState(false);
  const [carregouCategorias, setCarregouCategorias] = useState(false);

  const abrirSnackbar = (mensagem, isErro) => {
    setIsErroSnackbar(isErro);
    setMensagemSnackbar(mensagem);
    setIsSnackbarAberto(true);
  };

  // Carregar os dados do cliente ao montar o componente
  useEffect(() => {
    if (!contextCpf) {
      // Redireciona para a página de pesquisa se o CPF não estiver definido
      navigate('/pesqcli');
      return;
    }

    axios
      .get(`http://localhost:3001/cliente/${contextCpf}`) // Verifique se o CPF está correto aqui
      .then((res) => {
        const { data } = res;

        setNome(data.nome);
        setCpf(data.cpf);
        setEmail(data.email);
        setTelefone(data.telefone);
        setMatricula(data.matricula.matricula); // Acessa o primeiro elemento do array
        setCategoria(data.categoria.id); // Acessa o nome da categoria
        setNascimento(dayjs(data.nascimento)); // Certifique-se de que o valor é uma instância válida de Dayjs
        setCarregouDados(true);
      })
      .catch(() => {
        abrirSnackbar('Não foi possível carregar os dados deste cliente!', true);
      });
  }, [contextCpf, navigate]);

  // Carregar as categorias ao montar o componente
  useEffect(() => {
    axios
      .get('http://localhost:3001/categoria') // Endpoint para buscar as categorias
      .then((res) => {
        setCategorias(res.data);
        setCarregouCategorias(true);
      })
      .catch(() => {
        abrirSnackbar('Não foi possível carregar as categorias!', true);
      });
  }, []);

  const handleSubmit = () => {
    const cliente = {
      nome,
      email,
      telefone,
      senha: senha === '' ? undefined : senha,
      numeroMatricula: matricula,
      idCategoria: categoria,
      //nascimento,
    };

    axios
      .put(`http://localhost:3001/cliente/${contextCpf}`, cliente) // Rota para atualizar os dados
      .then(() => {
        abrirSnackbar('Informações do cliente editadas com sucesso!', false);
      })
      .catch(() => {
        abrirSnackbar('Ocorreu um erro ao editar as informações do cliente!', true);
      });
  };

  return (
    <Box>
      <Header />
      <Grid container alignItems="center" sx={{ marginTop: '20px' }}>
        <Grid item xs>
          <Typography variant="h5" sx={{ textAlign: 'center', marginLeft: '25px' }}>
            Editar Cliente
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/pesqcli">
            <ArrowBackIcon sx={{ color: 'black', marginRight: '25px' }} />
          </Link>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome completo"
              variant="outlined"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="CPF" variant="outlined" name="cpf" value={cpf} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Telefone"
              variant="outlined"
              name="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Matrícula"
              variant="outlined"
              name="matricula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '280px' }}>
              <InputLabel id="categoria-label">Categoria</InputLabel>
              <Select
                labelId="categoria-label"
                id="categoria"
                name="categoria"
                value={categoria || ''}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat.nome} value={cat.id}>
                    {cat.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data de nascimento"
                value={nascimento}
                onChange={(newDate) => setNascimento(newDate)}
                disabled
                format="DD/MM/YYYY"
                sx={{ marginLeft: '20px' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Editar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <SnackbarMensagem
          isErro={isErroSnackbar}
          setIsAberto={setIsSnackbarAberto}
          isAberto={isSnackbarAberto}
          mensagem={mensagemSnackbar}
        />
      </Box>
    </Box>
  );
}

export default EdiCli;
