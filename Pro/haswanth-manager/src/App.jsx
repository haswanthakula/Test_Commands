import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion';
import { DataProvider } from './context/DataContext';

// Components
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PasswordManager from './pages/PasswordManager';
import EmailManager from './pages/EmailManager';
import MoviesManager from './pages/MoviesManager';
import MoneyManager from './pages/MoneyManager';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataProvider>
        <BrowserRouter>
          <Box 
            sx={{ 
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
            <Box 
              sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                bgcolor: 'background.default'
              }}
            >
              <Container 
                maxWidth="lg" 
                sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  py: 2
                }}
              >
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        isAuthenticated ? 
                        <Navigate to="/dashboard" replace /> : 
                        <LandingPage />
                      } 
                    />
                    <Route 
                      path="/login" 
                      element={
                        isAuthenticated ? 
                        <Navigate to="/dashboard" replace /> : 
                        <Login setIsAuthenticated={setIsAuthenticated} />
                      } 
                    />
                    <Route 
                      path="/dashboard" 
                      element={
                        isAuthenticated ? 
                        <Dashboard /> : 
                        <Navigate to="/" replace />
                      }
                    />
                    <Route 
                      path="/passwords" 
                      element={
                        isAuthenticated ? 
                        <PasswordManager /> : 
                        <Navigate to="/" replace />
                      }
                    />
                    <Route 
                      path="/emails" 
                      element={
                        isAuthenticated ? 
                        <EmailManager /> : 
                        <Navigate to="/" replace />
                      }
                    />
                    <Route 
                      path="/movies" 
                      element={
                        isAuthenticated ? 
                        <MoviesManager /> : 
                        <Navigate to="/" replace />
                      }
                    />
                    <Route 
                      path="/money" 
                      element={
                        isAuthenticated ? 
                        <MoneyManager /> : 
                        <Navigate to="/" replace />
                      }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </AnimatePresence>
              </Container>
            </Box>
          </Box>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
