import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const location = useLocation();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gerenciador de Tickets</Typography>
          {location.pathname !== "/dashboard" && (
            <Box style={{ marginLeft: "auto" }}>
              <Link
                to="/dashboard"
                style={{ color: "black", textDecoration: "none" }}
              >
                <HomeIcon style={{ color: "black" }} />
              </Link>
            </Box>
          )}
          {location.pathname === "/dashboard" && (
            <Box style={{ marginLeft: "auto" }}>
              <Link to="/" 
              style={{ color: "black", textDecoration: "none" }}
              >
                <LogoutIcon style={{ color: "black" }} />
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;