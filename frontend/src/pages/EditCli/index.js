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
import Header from "../../components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

function EdiCli() {
  return (
    <Box>
      <Header />

      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5">Editar Cliente</Typography>
      </Box>
      <Box sx={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nome completo" variant="outlined" />
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
              <InputLabel id="demo-select-small-label">Categoria</InputLabel>
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
                label="Data de nascimento"
                format="DD/MM/YYYY"
                sx={{ marginLeft: "20px" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary">
              Editar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default EdiCli;
