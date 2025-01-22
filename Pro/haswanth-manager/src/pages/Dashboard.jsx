import { Box, Container, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Password, Email, Movie, AttachMoney } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();

  const managers = [
    {
      title: 'Password Manager',
      description: 'Securely store and manage all your passwords in one place',
      icon: <Password sx={{ fontSize: 60, color: '#1976d2' }} />,
      path: '/passwords',
      color: '#bbdefb'
    },
    {
      title: 'Email Manager',
      description: 'Organize and track your emails efficiently',
      icon: <Email sx={{ fontSize: 60, color: '#388e3c' }} />,
      path: '/emails',
      color: '#c8e6c9'
    },
    {
      title: 'Movies Manager',
      description: 'Keep track of your favorite movies and watchlist',
      icon: <Movie sx={{ fontSize: 60, color: '#d32f2f' }} />,
      path: '/movies',
      color: '#ffcdd2'
    },
    {
      title: 'Money Manager',
      description: 'Track your expenses and manage your finances',
      icon: <AttachMoney sx={{ fontSize: 60, color: '#7b1fa2' }} />,
      path: '/money',
      color: '#e1bee7'
    }
  ];

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to Haswanth Manager
        </Typography>

        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr' },
            gap: 4,
            px: { xs: 2, sm: 4 }
          }}
        >
          {managers.map((manager, index) => (
            <motion.div
              key={manager.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                  bgcolor: manager.color,
                }}
                onClick={() => navigate(manager.path)}
              >
                <CardContent sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4,
                }}>
                  <Box sx={{ mb: 2 }}>
                    {manager.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {manager.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {manager.description}
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="large"
                    sx={{
                      mt: 'auto',
                      px: 4,
                      py: 1,
                      borderRadius: '28px',
                      textTransform: 'none',
                      fontSize: '1.1rem'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(manager.path);
                    }}
                  >
                    Open {manager.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
