import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

function PesqCli() {
  return (
    <Box sx={{ marginTop: "20px", marginLeft: "20px" }}>
      <FormControl sx={{ width: "200px" }} size="small">
        <InputLabel id="demo-select-small-label">Opção de pesquisa</InputLabel>
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
    </Box>
  );
}

export default PesqCli;
