import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Header from "../../components/Header";

function PesqCli() {
  return (
    <Box>
      <Header />

      <Box sx={{ marginTop: "20px", marginLeft: "20px" }}>
        <FormControl sx={{ width: "200px" }} size="small">
          <InputLabel id="demo-select-small-label">
            Opção de pesquisa
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Opção de pesquisa<"
          >
            <MenuItem value={10}>Nome</MenuItem>
            <MenuItem value={20}>CPF</MenuItem>
            <MenuItem value={30}>Matrícula</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: "200px", marginLeft: "20px" }} size="small">
          <InputLabel id="demo-select-small-label">Matrícula ativa</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Matrícula ativa<"
          >
            <MenuItem value={10}>Sim</MenuItem>
            <MenuItem value={20}>Não</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default PesqCli;
