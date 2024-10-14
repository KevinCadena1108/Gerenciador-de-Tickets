import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Caixa from "../../components/Caixa";
import AdicionarSaldo from "../../components/AdicionarSaldo";
import { useAuth } from "../../components/Auth/AuthProvider";

function Dashboard() {
  const { isAdmin } = useAuth();

  const buttonStyle = {
    width: "230px",
    color: "primary",
    marginTop: "70px",
  };

  return (
    <Box>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5"> Dashboard </Typography>
      </Box>
      <Box sx={{ display: "flex", marginTop: "-150px" }}>
        {isAdmin && (
          <Caixa sx={{ marginLeft: "30px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
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
                  Cadastrar Cliente
                </Button>
              </Link>
            </Box>
          </Caixa>
        )}

        <Caixa sx={{ marginLeft: "30px" }}>
          <AdicionarSaldo />
        </Caixa>
      </Box>
    </Box>
  );
}

export default Dashboard;
