import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useAuth } from '../Auth/AuthProvider';

function AdicionarSaldo({ atualizarSaldo, abrirMensagem }) {
  const { cpf } = useAuth();
  const [saldo, setSaldo] = useState('');
  const [botaoAtivo, setBotaoAtivo] = useState(false);

  const editarValor = (valor) => {
    const saldo = valor.replace(/[^0-9]+/g, '');
    setSaldo(saldo);
  };

  const adicionarSaldo = async () => {
    if (saldo === '' || parseInt(saldo) === 0) {
      abrirMensagem('O saldo deve ser um valor positivo!', true);
      return;
    }

    setBotaoAtivo(true);
    try {
      await axios.post(`http://localhost:3001/saldo/adicionar/${cpf}`, { saldo: parseInt(saldo) });
      atualizarSaldo(saldo);
      setSaldo('');
      setBotaoAtivo(false);
      abrirMensagem('Saldo adicionado com sucesso!', false);
    } catch (error) {
      console.error(error);
      abrirMensagem('Erro ao adicionar saldo!', true);
      setBotaoAtivo(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h5" color="black">
          Adicionar saldo
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          label="Valor total"
          value={saldo}
          onChange={(v) => editarValor(v.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
        onClick={() => adicionarSaldo()}
        disabled={botaoAtivo}
      >
        Adicionar
      </Button>
    </Box>
  );
}

export default AdicionarSaldo;
