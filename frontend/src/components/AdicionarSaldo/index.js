import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

function AdicionarSaldo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5" color="black">
          Adicionar Saldo
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          label="Quantidade"
          type="number"
          sx={{ marginBottom: "20px", width: "250px" }}
        />
        <TextField
          label="Valor Total"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
          sx={{ width: "250px" }}
        />
      </Box>
      <Button variant="contained" color="primary" sx={{ marginTop: "20px" }}>
        Comprar
      </Button>
    </Box>
  );
}

export default AdicionarSaldo;