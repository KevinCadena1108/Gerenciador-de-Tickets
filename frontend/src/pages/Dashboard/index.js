import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import Caixa from "../../components/Caixa";

function Dashboard() {
  return (
    <Box>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5"> Dashboard </Typography>
      </Box>
      <Box sx={{ marginTop: "-150px" }}> 
        <Caixa>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Link to="/pesqcli">
              <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
                Pesquisar Cliente
              </Button>
            </Link>
            <Link to="/cadaluno">
              <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
                Cadastrar Aluno
              </Button>
            </Link>
            <Button variant="contained" color="secondary" sx={{ marginBottom: 2 }}>
              Reconhecimento Facial
            </Button>
            <Link to="/compti">
              <Button variant="contained" color="default">
                Comprar Tickets
              </Button>
            </Link>
          </Box>
        </Caixa>
      </Box>
    </Box>
  );
}

export default Dashboard;