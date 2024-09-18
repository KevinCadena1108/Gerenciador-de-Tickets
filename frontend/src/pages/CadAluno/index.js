import { Box, TextField, Grid, Button } from "@mui/material";
import Header from "../../components/Header";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

function CadAluno() {
  return (
    <Box>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5"> Cadastro de Cliente </Typography>
      </Box>
      <Box sx={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nome Completo" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="CPF" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Telefone" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Matrícula" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "280px" }}>
              <InputLabel id="demo-select-small-label">Tipo </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Tipo"
              >
                <MenuItem value={10}>Aluno</MenuItem>
                <MenuItem value={20}>Servidor</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data da ativação"
                format="DD/MM/YYYY"
                sx={{ marginLeft: "20px" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary">
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CadAluno;
