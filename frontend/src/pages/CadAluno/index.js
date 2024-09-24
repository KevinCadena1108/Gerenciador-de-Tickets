import {
  Box,
  TextField,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

function CadAluno() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nascimento, setNascimento] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const cadastrar = () => {
    if (
      !nascimento ||
      Object.prototype.toString.call(nascimento) !== "[object Date]" ||
      isNaN(nascimento.getTime())
    ) {
      // Exibir mensagem de erro de data inválida
      setError("Data de nascimento inválida.");
      return;
    }
    // Enviar a requisição para cadastrar aluno (ainda precisa ser implementada, como no TODO)
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/categoria")
      .then((response) => {
        setCategorias(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Erro ao carregar categorias.");
        console.log(error);
      });
  }, []);

  const cadastroCli = async () => {
    try {
      // Enviar os dados ao backend
      const response = await axios.post("http://localhost:3001/cliente", {
        cpf,
        email,
        nome,
        telefone,
        senha,
        matricula,
        categoria,
        nascimento: nascimento.toString(),
      });

      // Se a requisição for bem-sucedida, exibir uma mensagem de sucesso ou redirecionar
      console.log("Cliente cadastrado com sucesso:", response.data);
    } catch (error) {
      // Verificar se há uma resposta do servidor e exibir a mensagem adequada
      if (error.response) {
        console.error("Erro no servidor:", error.response.data);
        setError(`Erro ao cadastrar: ${error.response.data.message}`);
      } else {
        console.error("Erro desconhecido:", error);
        setError("Erro desconhecido ao tentar cadastrar.");
      }
    }
  };
  
  return (
    <Box>
      <Header />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5">Cadastro de Cliente</Typography>
      </Box>
      <Box sx={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome completo"
              variant="outlined"
              value={nome}
              onChange={(v) => setNome(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CPF"
              variant="outlined"
              value={cpf}
              onChange={(v) => setCpf(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(v) => setEmail(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Telefone"
              variant="outlined"
              value={telefone}
              onChange={(v) => setTelefone(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              type="password"
              value={senha}
              onChange={(v) => setSenha(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Matrícula"
              variant="outlined"
              value={matricula}
              onChange={(v) => setMatricula(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "280px" }}>
              <InputLabel id="demo-select-small-label">Categoria</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Categoria"
                defaultValue=""
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data de nascimento"
                format="DD/MM/YYYY"
                sx={{ marginLeft: "20px" }}
                onChange={(v) => setNascimento(v === null ? null : v.toDate())}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                cadastrar();
                cadastroCli();
              }}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CadAluno;
