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
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
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
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="demo-select-small-label">
                Matrícula ativa
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Matrícula ativa"
              >
                <MenuItem value={10}>Sim</MenuItem>
                <MenuItem value={20}>Não</MenuItem>
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
          <Grid item xs sx={{ margin: "auto", marginLeft: "450px" }}>
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
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
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