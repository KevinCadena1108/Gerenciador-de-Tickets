import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Box>
      <Link to="/pesqcli">
        <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
          Pesquisar Cliente
        </Button>
      </Link>
      <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
        Cadastrar Aluno
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginRight: 1 }}>
        Reconhecimento Facial
      </Button>
      <Button variant="contained" color="default">
        Comprar Tickets
      </Button>
    </Box>
  );
}

export default Dashboard;
