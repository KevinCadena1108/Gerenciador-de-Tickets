import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Caixa from '../../components/Caixa';
import AdicionarSaldo from '../../components/AdicionarSaldo';
import { useAuth } from '../../components/Auth/AuthProvider';
import SaldoTotal from '../../components/SaldoTotal';
import axios from 'axios';
import SnackbarMensagem from '../../components/SnackbarMensagem';

function Dashboard() {
  const { isAdmin } = useAuth();
  const [totalSaldo, setTotalSaldo] = useState('Carregando...');
  const [mensagem, setMensagem] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const abrirMensagem = (msg, isError) => {
    setMensagem(msg);
    setIsOpen(true);
    setIsError(isError);
  };

  const atualizarSaldo = (saldoAdicionado) => {
    const saldoCarregou = /^\d+$/g.test(totalSaldo);
    if (!saldoCarregou) {
      setTotalSaldo(parseInt(saldoAdicionado));
      return;
    }

    setTotalSaldo((prev) => parseInt(prev) + parseInt(saldoAdicionado));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/saldo`)
      .then((res) => {
        setTotalSaldo(res.data.saldo);
      })
      .catch((err) => {
        console.error(err);
        setTotalSaldo('Erro');
      });
  }, []);

  const buttonStyle = {
    width: '230px',
    color: 'primary',
    marginTop: '40px',
  };

  return (
    <Box>
      <Header />

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h5"> Dashboard </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 'auto' }}>
        {isAdmin && (
          <Grid item>
            <Caixa>
              <Grid container direction="column" alignItems="center" spacing={2} sx={{ marginTop: '-50px' }}>
                <Grid item>
                  <Link to="/pesqcli">
                    <Button variant="contained" sx={buttonStyle}>
                      Pesquisar cliente
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/cadaluno">
                    <Button variant="contained" sx={buttonStyle}>
                      Cadastrar cliente
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Caixa>
          </Grid>
        )}
        <Grid item>
          <Caixa>
            <AdicionarSaldo atualizarSaldo={atualizarSaldo} abrirMensagem={abrirMensagem} />
          </Caixa>
        </Grid>

        <Grid item>
          <SaldoTotal totalSaldo={totalSaldo} />
        </Grid>
      </Grid>

      <SnackbarMensagem isAberto={isOpen} isErro={isError} mensagem={mensagem} setIsAberto={setIsOpen} />
    </Box>
  );
}

export default Dashboard;
