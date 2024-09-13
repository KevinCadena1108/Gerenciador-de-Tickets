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
import { Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm(); // Inicialize useForm

  const onSubmit = (data) => {
    console.log(data);
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
          <Link to="/dashboard">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logar
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
