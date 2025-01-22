import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Chip,
  CircularProgress,
  Grid
} from '@mui/material';
import { Masonry } from '@mui/lab';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useInView } from 'react-intersection-observer';

const ITEMS_PER_PAGE = 12;

const MoviesManager = () => {
  const { movies, setMovies } = useData();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    rating: 0,
    imageUrl: '',
    notes: ''
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMore = useCallback(() => {
    if (!loading && movies.length > page * ITEMS_PER_PAGE) {
      setLoading(true);
      setTimeout(() => {
        setPage(prev => prev + 1);
        setLoading(false);
      }, 500);
    }
  }, [loading, movies.length, page]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  const handleOpenDialog = (movie = null) => {
    if (movie) {
      setEditingMovie(movie);
      setFormData(movie);
    } else {
      setEditingMovie(null);
      setFormData({
        title: '',
        director: '',
        year: '',
        genre: '',
        rating: 0,
        imageUrl: '',
        notes: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMovie(null);
    setFormData({
      title: '',
      director: '',
      year: '',
      genre: '',
      rating: 0,
      imageUrl: '',
      notes: ''
    });
  };

  const handleSubmit = () => {
    if (editingMovie) {
      setMovies(movies.map(m => 
        m.id === editingMovie.id ? { ...formData, id: m.id } : m
      ));
    } else {
      setMovies([...movies, { ...formData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setMovies(movies.filter(m => m.id !== id));
  };

  const displayedMovies = movies.slice(0, page * ITEMS_PER_PAGE);

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
            Movies Manager
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: 'linear-gradient(45deg, #ff5722, #ff8a65)',
              '&:hover': {
                background: 'linear-gradient(45deg, #f4511e, #ff7043)',
              }
            }}
          >
            Add Movie
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
          <Masonry 
            columns={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}
            sx={{ 
              flex: 1,
              overflow: 'auto',
              margin: 0,
              width: '100%',
              alignContent: 'flex-start'
            }}
          >
            <AnimatePresence mode="wait">
              {displayedMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'linear-gradient(to right bottom, #ffffff, #fafafa)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    {movie.imageUrl && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={movie.imageUrl}
                        alt={movie.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="h2" color="primary" gutterBottom>
                          {movie.title}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(movie)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(movie.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Director: {movie.director}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Year: {movie.year}
                      </Typography>
                      
                      {movie.genre && (
                        <Chip
                          label={movie.genre}
                          size="small"
                          sx={{
                            mb: 1,
                            bgcolor: '#ff572215',
                            color: '#ff5722',
                            fontWeight: 'medium'
                          }}
                        />
                      )}
                      
                      <Box sx={{ mt: 1 }}>
                        <Rating value={movie.rating} readOnly precision={0.5} size="small" />
                      </Box>

                      {movie.notes && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 2, fontStyle: 'italic' }}
                        >
                          {movie.notes}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Masonry>
        </Box>

        {movies.length > page * ITEMS_PER_PAGE && (
          <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Button onClick={loadMore} variant="text" color="primary">
                Load More
              </Button>
            )}
          </Box>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{editingMovie ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
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
              label="Director"
              fullWidth
              value={formData.director}
              onChange={(e) => setFormData({ ...formData, director: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Year"
              fullWidth
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Genre"
              fullWidth
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Image URL"
              fullWidth
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                value={formData.rating}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, rating: newValue });
                }}
                precision={0.5}
              />
            </Box>
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
                background: 'linear-gradient(45deg, #ff5722, #ff9800)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #f4511e, #ff7043)',
                }
              }}
            >
              {editingMovie ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default MoviesManager;
