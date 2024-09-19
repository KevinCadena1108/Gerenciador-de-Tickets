import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";

function createData(
  nome,
  cpf,
  email,
  telefone,
  nascimento,
  matricula,
  categoria,
  saldo
) {
  return {
    nome,
    cpf,
    email,
    telefone,
    nascimento,
    matricula,
    categoria,
    saldo,
  };
}

const rows = [
  createData(
    "João Silva",
    "123.456.789-00",
    "joao@example.com",
    "(11) 98765-4321",
    "01/01/1990",
    "12345",
    "A",
    100.5
  ),
  createData(
    "Maria Souza",
    "987.654.321-00",
    "maria@example.com",
    "(21) 98765-4321",
    "02/02/1985",
    "67890",
    "B",
    200.75
  ),
  // Adicione mais dados conforme necessário
];

function PesqCli() {
  return (
    <Box>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5"> Pesquisar Cliente </Typography>
      </Box>
      <Box sx={{ marginTop: "20px", marginLeft: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs="auto">
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="demo-select-small-label">
                Opção de pesquisa
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Opção de pesquisa"
              >
                <MenuItem value={10}>Nome</MenuItem>
                <MenuItem value={20}>CPF</MenuItem>
                <MenuItem value={30}>Matrícula</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs="auto">
            <TextField
              label="Dados da pesquisa"
              variant="outlined"
              sx={{ width: "400px" }}
            />
          </Grid>
          <Grid item xs sx={{ margin: "auto"}}>
            <Button variant="contained" color="primary">
              Pesquisar
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Nascimento</TableCell>
                <TableCell>Matrícula</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Saldo</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.nome}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nome}
                  </TableCell>
                  <TableCell>{row.cpf}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.telefone}</TableCell>
                  <TableCell>{row.nascimento}</TableCell>
                  <TableCell>{row.matricula}</TableCell>
                  <TableCell>{row.categoria}</TableCell>
                  <TableCell>{row.saldo}</TableCell>
                  <TableCell align="right">
                    <EditIcon sx={{ marginRight: 1 }} />
                    <LockIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default PesqCli;
