import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Caixa from "../../components/Caixa";
import AdicionarSaldo from "../../components/AdicionarSaldo";
import { useAuth } from "../../components/Auth/AuthProvider";
import SaldoTotal from "../../components/SaldoTotal";

function Dashboard() {
  const { isAdmin } = useAuth();

  const buttonStyle = {
    width: "230px",
    color: "primary",
    marginTop: "40px",
  };

  return (
    <Box>
      <Header />

      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5"> Dashboard </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginTop: "auto" }}
      >
        {isAdmin && (
          <Grid item>
            <Caixa>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{ marginTop: "-50px" }}
              >
                <Grid item>
                  <Link to="/pesqcli">
                    <Button variant="contained" sx={buttonStyle}>
                      Pesquisar Cliente
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/cadaluno">
                    <Button variant="contained" sx={buttonStyle}>
                      Cadastrar Cliente
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Caixa>
          </Grid>
        )}
        <Grid item>
          <Caixa>
            <AdicionarSaldo />
          </Caixa>
        </Grid>

        <Grid item>
            <SaldoTotal />
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default Dashboard;
