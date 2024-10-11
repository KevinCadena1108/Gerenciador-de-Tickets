import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import SnackbarMensagem from '../../components/SnackbarMensagem';

const cookies = new Cookies();

function Login() {
  const navigate = useNavigate();

  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');

  const [isErroSnackbar, setIsErroSnackbar] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState('');
  const [isSnackbarAberto, setIsSnackbarAberto] = useState(false);

  const mostrarMensagemSnackbar = (mensagem, erro) => {
    setIsErroSnackbar(erro);
    setMensagemSnackbar(mensagem);
    setIsSnackbarAberto(true);
  };

  const limparCampos = () => {
    setCpf('');
    setSenha('');
  };

  const entrar = async () => {
    try {
      const res = await axios.post('http://localhost:3001/auth/signin', { cpf, senha });
      const token = res.data.token;
      limparCampos();

      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      cookies.set('administrador', res.data.administrador);

      navigate('/dashboard');
    } catch (error) {
      mostrarMensagemSnackbar(error.response.data.message, true);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: { xs: 4, sm: 8 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography my={4} variant="h2" fontWeight="bold" textAlign="center">
          Gerenciador de Tickets
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Box sx={{ mt: 1, px: 4 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            variant="standard"
            autoComplete="identificador"
            autoFocus
            value={cpf}
            onChange={(v) => setCpf(v.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            variant="standard"
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(v) => setSenha(v.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => entrar()}>
            Entrar
          </Button>
        </Box>
      </Box>
      <SnackbarMensagem
        isErro={isErroSnackbar}
        setIsAberto={setIsSnackbarAberto}
        isAberto={isSnackbarAberto}
        mensagem={mensagemSnackbar}
      />
    </Container>
  );
}

export default Login;
