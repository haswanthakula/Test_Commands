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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  MobileStepper
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useTheme } from '@mui/material/styles';

const ITEMS_PER_PAGE = 6;

const EmailManager = () => {
  const theme = useTheme();
  const { emails, setEmails } = useData();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEmail, setEditingEmail] = useState(null);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    category: 'personal',
    notes: ''
  });

  const categories = ['personal', 'work', 'social', 'other'];
  const maxSteps = Math.ceil(emails.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleBack = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleOpenDialog = (email = null) => {
    if (email) {
      setEditingEmail(email);
      setFormData(email);
    } else {
      setEditingEmail(null);
      setFormData({ title: '', email: '', category: 'personal', notes: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingEmail(null);
    setFormData({ title: '', email: '', category: 'personal', notes: '' });
  };

  const handleSubmit = () => {
    if (editingEmail) {
      setEmails(emails.map(e => 
        e.id === editingEmail.id ? { ...formData, id: e.id } : e
      ));
    } else {
      setEmails([...emails, { ...formData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setEmails(emails.filter(e => e.id !== id));
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'personal':
        return theme.palette.primary.main;
      case 'work':
        return theme.palette.error.main;
      case 'social':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const paginatedEmails = emails.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

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
            Email Manager
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: 'linear-gradient(45deg, #2196f3, #64b5f6)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              }
            }}
          >
            Add Email
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
          <Grid 
            container 
            spacing={2} 
            sx={{ 
              flex: 1,
              overflow: 'auto',
              margin: 0,
              width: '100%'
            }}
          >
            {paginatedEmails.map((email, index) => (
              <Grid item xs={12} sm={6} md={4} key={email.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" color="primary">
                          {email.title}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(email)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(email.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {email.email}
                      </Typography>
                      <Chip
                        label={email.category}
                        size="small"
                        sx={{
                          bgcolor: `${getCategoryColor(email.category)}15`,
                          color: getCategoryColor(email.category),
                          fontWeight: 'medium'
                        }}
                      />
                      {email.notes && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 2, fontStyle: 'italic' }}
                        >
                          {email.notes}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <MobileStepper
              variant="dots"
              steps={maxSteps}
              position="static"
              activeStep={page}
              sx={{ 
                maxWidth: 400,
                flexGrow: 1,
                background: 'transparent'
              }}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={page === maxSteps - 1}
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={page === 0}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Box>
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{editingEmail ? 'Edit Email' : 'Add Email'}</DialogTitle>
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
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Notes"
              fullWidth
              multiline
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #2196f3, #64b5f6)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                }
              }}
            >
              {editingEmail ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default EmailManager;
