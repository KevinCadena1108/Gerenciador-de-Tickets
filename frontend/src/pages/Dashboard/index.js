import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

function Dashboard() {
  return (
    <Box>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/pesqcli">
          <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Pesquisar Cliente
          </Button>
        </Link>
        <Link to="/cadaluno">
          <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Cadastrar Aluno
          </Button>
        </Link>
        <Button variant="contained" color="secondary" sx={{ marginRight: 1 }}>
          Reconhecimento Facial
        </Button>
        <Button variant="contained" color="default">
          Comprar Tickets
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;