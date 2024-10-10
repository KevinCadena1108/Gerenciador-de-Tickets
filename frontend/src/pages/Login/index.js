import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form"; // Importe useForm
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


function Login() {
  const { register, handleSubmit } = useForm(); // Inicialize useForm
  const navigate = useNavigate();

  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");

const limparCampos = () => {
  setCpf("");
  setSenha("");
};

const Logar = async (data) => {
  try {
    // Enviar os dados ao backend
    await axios.post("http://localhost:3001/auth/signin", {
      cpf: data.identificador,
      senha: data.senha,
    });
    console.log(data);
    limparCampos();
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const onSubmit = (data) => {
  Logar(data);
};


  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: { xs: 4, sm: 8 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography my={4} variant="h2" fontWeight="bold" textAlign="center">
          Gerenciador de Tickets
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 1, px: 4 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Identificador"
            variant="standard"
            autoComplete="identificador"
            autoFocus
            {...register("identificador", {
              required: "Esse campo é obrigatório",
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            variant="standard"
            type="password"
            autoComplete="current-password"
            {...register("senha", {
              required: "Esse campo é obrigatório",
              minLength: 4,
            })}
          />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logar
            </Button>
          
        </Box>
      </Box>
    </Container>
  );
}

export default Login;