import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import Header from "../../components/Header";

function CompTi() {
  return (
    <Box>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5"> Compra de tickets </Typography>
      </Box>
      <Box sx={{ marginLeft: "20px" }}>
        <TextField label="Quantidade" type="number" />
        <TextField
          sx={{ marginLeft: "20px" }}
          label="Valor Total"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "20px", marginLeft: "20px" }}
      >
        Comprar
      </Button>
    </Box>
  );
}
export default CompTi;
