import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Pagination,
  Stack
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

const ITEMS_PER_PAGE = 5;

const PasswordManager = () => {
  const { passwords, setPasswords } = useData();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [showPassword, setShowPassword] = useState({});
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDialog = (password = null) => {
    if (password) {
      setEditingPassword(password);
      setFormData(password);
    } else {
      setEditingPassword(null);
      setFormData({ title: '', username: '', password: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPassword(null);
    setFormData({ title: '', username: '', password: '' });
  };

  const handleSubmit = () => {
    if (editingPassword) {
      setPasswords(passwords.map(p => 
        p.id === editingPassword.id ? { ...formData, id: p.id } : p
      ));
    } else {
      setPasswords([...passwords, { ...formData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setPasswords(passwords.filter(p => p.id !== id));
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate pagination
  const totalPages = Math.ceil(passwords.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedPasswords = passwords.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Password Manager
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: 'linear-gradient(45deg, #9c27b0, #ce93d8)',
              '&:hover': {
                background: 'linear-gradient(45deg, #7b1fa2, #ba68c8)',
              }
            }}
          >
            Add Password
          </Button>
        </Box>

        <Box 
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <List 
            sx={{ 
              flex: 1,
              overflow: 'auto',
              '& .MuiListItem-root': {
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateX(8px)',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }
            }}
          >
            {paginatedPasswords.map((password, index) => (
              <motion.div
                key={password.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    mb: 2,
                    background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  <CardContent>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            {password.title}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography component="span" variant="body2">
                              Username: {password.username}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Password: {showPassword[password.id] ? password.password : '••••••••'}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          onClick={() => togglePasswordVisibility(password.id)}
                          color="primary"
                        >
                          {showPassword[password.id] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                        <IconButton 
                          onClick={() => handleOpenDialog(password)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(password.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </List>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(_, value) => handlePageChange(value - 1)}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }
              }}
            />
          </Box>
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{editingPassword ? 'Edit Password' : 'Add Password'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Username"
              fullWidth
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                }
              }}
            >
              {editingPassword ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default PasswordManager;
