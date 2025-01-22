import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 0, 
              mr: 4,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
            onClick={() => navigate('/dashboard')}
          >
            Haswanth Manager
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/passwords')}>
              Passwords
            </Button>
            <Button color="inherit" onClick={() => navigate('/emails')}>
              Emails
            </Button>
            <Button color="inherit" onClick={() => navigate('/movies')}>
              Movies
            </Button>
            <Button color="inherit" onClick={() => navigate('/money')}>
              Money
            </Button>
          </Box>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </motion.div>
  );
};

export default Navbar;
