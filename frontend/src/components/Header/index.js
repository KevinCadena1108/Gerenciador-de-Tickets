import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gerenciador de Tickets</Typography>
          {location.pathname !== "/dashboard" && (
            <Link to="/dashboard" style={{ marginLeft: "auto" }}>
              <IconButton color="black">
                <HomeIcon />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
