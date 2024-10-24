import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function AdicionarSaldo({ width = 180, height = 100, sx = {}, totalSaldo }) {
  return (
    <div>
      <Box
        sx={{
          width,
          height,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          boxShadow: 3,
          ...sx,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          Saldo total:
          <span>R$ {totalSaldo}</span>
        </Typography>
      </Box>
    </div>
  );
}

export default AdicionarSaldo;
