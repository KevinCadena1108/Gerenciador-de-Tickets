import { Box, TextField, Grid, Button, Backdrop, CircularProgress, MenuItem } from '@mui/material';
import { FormControl, InputLabel, Select, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import SnackbarMensagem from '../../components/SnackbarMensagem';
import { Link } from 'react-router-dom';

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
  const [isAdministrador, setIsAdministrador] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      const administrador = Boolean(isAdministrador);


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
        administrador,
      });
      handleImageUpload();
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
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      abrirMensagem('Nenhuma imagem selecionada.', true);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      await axios.post('http://localhost:3001/imagem/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      //abrirMensagem('Imagem enviada com sucesso.', false);
      handleClose();
    } catch (error) {
      abrirMensagem('Erro ao enviar a imagem.', true);
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nome completo"
              variant="outlined"
              value={nome}
              onChange={(v) => setNome(v.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="CPF" variant="outlined" value={cpf} onChange={(v) => setCpf(v.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(v) => setEmail(v.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Telefone"
              variant="outlined"
              value={telefone}
              onChange={(v) => setTelefone(v.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              type="password"
              value={senha}
              onChange={(v) => setSenha(v.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Matrícula"
              variant="outlined"
              value={matricula}
              onChange={(v) => setMatricula(v.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="categoria-label">Categoria</InputLabel>
              <Select
                labelId="categoria-label"
                id="categoria"
                label="Categoria"
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
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="administrador-label">Administrador</InputLabel>
              <Select
                labelId="administrador-label"
                id="administrador"
                label="Administrador"
                value={isAdministrador}
                onChange={(v) => setIsAdministrador(v.target.value)}
              >
                <MenuItem value={true}>Sim</MenuItem>
                <MenuItem value={false}>Não</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data de nascimento"
                format="DD/MM/YYYY"
                value={rawNascimento}
                onChange={(e) => {
                  setRawNascimento(e);
                  setNascimento(e == null ? null : e.toDate());
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <Link>
              <AddAPhotoIcon
                style={{ color: 'black', fontSize: '40px', marginTop: '5px' }}
                onClick={handleDialogOpen}
              />
            </Link>
          </Grid>
        <Box sx={{marginLeft: "auto", marginTop: "auto", marginBottom:"auto"}}>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={cadastroCli} >
              Cadastrar
            </Button>
          </Grid>
          </Box>
        </Grid>
      </Box>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Upload da Imagem para o Reconhecimento Facial</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="image"
            type="file"
            fullWidth
            variant="standard"
            inputProps={{ accept: 'image/png' }}
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CadAluno;
