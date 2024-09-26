import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  MenuItem,
  FormControl,
  Select,
  Typography,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext"; // Importa o contexto
import dayjs from "dayjs"; // Importa dayjs

function EdiCli() {
  const { cpf: contextCpf } = useContext(ClientContext); // Usa o contexto
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias
  const [nascimento, setNascimento] = useState(null);
  const navigate = useNavigate();

  // Carregar os dados do cliente ao montar o componente
  useEffect(() => {
    if (!contextCpf) {
      navigate("/pesqcli"); // Redireciona para a página de pesquisa se o CPF não estiver definido
      return;
    }

    console.log(`Fetching data for CPF: ${contextCpf}`);
    axios
      .get(`http://localhost:3001/cliente/cpf/${contextCpf}`) // Verifique se o CPF está correto aqui
      .then((res) => {
        console.log("API Response:", res); // Verifica a resposta completa da API
        const data = res.data[0]; // Acessa o primeiro elemento do array
        console.log("Data:", data); // Verifica a estrutura de data
        console.log("Nome:", data.nome);
        setNome(data.nome);
        setCpf(data.cpf);
        setEmail(data.email);
        setTelefone(data.telefone);
        console.log(data.senha);
        setSenha(data.senha);
        setMatricula(data.matricula[0].matricula); // Acessa o primeiro elemento do array
        setCategoria(data.categoria.nome); // Acessa o nome da categoria
        setNascimento(dayjs(data.nascimento)); // Certifique-se de que o valor é uma instância válida de Dayjs
      })
      .catch((err) => {
        console.error(err);
        // TODO: Adicionar feedback de erro
      });
  }, [contextCpf, navigate]);

  // Carregar as categorias ao montar o componente
  useEffect(() => {
    axios
      .get("http://localhost:3001/categoria") // Endpoint para buscar as categorias
      .then((res) => {
        setCategorias(res.data); // Armazena as categorias no estado
      })
      .catch((err) => {
        console.error(err);
        // TODO: Adicionar feedback de erro
      });
  }, []);

  const handleSubmit = () => {
    const cliente = {
      nome,
      cpf,
      email,
      telefone,
      senha,
      matricula,
      categoria: { nome: categoria }, // Envia a categoria como um objeto com a propriedade nome
      nascimento,
    };

    axios
      .put(`http://localhost:3001/cliente/cpf/${contextCpf}`, cliente) // Rota para atualizar os dados
      .then(() => {
        // TODO: Adicionar feedback de sucesso
        console.log("Cliente atualizado com sucesso!");
      })
      .catch((err) => {
        console.error(err);
        // TODO: Adicionar feedback de erro
      });
  };

  return (
    <Box>
      <Header />
      <Grid container alignItems="center" sx={{ marginTop: "20px" }}>
        <Grid item xs>
          <Typography variant="h5" sx={{ textAlign: "center", marginLeft: "25px" }}>
            Editar Cliente
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/pesqcli">
            <ArrowBackIcon sx={{ color: "black", marginRight: "25px" }} />
          </Link>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome completo"
              variant="outlined"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CPF"
              variant="outlined"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              disabled // CPF não deve ser editável
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Telefone"
              variant="outlined"
              name="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Matrícula"
              variant="outlined"
              name="matricula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "280px" }}>
              <InputLabel id="categoria-label">Categoria</InputLabel>
              <Select
                labelId="categoria-label"
                id="categoria"
                name="categoria"
                value={categoria || ""} // Garante que o valor não seja undefined
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat.nome} value={cat.nome}>
                    {cat.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data de nascimento"
                value={nascimento}
                onChange={(newDate) => setNascimento(newDate)}
                format="DD/MM/YYYY"
                sx={{ marginLeft: "20px" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Editar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default EdiCli;