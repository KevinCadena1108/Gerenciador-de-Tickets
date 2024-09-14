import { Box, TextField, Grid } from "@mui/material";
import Header from "../../components/Header";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

function CadAluno() {
  return (
    <Box>
      <Header />
      <Box sx={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nome" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="CPF" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Telefone" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data de Nascimento"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CadAluno;
