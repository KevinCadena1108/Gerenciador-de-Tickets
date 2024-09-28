import React from 'react';
import { Alert, Snackbar } from '@mui/material';

function SnackbarMensagem({ isAberto, setIsAberto, isErro, mensagem }) {
  const fecharMensagem = (event, reason) => {
    if (reason === 'clickaway') return;

    setIsAberto(false);
  };

  return (
    <Snackbar
      open={isAberto}
      autoHideDuration={5000}
      onClose={fecharMensagem}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={fecharMensagem} severity={isErro ? 'error' : 'success'} variant="filled" sx={{ width: '100%' }}>
        {mensagem}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarMensagem;
