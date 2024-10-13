import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../Auth/AuthProvider';

function Header() {
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    console.log('saindo');
    auth.logOut();
    navigate('/');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gerenciador de Tickets</Typography>
          {location.pathname !== '/dashboard' && (
            <Box style={{ marginLeft: 'auto' }}>
              <Link to="/dashboard" style={{ color: 'black', textDecoration: 'none' }}>
                <HomeIcon style={{ color: 'black' }} />
              </Link>
            </Box>
          )}
          {location.pathname === '/dashboard' && (
            <Box style={{ marginLeft: 'auto' }}>
              <Button onClick={logout}>
                <LogoutIcon style={{ color: 'black' }} />
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
