import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import Caixa from "../../components/Caixa";
import AdicionarSaldo from "../../components/AdicionarSaldo";

function Dashboard() {
  const buttonStyle = {
    width: "230px",
    color: "primary",
  };

  return (
    <Box>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5"> Dashboard </Typography>
      </Box>
      <Box sx={{ display: "flex",  marginTop: "-150px" }}>
        <Caixa sx={{ marginLeft: "30px" }}>
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
              <Button variant="contained" sx={buttonStyle}>
                Pesquisar Cliente
              </Button>
            </Link>
            <Link to="/cadaluno">
              <Button variant="contained" sx={buttonStyle}>
                Cadastrar Aluno
              </Button>
            </Link>
            <Button variant="contained" sx={buttonStyle}>
              Reconhecimento Facial
            </Button>
          </Box>
        </Caixa>
        <Caixa sx={{ marginLeft: "30px" }}>
          <AdicionarSaldo />
        </Caixa>
      </Box>
    </Box>
  );
}

export default Dashboard;